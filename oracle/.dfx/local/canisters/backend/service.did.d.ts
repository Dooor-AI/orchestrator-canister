import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'closeDeploymentAkash' : ActorMethod<[string], string>,
  'createAndStoreCertificateKeys' : ActorMethod<[], string>,
  'createDeploymentAkash' : ActorMethod<[], string>,
  'createLeaseAkash' : ActorMethod<
    [string, string, string, string, string],
    string
  >,
  'getAkashAddress' : ActorMethod<[string], string>,
  'getDeploymentManifestInfo' : ActorMethod<
    [string, string, string, string],
    string
  >,
  'sendManifestAkash' : ActorMethod<[string, string], string>,
  'transferAkashTokens' : ActorMethod<[string, string, string], string>,
  'transformResponse' : ActorMethod<
    [
      {
        'context' : Uint8Array | number[],
        'response' : {
          'status' : bigint,
          'body' : Uint8Array | number[],
          'headers' : Array<{ 'value' : string, 'name' : string }>,
        },
      },
    ],
    {
      'status' : bigint,
      'body' : Uint8Array | number[],
      'headers' : Array<{ 'value' : string, 'name' : string }>,
    }
  >,
  'updateAkashAddress' : ActorMethod<
    [string, string, string],
    {
      'id' : string,
      'akashAddress' : string,
      'akashCertpem' : string,
      'akashPubEncod' : string,
    }
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
