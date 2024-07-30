export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'closeDeploymentAkash' : IDL.Func([IDL.Text], [IDL.Text], []),
    'closeDeploymentAkashFromAddress' : IDL.Func([IDL.Text], [IDL.Text], []),
    'createAndStoreCertificateKeys' : IDL.Func([], [IDL.Text], []),
    'createDeploymentAkash' : IDL.Func([], [IDL.Text], []),
    'createLeaseAkash' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Text],
        [],
      ),
    'createUser' : IDL.Func([IDL.Text], [IDL.Text], []),
    'getAkashAddress' : IDL.Func([IDL.Text], [IDL.Text], []),
    'getBidsA' : IDL.Func([], [IDL.Text], []),
    'getCanisterAddressEVMEnd' : IDL.Func([IDL.Text], [IDL.Text], []),
    'getDeploymentManifestInfo' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Text],
        [],
      ),
    'getEcdsaPublicKeyBase64End' : IDL.Func([], [IDL.Text], []),
    'getEthereumAddress' : IDL.Func([], [IDL.Text], []),
    'getNewAkashCertificate' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'getUsers' : IDL.Func([], [IDL.Text], ['query']),
    'newCreateCertificateAkash' : IDL.Func(
        [IDL.Text, IDL.Text],
        [IDL.Text],
        [],
      ),
    'newDeployment' : IDL.Func([IDL.Text], [IDL.Text], []),
    'sendManifestAkash' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'transferAkashTokens' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text],
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
  });
};
export const init = ({ IDL }) => { return []; };
