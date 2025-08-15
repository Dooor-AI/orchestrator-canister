//! VetKeys Private Database Canister — Dooor Team
//! ==============================================
//!
//! Canister exposing a **private key–derivation based DB**
//! using **VetKD** (BLS12-381 G2) on the Internet Computer.
//! The canister never sees plaintext: clients derive a **data key** via VetKD
//! (encrypted to their transport key), perform AEAD locally, and store only an
//! **encrypted envelope**.
//!
//! ## Scope
//! - VetKD public key retrieval bound to caller context
//! - VetKD data-key derivation for a given record_id
//! - Auth-scoped put/get/list/delete of encrypted records per caller
//!
//! ## Security properties
//! - VetKD `context = len(DS) || DS || caller_principal` binds material to the caller
//! - VetKD `input = "db|v1|" || record_id` binds material to the logical record
//! - Access control: callers can only operate on their own records

use candid::{CandidType, Deserialize, Principal};
use ic_cdk::management_canister::{
    vetkd_derive_key, vetkd_public_key,
    VetKDDeriveKeyArgs, VetKDKeyId, VetKDPublicKeyArgs, VetKDCurve,
};
use ic_cdk_macros::*;
use std::cell::RefCell;

// ── getrandom: custom stub (avoids WebCrypto in wasm) ──────────────────────
use getrandom::register_custom_getrandom;
fn no_rand(_: &mut [u8]) -> Result<(), getrandom::Error> {
    Err(getrandom::Error::UNSUPPORTED)
}
register_custom_getrandom!(no_rand);

// ── Constants ─────────────────────────────────────────────────────────────
const DS: &[u8] = b"dooor.vetkeys.db.v1";
const KEY_NAME: &str = "key_1";

// ── Stable Structures ─────────────────────────────────────────────────────
use ic_stable_structures::{
    DefaultMemoryImpl,
    memory_manager::{MemoryId, MemoryManager, VirtualMemory},
    storable::Bound,
    StableBTreeMap, Storable,
};

type PKey = [u8; 29];

#[derive(Clone, CandidType, Deserialize, PartialEq, Eq, PartialOrd, Ord)]
struct DbKey {
    user: PKey,
    record_id: Vec<u8>,
}

impl Storable for DbKey {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        let mut out = Vec::with_capacity(29 + 4 + self.record_id.len());
        out.extend_from_slice(&self.user);
        out.extend_from_slice(&(self.record_id.len() as u32).to_le_bytes());
        out.extend_from_slice(&self.record_id);
        out.into()
    }
    fn from_bytes(b: std::borrow::Cow<[u8]>) -> Self {
        let buf = b.as_ref();
        let mut user = [0u8; 29];
        user.copy_from_slice(&buf[..29]);
        let mut len_bytes = [0u8; 4];
        len_bytes.copy_from_slice(&buf[29..33]);
        let n = u32::from_le_bytes(len_bytes) as usize;
        let rid = buf[33..33 + n].to_vec();
        DbKey { user, record_id: rid }
    }
    const BOUND: Bound = Bound::Unbounded;
}

#[derive(Clone, CandidType, Deserialize)]
struct Envelope(Vec<u8>);

impl Storable for Envelope {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> { self.0.as_slice().into() }
    fn from_bytes(b: std::borrow::Cow<[u8]>) -> Self { Envelope(b.into_owned()) }
    const BOUND: Bound = Bound::Unbounded;
}

thread_local! {
    static MM: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    static DB: RefCell<StableBTreeMap<
        DbKey, Envelope, VirtualMemory<DefaultMemoryImpl>>> =
        RefCell::new(StableBTreeMap::init(
            MM.with(|m| m.borrow().get(MemoryId::new(0)))
    ));
}

// ── Helpers ───────────────────────────────────────────────────────────────
fn context(p: Principal) -> Vec<u8> {
    std::iter::once(DS.len() as u8)
        .chain(DS.iter().copied())
        .chain(p.as_slice().iter().copied())
        .collect()
}

fn pk(principal: Principal) -> PKey {
    let src = principal.as_slice();
    let mut out = [0u8; 29];
    out[..src.len()].copy_from_slice(src);
    out
}

fn data_key_input(record_id: &[u8]) -> Vec<u8> {
    const PREFIX: &[u8] = b"db|v1|";
    let mut v = Vec::with_capacity(PREFIX.len() + record_id.len());
    v.extend_from_slice(PREFIX);
    v.extend_from_slice(record_id);
    v
}

// ── DTOs ──────────────────────────────────────────────────────────────────
#[derive(CandidType, Deserialize)]
pub struct BlsPk {
    pub pk: Vec<u8>,
}

#[derive(CandidType, Deserialize)]
pub struct EncryptedKey {
    pub encrypted_key: Vec<u8>,
}

// ── Lifecycle ─────────────────────────────────────────────────────────────
#[init]
fn init() {}

#[post_upgrade]
fn post_upgrade() {}

// ── VetKD API ─────────────────────────────────────────────────────────────
#[update]
async fn bls_public_key() -> BlsPk {
    let caller = ic_cdk::api::caller();
    let args = VetKDPublicKeyArgs {
        canister_id: None,
        context: context(caller),
        key_id: VetKDKeyId { name: KEY_NAME.into(), curve: VetKDCurve::Bls12_381_G2 },
    };
    let res = vetkd_public_key(&args)
        .await
        .unwrap_or_else(|e| ic_cdk::trap(&format!("VetKD public_key error: {e:?}")));
    BlsPk { pk: res.public_key }
}

#[update]
async fn derive_data_key(record_id: Vec<u8>, transport_pk: Vec<u8>) -> EncryptedKey {
    if transport_pk.len() != 48 {
        ic_cdk::trap("transport_public_key must be 48 bytes (BLS12-381 G1 compressed)");
    }
    let caller = ic_cdk::api::caller();
    let args = VetKDDeriveKeyArgs {
        input: data_key_input(&record_id),
        context: context(caller),
        transport_public_key: transport_pk,
        key_id: VetKDKeyId { name: KEY_NAME.into(), curve: VetKDCurve::Bls12_381_G2 },
    };
    let res = vetkd_derive_key(&args)
        .await
        .unwrap_or_else(|e| ic_cdk::trap(&format!("VetKD derive error: {e:?}")));
    EncryptedKey { encrypted_key: res.encrypted_key }
}

// ── DB API ─────────────────────────────────────────────────────────────────
#[update]
fn put_record(record_id: Vec<u8>, envelope: Vec<u8>) {
    let key = DbKey { user: pk(ic_cdk::api::caller()), record_id };
    DB.with(|db| {
        db.borrow_mut().insert(key, Envelope(envelope));
    });
}

#[query]
fn get_record(record_id: Vec<u8>) -> Option<Vec<u8>> {
    let key = DbKey { user: pk(ic_cdk::api::caller()), record_id };
    DB.with(|db| db.borrow().get(&key).map(|e| e.0.clone()))
}

#[query]
fn list_record_ids() -> Vec<Vec<u8>> {
    let me = pk(ic_cdk::api::caller());
    DB.with(|db| {
        let b = db.borrow();
        let mut out = Vec::new();
        for (k, _) in b.iter() {
            if k.user == me {
                out.push(k.record_id.clone());
            }
        }
        out
    })
}

#[update]
fn delete_record(record_id: Vec<u8>) -> bool {
    let key = DbKey { user: pk(ic_cdk::api::caller()), record_id };
    DB.with(|db| db.borrow_mut().remove(&key).is_some())
}
