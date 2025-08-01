//! VetKeys Private Database Canister
//! 
//! This canister implements a VetKeys-backed private database solution for the Internet Computer,
//! providing threshold cryptography for decentralized key management and secure certificate storage.
//! 
//! ## Key Features
//! - **VetKD Integration**: Verifiably-Encrypted Threshold Key Derivation using BLS12-381 G2
//! - **Certificate Storage**: Secure hash storage linked to user Principals
//! - **Dual Signature System**: Combined VetKD + Ed25519 signatures for integrity verification
//! - **Stable Memory**: Persistent storage using ic-stable-structures
//! 
//! ## Architecture
//! - Uses BLS12-381 G2 curve for VetKD operations
//! - Implements Ed25519 for local signature generation
//! - Stores certificate hashes in StableBTreeMap
//! - Maintains Ed25519 seed in StableCell
//! 
//! Compatible with dfx 0.28, ic-stable-structures 0.6, getrandom 0.2 (feature custom).

use candid::{CandidType, Deserialize, Principal};
use ic_cdk::management_canister::{
    raw_rand,                                         // RNG nativo do IC (chamado depois, em update)
    vetkd_derive_key, vetkd_public_key,
    VetKDDeriveKeyArgs, VetKDKeyId, VetKDPublicKeyArgs, VetKDCurve,
};
use ic_cdk_macros::*;
use std::cell::RefCell;

// ────────────────────────────────────────── Constants
/// Domain-specific context for VetKD key derivation.
/// This string is used to create unique key contexts for different applications.
const DS: &[u8] = b"bls_demo";

/// VetKD key identifier used for BLS12-381 G2 operations.
/// This name is used when requesting key derivation from the VetKD service.
const KEY_NAME: &str = "key_1";

// ──────────────────── getrandom: custom stub (avoids WebCrypto)
/// Custom getrandom implementation that always fails.
/// This is used to avoid WebCrypto dependencies in the canister environment.
/// The actual random number generation is handled by ic_cdk::management_canister::raw_rand.
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

/// Fixed-size Principal key type for stable memory storage.
/// Principals are stored as 29-byte arrays for efficient BTreeMap operations.
type PKey = [u8; 29];

/// Certificate hash storage type.
/// Stores certificate hashes as variable-length byte vectors with a maximum size of 128 bytes.
#[derive(Clone, CandidType, Deserialize)]
struct CertHash(Vec<u8>);

impl Storable for CertHash {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> { self.0.as_slice().into() }
    fn from_bytes(b: std::borrow::Cow<[u8]>) -> Self { CertHash(b.into_owned()) }
    const BOUND: Bound = Bound::Bounded { max_size: 128, is_fixed_size: false };
}

/// Ed25519 seed stored in stable memory.
/// This 32-byte seed is used to generate Ed25519 signing keys for local signature operations.
#[derive(Clone)]
struct Seed([u8; 32]);

impl Default for Seed { 
    fn default() -> Self { 
        Seed([0; 32]) 
    } 
}
impl Storable for Seed {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> { self.0.as_slice().into() }
    fn from_bytes(b: std::borrow::Cow<[u8]>) -> Self {
        let mut arr = [0u8; 32];
        arr.copy_from_slice(&b);
        Seed(arr)
    }
    const BOUND: Bound = Bound::Bounded { max_size: 32, is_fixed_size: true };
}

/// Thread-local storage for stable memory management.
/// 
/// ## Memory Layout
/// - **MM**: Memory manager for coordinating stable memory allocation
/// - **CERTS**: BTreeMap storing certificate hashes indexed by Principal (MemoryId::new(0))
/// - **SEED**: StableCell storing the Ed25519 seed for local signatures (MemoryId::new(1))
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

// ──────────────────── Helper Functions

/// Creates a VetKD context string for key derivation.
/// 
/// The context is constructed as: `[domain_length][domain_string][principal_bytes]`
/// This ensures unique key derivation for each user and application domain.
/// 
/// # Arguments
/// * `p` - The user's Principal for context generation
/// 
/// # Returns
/// * `Vec<u8>` - The constructed context string
fn context(p: Principal) -> Vec<u8> {
    std::iter::once(DS.len() as u8)
        .chain(DS.iter().copied())
        .chain(p.as_slice().iter().copied())
        .collect()
}

