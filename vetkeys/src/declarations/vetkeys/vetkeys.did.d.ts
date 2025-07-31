import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Blob = Uint8Array | number[];
export interface _SERVICE {
  'add_cert' : ActorMethod<[Blob], undefined>,
  'bls_public_key' : ActorMethod<[], { 'pk' : Blob }>,
  'list_certs' : ActorMethod<[[] | [Principal]], Array<Blob>>,
  'sign_caller' : ActorMethod<[Blob, Blob], { 'signature' : Blob }>,
  'sign_shutdown' : ActorMethod<
    [Blob, Blob, Blob],
    { 'canister_sig' : Blob, 'vetkd_sig' : Blob }
  >,
  'verify_shutdown' : ActorMethod<[Blob, Blob, Blob], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
