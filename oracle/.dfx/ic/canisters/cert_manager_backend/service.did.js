export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'createAndStoreCertificateKeys' : IDL.Func([], [IDL.Text], []),
    'updateContractEVMEnd' : IDL.Func([], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