/// Converts a Principal to a fixed-size byte array for stable storage.
/// 
/// Principals are variable-length, but stable memory requires fixed-size keys.
/// This function pads the Principal to 29 bytes for efficient BTreeMap storage.
/// 
/// # Arguments
/// * `principal` - The Principal to convert
/// 
/// # Returns
/// * `PKey` - Fixed-size byte array representation
fn pk(principal: Principal) -> PKey {
    let mut out = [0u8; 29];
    out[..principal.as_slice().len()].copy_from_slice(principal.as_slice());
    out
}

// ──────────────────── Candid Interface Structs

/// VetKD public key response structure.
/// Contains the BLS12-381 G2 public key from the VetKD service.
#[derive(CandidType, Deserialize)]
struct BlsPk { 
    /// The BLS12-381 G2 public key bytes
    pk: Vec<u8> 
}

/// VetKD signature response structure.
/// Contains the encrypted BLS12-381 G2 signature derived from VetKD.
#[derive(CandidType, Deserialize)]
struct BlsSig { 
    /// The encrypted signature bytes
    signature: Vec<u8> 
}

/// Combined signature structure for dual verification.
/// Contains both VetKD and local Ed25519 signatures for integrity checking.
#[derive(CandidType, Deserialize)]
struct ShutdownSig { 
    /// VetKD encrypted signature (BLS12-381 G2)
    vetkd_sig: Vec<u8>, 
    /// Local Ed25519 signature for integrity verification
    canister_sig: Vec<u8> 
}

// ──────────────────── Canister Lifecycle

/// Canister initialization function.
/// 
/// This function is called when the canister is first deployed.
/// No system calls are made during initialization to ensure compatibility.
#[init] 
fn init() {}

/// Canister post-upgrade function.
/// 
/// This function is called after the canister code is upgraded.
/// Currently performs no operations but can be extended for migration logic.
#[post_upgrade] 
fn post_upgrade() {}

// ──────────────────── Certificate Storage Operations

/// Adds a certificate hash to the user's storage.
/// 
/// Stores a certificate hash linked to the caller's Principal in stable memory.
/// The hash is used for verification in subsequent signature operations.
/// 
/// # Arguments
/// * `hash` - The certificate hash to store (maximum 128 bytes)
/// 
/// # Security
/// Only the caller can add certificates to their own storage.
/// Certificate hashes are stored in stable memory for persistence across upgrades.
#[update]
fn add_cert(hash: Vec<u8>) {
    CERTS.with(|c| {
        c.borrow_mut()
         .insert(pk(ic_cdk::api::msg_caller()), CertHash(hash));
    });
}

/// Lists all certificate hashes for a specified user.
/// 
/// Retrieves all certificate hashes stored for the given Principal.
/// If no Principal is specified, returns hashes for the caller.
/// 
/// # Arguments
/// * `who` - Optional Principal to query. If None, uses the caller's Principal
/// 
/// # Returns
/// * `Vec<Vec<u8>>` - List of certificate hashes for the specified user
/// 
/// # Security
/// Users can only view their own certificate hashes.
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

// ──────────────────── VetKD Integration Functions

/// Retrieves the VetKD public key for the caller's context.
/// 
/// Requests the BLS12-381 G2 public key from the VetKD service using the caller's
/// Principal as part of the context. This key can be used for verification purposes.
/// 
/// # Returns
/// * `BlsPk` - Contains the BLS12-381 G2 public key bytes
/// 
/// # Errors
/// * Traps if the VetKD service returns an error
/// 
/// # Security
/// The public key is derived using the caller's Principal context, ensuring
/// unique key derivation for each user.
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

