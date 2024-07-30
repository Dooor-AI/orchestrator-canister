import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'closeDeploymentAkash' : ActorMethod<[string], string>,
  'closeDeploymentAkashFromAddress' : ActorMethod<[string], string>,
  'createAndStoreCertificateKeys' : ActorMethod<[], string>,
  'createDeploymentAkash' : ActorMethod<[], string>,
  'createLeaseAkash' : ActorMethod<
    [string, string, string, string, string],
    string
  >,
  'createUser' : ActorMethod<[string], string>,
  'getAkashAddress' : ActorMethod<[string], string>,
  'getBidsA' : ActorMethod<[], string>,
  'getCanisterAddressEVMEnd' : ActorMethod<[string], string>,
  'getDeploymentManifestInfo' : ActorMethod<
    [string, string, string, string],
    string
  >,
  'getEcdsaPublicKeyBase64End' : ActorMethod<[], string>,
  'getEthereumAddress' : ActorMethod<[], string>,
  'getNewAkashCertificate' : ActorMethod<[string, string], string>,
  'getUsers' : ActorMethod<[], string>,
  'newCreateCertificateAkash' : ActorMethod<[string, string], string>,
  'newDeployment' : ActorMethod<[string], string>,
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
  'updateContractEVMEnd' : ActorMethod<[], string>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
