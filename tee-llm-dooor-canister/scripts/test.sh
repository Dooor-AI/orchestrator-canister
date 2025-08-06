#!/usr/bin/env bash
set -euo pipefail

# ================== CONFIG ==================
CANISTER_NAME="${CANISTER_NAME:-dooor-canister}"
KEY_NAME="${KEY_NAME:-dfx_test_key}"            # local: dfx_test_key | mainnet: key_1/test_key_1
SIGN_CYCLES="${SIGN_CYCLES:-27000000000}"       # >= ~26.2B ciclos para sign_with_ecdsa

GET_URL="${GET_URL:-https://example.com/models}"
POST_URL="${POST_URL:-https://example.com/models/123/set-default}"
POST_BODY='{"modelId":"gpt4o-mini"}'
AUD_EXPECTED="${AUD_EXPECTED:-dooor-llm}"

need() { command -v "$1" >/dev/null 2>&1 || { echo "Missing: $1"; exit 1; }; }
need dfx; need node; need npm; need sed; need grep; need head

echo "==> Using CANISTER_NAME=${CANISTER_NAME} KEY_NAME=${KEY_NAME} SIGN_CYCLES=${SIGN_CYCLES}"
echo "==> GET_URL=${GET_URL}"
echo "==> POST_URL=${POST_URL}  POST_BODY=${POST_BODY}"
echo

# ================== Deps p/ verificação local ES256K ==================
echo "==> Installing @noble/secp256k1 locally (dev)..."
npm pkg set type="module" >/dev/null 2>&1 || true
npm i -D @noble/secp256k1 >/dev/null

# Gera/atualiza o verificador (ESM) se não existir
mkdir -p scripts
if [ ! -f scripts/verify_es256k.mjs ]; then
cat > scripts/verify_es256k.mjs <<'EOF'
#!/usr/bin/env node
import * as secp from '@noble/secp256k1';
import { createHash } from 'node:crypto';