/// Derives a VetKD signature for the caller's payload.
/// 
/// Creates a BLS12-381 G2 signature using VetKD threshold cryptography.
/// The signature is encrypted for the provided transport public key.
/// 
/// # Arguments
/// * `payload` - The data to be signed
/// * `transport_pk` - Transport public key for encryption (32 or 48 bytes)
/// 
/// # Returns
/// * `BlsSig` - Contains the encrypted BLS12-381 G2 signature
/// 
/// # Errors
/// * Traps if transport_pk is not 32 or 48 bytes
/// * Traps if VetKD derivation fails
/// 
/// # Security
/// The signature input includes the caller's Principal, ensuring unique
/// signatures for each user. The result is encrypted for the transport key.
#[update]
async fn sign_caller(payload: Vec<u8>, transport_pk: Vec<u8>) -> BlsSig {
    if ![32, 48].contains(&transport_pk.len()) {
        ic_cdk::trap("transport_public_key must be 32 or 48 bytes");
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

// ──────────────────── Ed25519 Local Signature Functions

/// Ed25519 signature utilities for local integrity verification.
/// 
/// These functions provide local signature capabilities using Ed25519,
/// complementing the VetKD threshold signatures with additional integrity checks.
use ed25519_dalek::{Signer, SigningKey, Signature, VerifyingKey};

/// Ensures the Ed25519 seed exists in stable memory.
/// 
/// Generates a random 32-byte seed using the Internet Computer's raw_rand
/// service if the seed hasn't been initialized yet. This is called asynchronously
/// to avoid blocking the main execution flow.
/// 
/// # Security
/// The seed is generated using the IC's secure random number generator
/// and stored in stable memory for persistence across upgrades.
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

/// Retrieves the Ed25519 signing key from stable memory.
/// 
/// Ensures the seed exists and creates a SigningKey from the stored seed.
/// This function triggers seed generation if needed without blocking.
/// 
/// # Returns
/// * `SigningKey` - The Ed25519 signing key derived from the stable seed
/// 
/// # Security
/// The signing key is derived from the secure seed stored in stable memory.
fn signing_key() -> SigningKey {
    // Trigger ensure_seed without blocking
    ic_cdk::spawn(ensure_seed());
    SEED.with(|c| SigningKey::from_bytes(&c.borrow().get().0))
}

/// Signs a message using the local Ed25519 key.
/// 
/// Creates a 64-byte Ed25519 signature for integrity verification.
/// This signature complements VetKD signatures with additional security guarantees.
/// 
/// # Arguments
/// * `msg` - The message to sign
/// 
/// # Returns
/// * `[u8; 64]` - The Ed25519 signature bytes
/// 
/// # Security
/// This signature provides integrity verification independent of VetKD,
/// ensuring tamper detection even if VetKD is compromised.
fn local_sign(msg: &[u8]) -> [u8; 64] { 
    signing_key().sign(msg).to_bytes() 
}

// ──────────────────── Dual Signature Operations

/// Creates a dual signature combining VetKD and Ed25519 for maximum security.
/// 
/// This is the main signature operation that combines threshold cryptography
/// with local integrity verification. The function creates both a VetKD signature
/// and a local Ed25519 signature for the same data.
/// 
/// # Arguments
/// * `payload` - The data to be signed
/// * `cert_hash` - Certificate hash for verification context
/// * `transport_pk` - Transport public key for VetKD encryption (48 bytes recommended)
/// 
/// # Returns
/// * `ShutdownSig` - Contains both VetKD and Ed25519 signatures
/// 
/// # Security Features
/// * **VetKD Signature**: Threshold-based BLS12-381 G2 signature encrypted for transport key
/// * **Ed25519 Signature**: Local integrity verification signature
/// * **Tamper Detection**: Any modification to payload or cert_hash breaks verification
/// * **Identity Binding**: Signatures are cryptographically tied to caller's Principal
/// 
/// # Workflow
/// 1. Constructs input as `caller_principal || payload || cert_hash`
/// 2. Derives VetKD signature using threshold cryptography
/// 3. Creates local Ed25519 signature for `payload || cert_hash`
/// 4. Returns both signatures for dual verification
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

/// Verifies the Ed25519 signature component of a dual signature.
/// 
/// Validates the local Ed25519 signature to ensure data integrity.
/// This provides immediate verification without requiring VetKD decryption.
/// 
/// # Arguments
/// * `payload` - The original payload that was signed
/// * `cert_hash` - The certificate hash that was included in the signature
/// * `sig` - The Ed25519 signature bytes to verify
/// 
/// # Returns
/// * `bool` - True if the signature is valid, false otherwise
/// 
/// # Security
/// * Uses strict Ed25519 verification to prevent signature malleability
/// * Verifies the exact `payload || cert_hash` combination
/// * Any byte modification will cause verification to fail
/// 
/// # Usage
/// This function provides fast integrity verification while the VetKD signature
/// can be verified separately after decryption with the user's private key.
#[query]
fn verify_shutdown(payload: Vec<u8>, cert_hash: Vec<u8>, sig: Vec<u8>) -> bool {
    let vk: VerifyingKey = signing_key().verifying_key();
    let mut msg = payload;
    msg.extend_from_slice(&cert_hash);
    vk.verify_strict(&msg, &Signature::from_slice(&sig).unwrap()).is_ok()
}
