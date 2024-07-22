"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastLoaded = exports.getAccount = exports.importAccount = exports.createAccount = void 0;
const launchpad_1 = require("@cosmjs/launchpad");
const keytar_1 = __importDefault(require("keytar"));
let wallet;
async function createAccount() {
    wallet = await launchpad_1.Secp256k1HdWallet.generate(undefined, { prefix: "akash" });
    const [{ address }] = await wallet.getAccounts();
    keytar_1.default.setPassword("AkashNetwork", address, wallet.mnemonic);
    return {
        mnemonic: wallet.mnemonic,
        address
    };
}
exports.createAccount = createAccount;
async function importAccount(mnemonic) {
    wallet = await launchpad_1.Secp256k1HdWallet.fromMnemonic(mnemonic);
    const accounts = await wallet.getAccounts();
    return accounts;
}
exports.importAccount = importAccount;
async function getAccount(address) {
    const mnemonic = await keytar_1.default.getPassword("AkashNetwork", address);
    return importAccount(mnemonic);
}
exports.getAccount = getAccount;
async function getLastLoaded() {
    return wallet;
}
exports.getLastLoaded = getLastLoaded;