function b64uToBytes(str) {
  const s = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = s.length % 4 === 2 ? '==' : s.length % 4 === 3 ? '=' : '';
  return Uint8Array.from(Buffer.from(s + pad, 'base64'));
}
function hexToBytes(hex) {
  const h = (hex || '').trim().replace(/^0x/i, '').toLowerCase();
  if (h.length % 2) throw new Error(`hex length must be even, got ${h.length}`);
  const out = new Uint8Array(h.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(h.slice(i * 2, i * 2 + 2), 16);
  return out;
}

const [,, pkHex, jwt, HTM = 'GET', HTU = 'https://example.com/models', AUD = 'dooor-llm'] = process.argv;
if (!pkHex || !jwt) {
  console.error('usage: verify_es256k.mjs <PK_HEX_COMPRESSED> <JWT> [HTM] [HTU] [AUD]');
  process.exit(2);
}

const parts = jwt.split('.');
if (parts.length !== 3) throw new Error('JWT must have 3 parts');

const [hB64, pB64, sB64] = parts;
const header = JSON.parse(Buffer.from(b64uToBytes(hB64)).toString('utf8'));
const payload = JSON.parse(Buffer.from(b64uToBytes(pB64)).toString('utf8'));

if (header.alg !== 'ES256K') throw new Error(`alg != ES256K (${header.alg})`);
if (payload.aud && AUD && payload.aud !== AUD) throw new Error(`aud mismatch: ${payload.aud} != ${AUD}`);
if (payload.htm && HTM && payload.htm !== HTM) throw new Error(`htm mismatch: ${payload.htm} != ${HTM}`);
if (payload.htu && HTU && payload.htu !== HTU) throw new Error(`htu mismatch: ${payload.htu} != ${HTU}`);

const signingInput = Buffer.from(`${hB64}.${pB64}`, 'utf8');
const msgHash = createHash('sha256').update(signingInput).digest();

const sig = b64uToBytes(sB64);
if (sig.length !== 64) throw new Error(`signature must be 64-byte r||s, got ${sig.length}`);

const pub = hexToBytes(pkHex); // 33 bytes (SEC1 compressed 0x02/0x03 + X)
const ok = secp.verify(secp.Signature.fromCompact(sig), msgHash, pub);

console.log(JSON.stringify({ ok, header, payload }, null, 2));
process.exit(ok ? 0 : 1);
EOF
chmod +x scripts/verify_es256k.mjs
fi

# ================== Configura chave/ciclos e busca PK ==================
echo "==> Configuring key on canister..."
dfx canister call "$CANISTER_NAME" jwt_configureKey "(\"$KEY_NAME\")" >/dev/null || true
dfx canister call "$CANISTER_NAME" jwt_configureCycles "(${SIGN_CYCLES}:nat64)" >/dev/null || true

echo "==> Fetching ECDSA public key..."
dfx canister call "$CANISTER_NAME" jwt_fetchEcdsaPk >/dev/null

echo "==> Reading compressed PK hex..."
RAW=$(dfx canister call "$CANISTER_NAME" jwt_getCompressedPkHex)
PK_HEX=$(printf "%s" "$RAW" | tr -d '[:space:]' | grep -oE '[0-9A-Fa-f]{66}' | head -n1)
if [[ -z "$PK_HEX" ]]; then
  echo "could not parse PK hex (raw output: $RAW)"
  exit 1
fi
echo "PK_HEX=${PK_HEX}"
echo

# ================== Helper p/ extrair JWT do vetor de headers ==================
extract_jwt() {
  sed -n 's/.*value = "Bearer \([^"]*\)".*/\1/p' | head -n 1 | tr -d '[:space:]'
}

# ================== GET ==================
echo "==> Building GET auth header..."
GET_HDRS=$(dfx canister call "$CANISTER_NAME" llm_buildAuthHeaders "(\"get\", \"$GET_URL\", null)")
echo "$GET_HDRS"
GET_JWT=$(printf "%s" "$GET_HDRS" | extract_jwt)
[ -z "$GET_JWT" ] && { echo "ERROR: could not extract JWT (GET)"; exit 1; }
echo "GET_JWT (first 64 chars): ${GET_JWT:0:64}..."
echo

echo "==> Verifying GET JWT locally (noble)..."
node scripts/verify_es256k.mjs "$PK_HEX" "$GET_JWT" "GET" "$GET_URL" "$AUD_EXPECTED" || { echo "Verification failed (GET)"; exit 1; }

# ================== POST ==================
echo
echo "==> Building POST auth header..."
# Gera a lista 'vec { ... }' de bytes UTF-8 via Node (heredoc, sem escapar aspas)
POST_BYTES=$(
  POST_BODY_JSON="$POST_BODY" node - <<'NODE'
const s = process.env.POST_BODY_JSON || '';
const b = Buffer.from(s, 'utf8');
let out = '';
for (let i = 0; i < b.length; i++) { out += (i ? '; ' : '') + b[i]; }
process.stdout.write(out);
NODE
)

POST_EXPR="opt vec { $POST_BYTES }"
POST_HDRS=$(dfx canister call "$CANISTER_NAME" llm_buildAuthHeaders "(\"post\", \"$POST_URL\", $POST_EXPR)")
echo "$POST_HDRS"
POST_JWT=$(printf "%s" "$POST_HDRS" | extract_jwt)
[ -z "$POST_JWT" ] && { echo "ERROR: could not extract JWT (POST)"; exit 1; }
echo "POST_JWT (first 64 chars): ${POST_JWT:0:64}..."
echo

echo "==> Verifying POST JWT locally (noble)..."
node scripts/verify_es256k.mjs "$PK_HEX" "$POST_JWT" "POST" "$POST_URL" "$AUD_EXPECTED" || { echo "Verification failed (POST)"; exit 1; }

echo
echo "==> All good. Local ES256K verification passed."
