import { Message } from "../stargate";
import { AminoMsg } from "cosmwasm";
import { MsgCreateCertificate, MsgRevokeCertificate } from "@akashnetwork/akash-api/akash/cert/v1beta3";
export declare function createAminoMessage(message: Message, messageBody: AminoMsg): {
    typeUrl: Message;
    value: AminoMsg;
};
declare type WithoutType<T> = Omit<T, "$type">;
declare type MessageTypes = {
    [Message.MsgCreateCertificate]: WithoutType<MsgCreateCertificate>;
    [Message.MsgRevokeCertificate]: Omit<WithoutType<MsgRevokeCertificate>, "id"> & {
        id: WithoutType<MsgRevokeCertificate["id"]>;
    };
};
export declare function createStarGateMessage<T extends keyof MessageTypes>(message: T, messageBody: MessageTypes[T]): {
    message: {
        typeUrl: T;
        value: MessageTypes[T];
    };
    fee: {
        amount: {
            denom: string;
            amount: string;
        }[];
        gas: string;
    };
};
export {};
