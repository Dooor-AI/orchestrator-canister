use ic_cdk::api::call::call;
use ic_cdk::{query, update};
use serde::Deserialize;
use serde_bytes::ByteBuf;

#[derive(candid::CandidType)]
struct Args {
    key_id: KeyId,
    derivation_path: Vec<ByteBuf>,
    canister_id: Option<Vec<u8>>,
}
#[derive(candid::CandidType)]
struct KeyId { name: String, curve: u8 }
#[derive(candid::CandidType, Deserialize)]
struct Reply { public_key: Vec<u8> }

#[update]
async fn vetkd_public_key() -> Vec<u8> {
    let args = Args {
        key_id: KeyId { name: "insecure_test_key_1".into(), curve: 0 },
        derivation_path: vec![],
        canister_id: None,
    };
    let (rep,): (Reply,) = call(
        candid::Principal::from_text("nn664-2iaaa-aaaao-a3tqq-cai").unwrap(), // stub ID
        "vetkd_public_key",
        (args,),
    ).await.unwrap();
    rep.public_key
}

#[query] fn greet() -> String { "ready".into() }
ic_cdk::export_candid!();
