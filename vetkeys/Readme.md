
# Vetkeys Demo Canister  
_Dooor Team – Julho 2025_

## Visão geral
Este canister mostra, na prática, como usar a **VetKD API** (Verifiably‑Encrypted Threshold Key Derivation) do Internet Computer e, ao mesmo tempo, manter um pequeno “banco” de certificados (hashes) ligados a cada usuário.

### O que ele faz
| Recurso | Endpoints |
|---------|-----------|
| **Armazenar certificado** | `add_cert`, `list_certs` |
| **Chave pública BLS G2** do subnet | `bls_public_key` |
| **Derivar assinatura VetKD** (cifrada p/ o usuário) | `sign_caller` |
| **Assinatura dupla – VetKD + Ed25519** | `sign_shutdown` |
| **Verificar assinatura Ed25519** | `verify_shutdown` |

### Como ele garante o caso de uso “certificado + VetKD”
1. O usuário grava um hash de certificado via `add_cert`.
2. Quando chama `sign_shutdown`, ele envia **payload + hash + chave G1 de transporte**.  
3. O canister monta `input = caller ‖ payload ‖ hash` e chama `vetkd_derive_key`.  
4. O subnet devolve uma **chave derivada BLS G2** já **cifrada** para a chave G1 do usuário (48 bytes).  
5. O canister também assina `(payload‖hash)` com uma **Ed25519** local (seed armazenada em `StableCell`).  
6. O usuário descriptografa a parte VetKD com sua chave secreta G1 e confere **as duas assinaturas**.  
   Se qualquer parte foi alterada (payload ou hash), a verificação falha.

### Estrutura de armazenamento
```
StableMemory
├─ StableBTreeMap  (Principal → CertHash[≤128 B])
└─ StableCell      (Seed Ed25519 32 B)
```

### Requisitos de chave de transporte
* **BLS12‑381 G1 comprimido (48 bytes)**.  
  X25519 (32 bytes) é rejeitado pela VetKD API.

---

## Passo a passo com Node JS

```bash
npm i @dfinity/agent @dfinity/candid @noble/bls12-381
dfx generate vetkeys          # cria vetkeys.did.js
node js/runDemo.js            # script de demonstração
```

`runDemo.js`:
1. Busca a root‑key da réplica local (`fetchRootKey()`).
2. Adiciona um certificado.
3. Lista certificados.
4. Gera chave de transporte G1 (48 B).
5. Chama `sign_caller`.
6. Chama `sign_shutdown` e imprime o objeto `ShutdownSig`.

---

## Produção (mainnet)
* **Não** chame `fetchRootKey()`.
* Aponte o agente para `https://ic0.app`.
* Garanta ciclos suficientes (pelo menos 2 T cycles) antes de `update`s que usem VetKD.

Boa diversão!  
— _Dooor Team_
