import { MessageType, UnknownMessage } from "@akashnetwork/akash-api/typeRegistry";
export declare const getAkashTypeRegistry: () => [string, MessageType<UnknownMessage>][];
export declare const getTypeUrl: (type: MessageType) => string;
export declare enum Message {
    MsgCreateCertificate = "/akash.cert.v1beta3.MsgCreateCertificate",
    MsgRevokeCertificate = "/akash.cert.v1beta3.MsgRevokeCertificate",
    MsgCreateDeployment = "/akash.deployment.v1beta3.MsgCreateDeployment",
    MsgCloseDeployment = "/akash.deployment.v1beta3.MsgCloseDeployment",
    MsgDepositDeployment = "/akash.deployment.v1beta3.MsgDepositDeployment",
    MsgUpdateDeployment = "/akash.deployment.v1beta3.MsgUpdateDeployment",
    MsgCloseGroup = "/akash.deployment.v1beta3.MsgCloseGroup",
    MsgPauseGroup = "/akash.deployment.v1beta3.MsgPauseGroup",
    MsgStartGroup = "/akash.deployment.v1beta3.MsgStartGroup",
    MsgCreateLease = "/akash.market.v1beta4.MsgCreateLease"
}
