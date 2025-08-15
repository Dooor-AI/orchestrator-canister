export const idlFactory = ({ IDL }) => {
  const Blob = IDL.Vec(IDL.Nat8);
  const BlsPk = IDL.Record({ 'pk' : Blob });
  const EncryptedKey = IDL.Record({ 'encrypted_key' : Blob });
  return IDL.Service({
    'bls_public_key' : IDL.Func([], [BlsPk], []),
    'delete_record' : IDL.Func([Blob], [IDL.Bool], []),
    'derive_data_key' : IDL.Func([Blob, Blob], [EncryptedKey], []),
    'get_record' : IDL.Func([Blob], [IDL.Opt(Blob)], []),
    'list_record_ids' : IDL.Func([], [IDL.Vec(Blob)], []),
    'put_record' : IDL.Func([Blob, Blob], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
