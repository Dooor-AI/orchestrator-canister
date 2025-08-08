// Dooor Team — emit a 48-byte BLS12-381 G1 transport public key (hex list)
import { randomBytes } from "crypto";
import * as bls from "@noble/bls12-381";

const sk = randomBytes(32);           // 32B secret (demo; guarde se precisar simetria)
const pk = bls.getPublicKey(sk);      // 48B compressed G1

// imprime no formato "0x??; 0x??; ..." que o dfx aceita no Candid
const hexList = [...pk].map(b => `0x${b.toString(16).padStart(2,'0')};`).join(' ');
console.log(hexList);
