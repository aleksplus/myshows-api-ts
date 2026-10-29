/** Minimal JSON-RPC 2.0 envelope types (inlined from json-rpc-2.0 to avoid a runtime dependency). */
export interface JSONRPCError {
  code: number;
  message: string;
  data?: unknown;
}

export interface JSONRPCSuccessResponse {
  jsonrpc: '2.0';
  id: string | number | null;
  // oxlint-disable-next-line no-explicit-any -- `any` is required so `RpcResult & { result?: T }` stays assignable to T
  result: any;
  error?: undefined;
}

export interface JSONRPCErrorResponse {
  jsonrpc: '2.0';
  id: string | number | null;
  result?: undefined;
  error: JSONRPCError;
}

export type JSONRPCResponse = JSONRPCSuccessResponse | JSONRPCErrorResponse;

type OmitRpc<T extends {}> = Omit<T, 'jsonrpc' | 'id'>;
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
export type RpcResult = OmitRpc<JSONRPCResponse>;
export type RpcResponse<T = any, P = {}> = (RpcResult & { result?: T } & P) | RpcError;
