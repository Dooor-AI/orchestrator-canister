export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'closeDeploymentAkash' : IDL.Func([IDL.Text], [IDL.Text], []),
    'createCertificateAkash' : IDL.Func([], [IDL.Text], []),
    'createDeploymentAkash' : IDL.Func([], [IDL.Text], []),
    'createLeaseAkash' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Text],
        [],
      ),
    'getAkashAddress' : IDL.Func([], [IDL.Text], []),
    'getManifestProviderList' : IDL.Func([], [IDL.Text], []),
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
  });
};
export const init = ({ IDL }) => { return []; };
