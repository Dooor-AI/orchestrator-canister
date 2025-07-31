//! VetKD demo – versão final: build limpo, sem WebCrypto e sem system-calls em init.
//! Compatível com dfx 0.28, ic-stable-structures 0.6, getrandom 0.2 (feature custom).

use candid::{CandidType, Deserialize, Principal};
use ic_cdk::management_canister::{
    raw_rand,                                         // RNG nativo do IC (chamado depois, em update)
    vetkd_derive_key, vetkd_public_key,
    VetKDDeriveKeyArgs, VetKDKeyId, VetKDPublicKeyArgs, VetKDCurve,
};
use ic_cdk_macros::*;
use std::cell::RefCell;

// ────────────────────────────────────────── Constantes
const DS: &[u8] = b"bls_demo";
const KEY_NAME: &str = "key_1";

// ──────────────────── getrandom: stub custom (evita WebCrypto)
use getrandom::register_custom_getrandom;
fn always_fail(_: &mut [u8]) -> Result<(), getrandom::Error> {
    Err(getrandom::Error::UNSUPPORTED)
}
register_custom_getrandom!(always_fail);

// ──────────────────── Stable-Structures
use ic_stable_structures::{
    DefaultMemoryImpl,
    memory_manager::{MemoryId, MemoryManager, VirtualMemory},
    storable::Bound,
    StableBTreeMap, StableCell, Storable,
};

type PKey = [u8; 29];                      // chave: Principal tamanho fixo

#[derive(Clone, CandidType, Deserialize)]
struct CertHash(Vec<u8>);                  // valor: hash ≤128 B

impl Storable for CertHash {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> { self.0.as_slice().into() }
    fn from_bytes(b: std::borrow::Cow<[u8]>) -> Self { CertHash(b.into_owned()) }
    const BOUND: Bound = Bound::Bounded { max_size: 128, is_fixed_size: false };
}

// Seed Ed25519 salvo na memória estável
#[derive(Clone)]
struct Seed([u8; 32]);
impl Default for Seed { fn default() -> Self { Seed([0; 32]) } }
impl Storable for Seed {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> { self.0.as_slice().into() }
    fn from_bytes(b: std::borrow::Cow<[u8]>) -> Self {
        let mut arr = [0u8; 32];
        arr.copy_from_slice(&b);
        Seed(arr)
    }
    const BOUND: Bound = Bound::Bounded { max_size: 32, is_fixed_size: true };
}

thread_local! {
    static MM: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    static CERTS: RefCell<StableBTreeMap<
        PKey, CertHash, VirtualMemory<DefaultMemoryImpl>>> =
        RefCell::new(StableBTreeMap::init(
            MM.with(|m| m.borrow().get(MemoryId::new(0)))
    ));

    static SEED: RefCell<StableCell<Seed, VirtualMemory<DefaultMemoryImpl>>> =
        RefCell::new(StableCell::init(
            MM.with(|m| m.borrow().get(MemoryId::new(1))),
            Seed::default()
    ).expect("init seed cell"));
}

// ──────────────────── Helpers
fn context(p: Principal) -> Vec<u8> {
    std::iter::once(DS.len() as u8)
        .chain(DS.iter().copied())
        .chain(p.as_slice().iter().copied())
        .collect()
}
fn pk(principal: Principal) -> PKey {
    let mut out = [0u8; 29];
    out[..principal.as_slice().len()].copy_from_slice(principal.as_slice());
    out
}

// ──────────────────── Candid structs
#[derive(CandidType, Deserialize)]
struct BlsPk { pk: Vec<u8> }
#[derive(CandidType, Deserialize)]
struct BlsSig { signature: Vec<u8> }
#[derive(CandidType, Deserialize)]
struct ShutdownSig { vetkd_sig: Vec<u8>, canister_sig: Vec<u8> }

// ──────────────────── init / post-upgrade
#[init] fn init() {}          // vazio – nada de system calls proibidas
#[post_upgrade] fn post_upgrade() {}

// ──────────────────── Cert store
#[update]
fn add_cert(hash: Vec<u8>) {
    CERTS.with(|c| {
        c.borrow_mut()
         .insert(pk(ic_cdk::api::msg_caller()), CertHash(hash));
    });
}

