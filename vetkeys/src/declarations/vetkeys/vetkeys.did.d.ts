import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Blob = Uint8Array | number[];
export interface BlsPk { 'pk' : Blob }
export interface EncryptedKey { 'encrypted_key' : Blob }
export interface _SERVICE {
  'bls_public_key' : ActorMethod<[], BlsPk>,
  'delete_record' : ActorMethod<[Blob], boolean>,
  'derive_data_key' : ActorMethod<[Blob, Blob], EncryptedKey>,
  'get_record' : ActorMethod<[Blob], [] | [Blob]>,
  'list_record_ids' : ActorMethod<[], Array<Blob>>,
  'put_record' : ActorMethod<[Blob, Blob], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
