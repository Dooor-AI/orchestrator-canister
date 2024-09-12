export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'closeDeployment' : IDL.Func([IDL.Text], [IDL.Text], []),
    'closeDeploymentAkash' : IDL.Func([IDL.Text], [IDL.Text], []),
    'closeDeploymentAkashFromAddress' : IDL.Func([IDL.Text], [IDL.Text], []),
    'closeDeploymentProvisorio' : IDL.Func(
        [IDL.Text, IDL.Text],
        [IDL.Text],
        [],
      ),
    'createAndStoreCertificateKeys' : IDL.Func([], [IDL.Text], []),
    'createDeploymentAkash' : IDL.Func([], [IDL.Text], []),
    'createLeaseAkash' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Text],
        [],
      ),
    'createUser' : IDL.Func([IDL.Text], [IDL.Text], []),
    'fundDeploymentTest' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text],
        [IDL.Text],
        [],
      ),
    'getAccountInfo' : IDL.Func([IDL.Text], [IDL.Text], []),
    'getAkashAddress' : IDL.Func([IDL.Text], [IDL.Text], []),
    'getAkashHeight' : IDL.Func([], [IDL.Text], []),
    'getBidsEnd' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'getCanisterAddressEVMEnd' : IDL.Func([IDL.Text], [IDL.Text], []),
    'getCanisterAkashAddress' : IDL.Func([], [IDL.Text], []),
    'getCoreDaoAkashPriceEnd' : IDL.Func([], [IDL.Text], []),
    'getDeployment' : IDL.Func([IDL.Text], [IDL.Text], []),
    'getDeploymentManifestInfo' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Text],
        [],
      ),
    'getEcdsaPublicKeyBase64End' : IDL.Func([], [IDL.Text], []),
    'getEthAkashPriceEnd' : IDL.Func([], [IDL.Text], []),
    'getEthereumAddress' : IDL.Func([], [IDL.Text], []),
    'getHttpTest' : IDL.Func([IDL.Text], [IDL.Text], []),
    'getNewAkashCertificate' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'getPubKey' : IDL.Func([], [IDL.Text], ['query']),
    'manageFundDeployment' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'newCreateCertificateAkash' : IDL.Func(
        [IDL.Text, IDL.Text],
        [IDL.Text],
        [],
      ),
    'newDeployment' : IDL.Func([IDL.Text], [IDL.Text], []),
    'returnCanisterEVMAddress' : IDL.Func([], [IDL.Text], []),
    'returnDeployment' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'sendManifestAkash' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'sendManifestEnd' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'testEvmInteraction' : IDL.Func([IDL.Text], [IDL.Text], []),
    'toaaCreateCertificate' : IDL.Func([], [IDL.Text], []),
    'toaaInfo' : IDL.Func([], [IDL.Text], ['query']),
    'toaaInitiate' : IDL.Func([], [IDL.Text], []),
    'transferAkashTokens' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text],
        [IDL.Text],
        [],
      ),
    'transferAkashTokensProvisorioEnd' : IDL.Func(
        [IDL.Text, IDL.Text],
        [IDL.Text],
        [],
      ),
    'transformResponse' : IDL.Func(
        [
          IDL.Record({
            'context' : IDL.Vec(IDL.Nat8),
            'response' : IDL.Record({
              'status' : IDL.Nat,
              'body' : IDL.Vec(IDL.Nat8),
              'headers' : IDL.Vec(
                IDL.Record({ 'value' : IDL.Text, 'name' : IDL.Text })
              ),
            }),
          }),
        ],
        [
          IDL.Record({
            'status' : IDL.Nat,
            'body' : IDL.Vec(IDL.Nat8),
            'headers' : IDL.Vec(
              IDL.Record({ 'value' : IDL.Text, 'name' : IDL.Text })
            ),
          }),
        ],
        ['query'],
      ),
    'updateContractEVMEnd' : IDL.Func([], [IDL.Text], []),
    'userExist' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
