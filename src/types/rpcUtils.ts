import { JSONRPCErrorResponse, JSONRPCResponse } from 'json-rpc-2.0';

type OmitRpc<
  T extends {
    jsonrpc: any;
    id: any;
  },
> = Omit<T, 'jsonrpc' | 'id'>;
export type OathResponseError = {
  error: string;
  error_description: string;
};
export type OathResponseDone = {
  access_token: string;
  expires_in: number;
  token_type: 'Bearer';
  scope: 'basic';
  refresh_token: string;
};
export type OathResponse = OathResponseError | OathResponseDone;
export type OathResponseV3Done = {
  token: string;
};
export type OathResponseV3 = OathResponseError | OathResponseV3Done;

export type RpcError = OmitRpc<JSONRPCErrorResponse>;
export type RpcResult<T = any> = OmitRpc<JSONRPCResponse>;
export type RpcResponse<T = any, P = {}> = (RpcResult<T> & P) | RpcError;
