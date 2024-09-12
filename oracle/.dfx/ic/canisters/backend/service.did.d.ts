import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'closeDeployment' : ActorMethod<[string], string>,
  'closeDeploymentAkash' : ActorMethod<[string], string>,
  'closeDeploymentAkashFromAddress' : ActorMethod<[string], string>,
  'closeDeploymentProvisorio' : ActorMethod<[string, string], string>,
  'createAndStoreCertificateKeys' : ActorMethod<[], string>,
  'createDeploymentAkash' : ActorMethod<[], string>,
  'createLeaseAkash' : ActorMethod<
    [string, string, string, string, string],
    string
  >,
  'createUser' : ActorMethod<[string], string>,
  'fundDeploymentTest' : ActorMethod<[string, string, string], string>,
  'getAccountInfo' : ActorMethod<[string], string>,
  'getAkashAddress' : ActorMethod<[string], string>,
  'getAkashHeight' : ActorMethod<[], string>,
  'getBidsEnd' : ActorMethod<[string, string], string>,
  'getCanisterAddressEVMEnd' : ActorMethod<[string], string>,
  'getCanisterAkashAddress' : ActorMethod<[], string>,
  'getCoreDaoAkashPriceEnd' : ActorMethod<[], string>,
  'getDeployment' : ActorMethod<[string], string>,
  'getDeploymentManifestInfo' : ActorMethod<
    [string, string, string, string],
    string
  >,
  'getEcdsaPublicKeyBase64End' : ActorMethod<[], string>,
  'getEthAkashPriceEnd' : ActorMethod<[], string>,
  'getEthereumAddress' : ActorMethod<[], string>,
  'getHttpTest' : ActorMethod<[string], string>,
  'getNewAkashCertificate' : ActorMethod<[string, string], string>,
  'getPubKey' : ActorMethod<[], string>,
  'manageFundDeployment' : ActorMethod<[string, string], string>,
  'newCreateCertificateAkash' : ActorMethod<[string, string], string>,
  'newDeployment' : ActorMethod<[string], string>,
  'returnCanisterEVMAddress' : ActorMethod<[], string>,
  'returnDeployment' : ActorMethod<[string], string>,
  'sendManifestAkash' : ActorMethod<[string, string], string>,
  'sendManifestEnd' : ActorMethod<[string, string], string>,
  'testEvmInteraction' : ActorMethod<[string], string>,
  'toaaCreateCertificate' : ActorMethod<[], string>,
  'toaaInfo' : ActorMethod<[], string>,
  'toaaInitiate' : ActorMethod<[], string>,
  'transferAkashTokens' : ActorMethod<[string, string, string], string>,
  'transferAkashTokensProvisorioEnd' : ActorMethod<[string, string], string>,
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
  'userExist' : ActorMethod<[string], string>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
