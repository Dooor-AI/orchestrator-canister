export const idlFactory = ({ IDL }) => {
  const Blob = IDL.Vec(IDL.Nat8);
  return IDL.Service({
    'add_cert' : IDL.Func([Blob], [], []),
    'bls_public_key' : IDL.Func([], [IDL.Record({ 'pk' : Blob })], []),
    'list_certs' : IDL.Func(
        [IDL.Opt(IDL.Principal)],
        [IDL.Vec(Blob)],
        ['query'],
      ),
    'sign_caller' : IDL.Func(
        [Blob, Blob],
        [IDL.Record({ 'signature' : Blob })],
        [],
      ),
    'sign_shutdown' : IDL.Func(
        [Blob, Blob, Blob],
        [IDL.Record({ 'canister_sig' : Blob, 'vetkd_sig' : Blob })],
        [],
      ),
    'verify_shutdown' : IDL.Func([Blob, Blob, Blob], [IDL.Bool], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