#[query]
fn list_certs(who: Option<Principal>) -> Vec<Vec<u8>> {
    let target = who.unwrap_or_else(ic_cdk::api::msg_caller);
    CERTS.with(|c| {
        c.borrow()
         .range(pk(target)..=pk(target))
         .map(|(_, v)| v.0.clone())
         .collect()
    })
}

// ──────────────────── VetKD helpers
#[update]
async fn bls_public_key() -> BlsPk {
    let args = VetKDPublicKeyArgs {
        canister_id: None,
        context: context(ic_cdk::api::msg_caller()),
        key_id: VetKDKeyId { name: KEY_NAME.into(), curve: VetKDCurve::Bls12_381_G2 },
    };
    let res = vetkd_public_key(&args)
        .await
        .unwrap_or_else(|e| ic_cdk::trap(&format!("VetKD pk error: {e:?}")));
    BlsPk { pk: res.public_key }
}

#[update]
async fn sign_caller(payload: Vec<u8>, transport_pk: Vec<u8>) -> BlsSig {
    if ![32, 48].contains(&transport_pk.len()) {
        ic_cdk::trap("transport_public_key deve ter 32 ou 48 bytes");
    }
    let mut input = ic_cdk::api::msg_caller().as_slice().to_vec();
    input.extend_from_slice(&payload);

    let args = VetKDDeriveKeyArgs {
        input,
        context: context(ic_cdk::api::msg_caller()),
        transport_public_key: transport_pk,
        key_id: VetKDKeyId { name: KEY_NAME.into(), curve: VetKDCurve::Bls12_381_G2 },
    };
    let res = vetkd_derive_key(&args)
        .await
        .unwrap_or_else(|e| ic_cdk::trap(&format!("VetKD derive error: {e:?}")));
    BlsSig { signature: res.encrypted_key }
}

// ──────────────────── Ed25519 util
use ed25519_dalek::{Signer, SigningKey, Signature, VerifyingKey};

// Garante que o seed existe; gera uma vez usando raw_rand numa mensagem update.
async fn ensure_seed() {
    SEED.with(|cell| {
        if cell.borrow().get().0.iter().all(|&b| b == 0) {
            ic_cdk::spawn(async {
                let rand_bytes: Vec<u8> = raw_rand()
                    .await
                    .expect("raw_rand failed");
                let mut s = [0u8; 32];
                s.copy_from_slice(&rand_bytes[..32]);
                SEED.with(|c| c.borrow_mut().set(Seed(s)).unwrap());
            });
        }
    });
}
fn signing_key() -> SigningKey {
    // dispara ensure_seed sem bloquear
    ic_cdk::spawn(ensure_seed());
    SEED.with(|c| SigningKey::from_bytes(&c.borrow().get().0))
}
fn local_sign(msg: &[u8]) -> [u8; 64] { signing_key().sign(msg).to_bytes() }

// ──────────────────── Shutdown flow
#[update]
async fn sign_shutdown(
    payload: Vec<u8>,
    cert_hash: Vec<u8>,
    transport_pk: Vec<u8>,
) -> ShutdownSig {
    let mut input = ic_cdk::api::msg_caller().as_slice().to_vec();
    input.extend_from_slice(&payload);
    input.extend_from_slice(&cert_hash);

    let vetkd_sig = vetkd_derive_key(&VetKDDeriveKeyArgs {
            input,
            context: context(ic_cdk::api::msg_caller()),
            transport_public_key: transport_pk,
            key_id: VetKDKeyId { name: KEY_NAME.into(), curve: VetKDCurve::Bls12_381_G2 },
    }).await.unwrap().encrypted_key;

    let mut msg = payload.clone();
    msg.extend_from_slice(&cert_hash);
    let can_sig = local_sign(&msg).to_vec();

    ShutdownSig { vetkd_sig, canister_sig: can_sig }
}

#[query]
fn verify_shutdown(payload: Vec<u8>, cert_hash: Vec<u8>, sig: Vec<u8>) -> bool {
    let vk: VerifyingKey = signing_key().verifying_key();
    let mut msg = payload;
    msg.extend_from_slice(&cert_hash);
    vk.verify_strict(&msg, &Signature::from_slice(&sig).unwrap()).is_ok()
}
