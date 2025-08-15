#!/usr/bin/env bash
set -euo pipefail

###################### CONFIG ######################
CANISTER_NAME="${CANISTER_NAME:-dooor-canister}"
KEY_NAME="${KEY_NAME:-dfx_test_key}"          # local: dfx_test_key   mainnet: key_1
SIGN_CYCLES="${SIGN_CYCLES:-27000000000}"    # ≥26 153 846 153
AUD_EXPECTED="${AUD_EXPECTED:-dooor-llm}"

GET_URL="${GET_URL:-https://dev-backend-production-6f42.up.railway.app/v1/llm-models}"
POST_URL="${POST_URL:-https://dev-backend-production-6f42.up.railway.app/v1/llm-models/123/set-default}"
POST_BODY='{"modelId":"gpt4o-mini"}'

need() { command -v "$1" >/dev/null 2>&1 || { echo "Missing: $1"; exit 1; }; }
need dfx; need node; need npm; need sed; need grep; need head

echo "==> CANISTER=${CANISTER_NAME}  KEY=${KEY_NAME}  CYCLES=${SIGN_CYCLES}"
echo "==> GET  ${GET_URL}"
echo "==> POST ${POST_URL}  BODY=${POST_BODY}"
echo

###################### noble verifier (ESM) ######################
npm pkg set type="module" >/dev/null 2>&1 || true
npm i -D @noble/secp256k1@^1 >/dev/null

if [ ! -f scripts/verify_es256k.mjs ]; then
cat > scripts/verify_es256k.mjs <<'JS'
#!/usr/bin/env node
import { verify, CURVE, Signature } from '@noble/secp256k1';
import { createHash } from 'node:crypto';

const [,, pkHex, jwt, HTM='GET', HTU='', AUD=''] = process.argv;
if (!pkHex || !jwt) {
  console.error('usage: verify_es256k.mjs <PK_HEX> <JWT> [HTM] [HTU] [AUD]');
  process.exit(2);
}
const b64uToU8 = (b64u) => Buffer.from(b64u.replace(/-/g,'+').replace(/_/g,'/').padEnd(b64u.length+3&~3,'='),'base64');

const [hB,pB,sB] = jwt.split('.');
if (!sB) throw 'malformed JWT';
const header  = JSON.parse(Buffer.from(b64uToU8(hB)).toString());
const payload = JSON.parse(Buffer.from(b64uToU8(pB)).toString());
const sig64   = b64uToU8(sB);
const msgHash = createHash('sha256').update(`${hB}.${pB}`).digest();

/* low-S normalização -------------------- */
let { r, s } = Signature.fromCompact(sig64);
const n = CURVE.n;
if (s > n/2n) s = n - s;
const sigLow = new Signature(r, s).toCompactRaw();

/* assinatura */
const ok = verify(sigLow, msgHash, pkHex);
if (!ok) { console.error('signature invalid'); process.exit(1); }

/* checagens principais (iguais ao Guard) */
const mism = [];
if (header.alg !== 'ES256K') mism.push('alg');
if (AUD && payload.aud !== AUD) mism.push('aud');
if (HTM && payload.htm !== HTM) mism.push('htm');
if (HTU && payload.htu !== HTU) mism.push('htu');
if (mism.length) {
  console.error('claim mismatch:', mism.join(','));
  process.exit(3);
}
console.log(JSON.stringify({ ok, header, payload }, null, 2));
JS
chmod +x scripts/verify_es256k.mjs
fi

###################### canister prep ######################
echo "==> Configuring key & cycles..."
dfx canister call "$CANISTER_NAME" jwt_configureKey "(\"$KEY_NAME\")" >/dev/null || true
dfx canister call "$CANISTER_NAME" jwt_configureCycles "(${SIGN_CYCLES}:nat64)" >/dev/null || true
dfx canister call "$CANISTER_NAME" jwt_fetchEcdsaPk >/dev/null

echo "==> Reading compressed PK hex..."
RAW=$(dfx canister call "$CANISTER_NAME" jwt_getCompressedPkHex)
PK_HEX=$(printf "%s" "$RAW" | grep -oE '[0-9A-Fa-f]{66}' | head -n1)
[ -z "$PK_HEX" ] && { echo "PK not found"; exit 1; }
echo "PK_HEX=${PK_HEX}"
echo

###################### helpers ######################
extract_jwt() { sed -n 's/.*Bearer \([^"]*\)".*/\1/p' | head -1; }

###################### GET ######################
echo "==> GET header..."
GET_HDRS=$(dfx canister call "$CANISTER_NAME" llm_buildAuthHeaders \
  "(\"get\",\"$GET_URL\", null)")
echo "$GET_HDRS"
GET_JWT=$(printf "%s" "$GET_HDRS" | extract_jwt)
echo "JWT… ${GET_JWT:0:64}..."
echo "==> Verifying GET ..."
node scripts/verify_es256k.mjs "$PK_HEX" "$GET_JWT" "GET" "$GET_URL" "$AUD_EXPECTED" || { echo "GET verify ❌"; exit 1; }
echo "GET verify ✅"
echo

###################### POST ######################
echo "==> POST header..."
POST_BYTES=$(node - <<NODE
const b = Buffer.from(${POST_BODY@Q},'utf8'); console.log([...b].join('; '));
NODE
)
POST_HDRS=$(dfx canister call "$CANISTER_NAME" llm_buildAuthHeaders \
  "(\"post\",\"$POST_URL\", opt vec { $POST_BYTES })")
echo "$POST_HDRS"
POST_JWT=$(printf "%s" "$POST_HDRS" | extract_jwt)
echo "JWT… ${POST_JWT:0:64}..."
echo "==> Verifying POST ..."
node scripts/verify_es256k.mjs "$PK_HEX" "$POST_JWT" "POST" "$POST_URL" "$AUD_EXPECTED" || { echo "POST verify ❌"; exit 1; }
echo "POST verify ✅"
echo
echo "🎉  Round-trip OK – JWTs gerados pelo canister válidos localmente com noble"
