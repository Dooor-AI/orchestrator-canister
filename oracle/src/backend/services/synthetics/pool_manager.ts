import { update, text, ic, None, Record, query, int } from 'azle';
import { managementCanister } from 'azle/canisters/management';
import { Transaction } from '@ethersproject/transactions';
import { ethers } from 'ethers';
import { callRpc } from './evm_rpc_interaction';
import { getCanisterEVMAddress } from './interaction_evm';
import { wait } from './timer';
import { contractAddress, dplABI, providerUrl, canisterKeyEcdsa } from './constants';

// Helper function to wait
async function waitFor(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const updateContractNewEVM = update([int, text], text, async (tokenId: number, akashHash: string) => {
    console.log('Starting new contract interaction');
    const evmAddress = await getCanisterEVMAddress();
    
    const contract = new ethers.Contract(contractAddress, dplABI);
    console.log('Contract instance created');

    const functionSignature = 'updateDeployment(uint256,string)';
    const data = contract.interface.encodeFunctionData(functionSignature, [tokenId, akashHash]);

    console.log('Getting gas price');
    const gasPriceResponse = await callRpc(providerUrl, {
        jsonrpc: "2.0",
        method: "eth_gasPrice",
        params: [],
        id: 1
    });
    await waitFor(5000);

    console.log('Getting transaction count');
    const nonceResponse = await callRpc(providerUrl, {
        jsonrpc: "2.0",
        method: "eth_getTransactionCount",
        params: [evmAddress, "latest"],
        id: 1
    });
    await waitFor(5000);

    console.log('Getting network version');
    const networkVersionResponse = await callRpc(providerUrl, {
        jsonrpc: "2.0",
        method: "net_version",
        params: [],
        id: 1
    });
    await waitFor(5000);

    const tx = {
        to: contractAddress,
        value: ethers.parseEther('0.0'),
        gasPrice: gasPriceResponse.result,
        chainId: networkVersionResponse.result,
        gasLimit: BigInt(72000),
        data: data,
        nonce: nonceResponse.result,
    };

    console.log('Creating transaction');
    const unsignedTx = Transaction.from(tx).unsignedSerialized;
    const txHash = ethers.keccak256(unsignedTx);
    const messageHash = ethers.getBytes(txHash);

    console.log('Signing transaction with ECDSA');
    const signatureResult = await ic.call(managementCanister.sign_with_ecdsa, {
        args: [{
            message_hash: messageHash,
            derivation_path: [],
            key_id: {
                curve: { secp256k1: null },
                name: canisterKeyEcdsa
            }
        }],
        cycles: 25_000_000_000n
    });

    const signature = signatureResult.signature;
    const r = signature.slice(0, 32);
    const s = signature.slice(32, 64);
    const rHex = ethers.hexlify(r);
    const sHex = ethers.hexlify(s);

    console.log('Creating signed transactions');
    const signatureV28 = ethers.Signature.from({ v: 28, r: rHex, s: sHex }).serialized;
    const signatureV27 = ethers.Signature.from({ v: 27, r: rHex, s: sHex }).serialized;

    const txObject = Transaction.from(unsignedTx);
    const signedTx28 = Transaction.from(txObject).serialize(signatureV28);
    const signedTx27 = Transaction.from(txObject).serialize(signatureV27);

    console.log('Determining correct signature');
    let finalSignedTx;
    if (Transaction.from(signedTx28).from === evmAddress) {
        finalSignedTx = signedTx28;
        console.log('Using v=28 signature');
    } else if (Transaction.from(signedTx27).from === evmAddress) {
        finalSignedTx = signedTx27;
        console.log('Using v=27 signature');
    } else {
        throw new Error('Failed to create a valid signature');
    }

    console.log('Broadcasting transaction');
    const broadcastResponse = await callRpc(providerUrl, {
        jsonrpc: "2.0",
        method: "eth_sendRawTransaction",
        params: [finalSignedTx],
        id: 1
    });

    console.log('Broadcast response:', broadcastResponse);
    return broadcastResponse.result || '';
});