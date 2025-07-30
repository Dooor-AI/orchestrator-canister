//! VetKD BLS Signature Canister - Dooor Team
//!
//! This canister provides cryptographic operations using the Internet Computer's
//! VetKD (Verified Key Derivation) API. It allows clients to:
//! - Retrieve the subnet’s VetKD BLS12-381 G2 public key
//! - Sign messages in a secure, derivation-based process using caller identity
//!
//! The signing process encrypts the derived key to the caller's transport public key,
//! ensuring confidentiality even from the canister itself.
//
// Author: Dooor Team
// License: MIT

use candid::{CandidType, Deserialize, Principal};
use ic_cdk::management_canister::{
    vetkd_public_key, vetkd_derive_key,
    VetKDCurve, VetKDKeyId, VetKDPublicKeyArgs, VetKDDeriveKeyArgs,
};
use ic_cdk_macros::*;

/// Domain separation tag (DST) for the VetKD derivation context.
/// This distinguishes keys used by this canister from others using the same subnet VetKD.
const DS: &[u8] = b"bls_demo";

/// Key identifier name registered with the VetKD API.
/// Must match the key configured in the subnet.
const KEY_NAME: &str = "key_1";

/// Constructs the VetKD derivation context: [len(DS)] || DS || caller_principal_bytes
fn context(principal: Principal) -> Vec<u8> {
    std::iter::once(DS.len() as u8)
        .chain(DS.iter().copied())
        .chain(principal.as_slice().iter().copied())
        .collect()
}

/// Struct representing a BLS12-381 G2 public key.
#[derive(CandidType, Deserialize)]
struct BlsPk {
    /// The raw G2 public key bytes (96 bytes).
    pk: Vec<u8>,
}

/// Struct representing a VetKD-encrypted BLS signature.
#[derive(CandidType, Deserialize)]
struct BlsSig {
    /// The encrypted derived key (used as a signature).
    signature: Vec<u8>,
}

/// Returns the BLS12-381 G2 public key of the subnet's VetKD service.
/// 
/// This key is used for verifying signatures produced via VetKD derivation.
/// 
/// ### Returns
/// - `pk`: 96-byte BLS12-381 G2 public key
#[update]
async fn bls_public_key() -> BlsPk {
    let args = VetKDPublicKeyArgs {
        canister_id: None,
        context: context(ic_cdk::api::caller()),
        key_id: VetKDKeyId {
            name: KEY_NAME.into(),
            curve: VetKDCurve::Bls12_381_G2,
        },
    };

    let res = vetkd_public_key(&args).await
        .unwrap_or_else(|e| ic_cdk::trap(&format!("VetKD public key error: {:?}", e)));

    BlsPk { pk: res.public_key }
}

/// Derives a signature over the message `<caller || payload>`, 
/// encrypted to the provided transport public key.
///
/// The actual signature (derived key) is not revealed to the canister —
/// it is encrypted by the subnet using the provided transport key (BLS G1 or X25519).
///
/// ### Parameters
/// - `payload`: Message bytes to be signed (Vec<u8>)
/// - `transport_public_key`: 48-byte BLS G1 or 32-byte X25519 public key
///
/// ### Returns
/// - `signature`: Encrypted VetKD-derived key (Vec<u8>)
#[update]
async fn sign_caller(payload: Vec<u8>, transport_public_key: Vec<u8>) -> BlsSig {
    // Validate transport key length
    if ![32, 48].contains(&transport_public_key.len()) {
        ic_cdk::trap("`transport_public_key` must be 32 (X25519) or 48 (BLS-G1) bytes");
    }

    // Input = caller principal || payload
    let mut input = ic_cdk::api::caller().as_slice().to_vec();
    input.extend_from_slice(&payload);

    let args = VetKDDeriveKeyArgs {
        input,
        context: context(ic_cdk::api::caller()),
        transport_public_key,
        key_id: VetKDKeyId {
            name: KEY_NAME.into(),
            curve: VetKDCurve::Bls12_381_G2,
        },
    };

    let res = vetkd_derive_key(&args).await
        .unwrap_or_else(|e| ic_cdk::trap(&format!("VetKD derive key error: {:?}", e)));

    BlsSig { signature: res.encrypted_key }
}
