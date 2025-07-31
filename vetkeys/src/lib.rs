//! VetKD demo – versão estável e compilável (ic-stable-structures 0.6)

use candid::{CandidType, Deserialize, Principal};
use ic_cdk::management_canister::{
    vetkd_derive_key, vetkd_public_key, VetKDCurve, VetKDDeriveKeyArgs, VetKDKeyId,
    VetKDPublicKeyArgs,
};
use ic_cdk_macros::*;
use std::cell::RefCell;

// ─── Constantes ──────────────────────────────────────────────────────────────
const DS: &[u8] = b"bls_demo";
const KEY_NAME: &str = "key_1";

// ─── Stable-Structures ───────────────────────────────────────────────────────
use ic_stable_structures::{
    memory_manager::{MemoryId, MemoryManager, VirtualMemory},
    storable::Bound,
    DefaultMemoryImpl, StableBTreeMap, Storable,
};

// Principal → hash (até 128 B)
type PKey = [u8; 29];

#[derive(Clone, CandidType, Deserialize)]
struct CertHash(Vec<u8>);

impl Storable for CertHash {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        std::borrow::Cow::Borrowed(&self.0)
    }
    fn from_bytes(b: std::borrow::Cow<[u8]>) -> Self {
        CertHash(b.into_owned())
    }
    const BOUND: Bound = Bound::Bounded { max_size: 128, is_fixed_size: false };
}

thread_local! {
    static MM: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    static CERTS: RefCell<
        StableBTreeMap<
            PKey,
            CertHash,
            VirtualMemory<DefaultMemoryImpl>
        >
    > = RefCell::new(
        StableBTreeMap::init(
            MM.with(|m| m.borrow().get(MemoryId::new(0)))
        )
    );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
fn context(p: Principal) -> Vec<u8> {
    std::iter::once(DS.len() as u8)
        .chain(DS.iter().copied())
        .chain(p.as_slice().iter().copied())
        .collect()
}

fn pk(p: Principal) -> PKey {
    let mut out = [0u8; 29];
    out[..p.as_slice().len()].copy_from_slice(p.as_slice());
    out
}

// ─── Tipos Candid ────────────────────────────────────────────────────────────
#[derive(CandidType, Deserialize)] struct BlsPk { pk: Vec<u8> }
#[derive(CandidType, Deserialize)] struct BlsSig { signature: Vec<u8> }
#[derive(CandidType, Deserialize)]
struct ShutdownSig { vetkd_sig: Vec<u8>, canister_sig: Vec<u8> }

// ─── Cert store ──────────────────────────────────────────────────────────────
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

// ─── VetKD helpers ───────────────────────────────────────────────────────────
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

// ─── Ed25519 local ───────────────────────────────────────────────────────────
use ed25519_dalek::{SigningKey, Signature, VerifyingKey, Signer};
use rand::rngs::OsRng;

thread_local! {
    static CAN_SK: RefCell<SigningKey> =
        RefCell::new(SigningKey::generate(&mut OsRng));
}

fn local_sign(m: &[u8]) -> [u8; 64] {
    CAN_SK.with(|k| k.borrow().sign(m).to_bytes())
}

// ─── Shutdown flow ───────────────────────────────────────────────────────────
#[update]
async fn sign_shutdown(
    payload: Vec<u8>,
    cert_hash: Vec<u8>,
    transport_pk: Vec<u8>,
) -> ShutdownSig {
    // VetKD
    let mut input = ic_cdk::api::msg_caller().as_slice().to_vec();
    input.extend_from_slice(&payload);
    input.extend_from_slice(&cert_hash);

    let vetkd_sig = vetkd_derive_key(&VetKDDeriveKeyArgs{
        input,
        context: context(ic_cdk::api::msg_caller()),
        transport_public_key: transport_pk,
        key_id: VetKDKeyId { name: KEY_NAME.into(), curve: VetKDCurve::Bls12_381_G2 },
    }).await.unwrap_or_else(|e| ic_cdk::trap(&format!("VetKD derive error: {e:?}")))
      .encrypted_key;

    // Local Ed25519
    let mut msg = payload.clone();
    msg.extend_from_slice(&cert_hash);
    let can_sig = local_sign(&msg).to_vec();

    ShutdownSig { vetkd_sig, canister_sig: can_sig }
}

#[query]
fn verify_shutdown(payload: Vec<u8>, cert_hash: Vec<u8>, can_sig: Vec<u8>) -> bool {
    CAN_SK.with(|sk| {
        let vk: VerifyingKey = sk.borrow().verifying_key();
        let mut msg = payload;
        msg.extend_from_slice(&cert_hash);
        vk.verify_strict(&msg, &Signature::from_slice(&can_sig).unwrap()).is_ok()
    })
}
