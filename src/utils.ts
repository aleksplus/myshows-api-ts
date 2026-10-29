import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import type { QueryHandlerParams, SearchObjectOptions } from './types/request';
import type {
  JSONRPCErrorResponse,
  JSONRPCResponse,
  OathResponse,
  OathResponseError,
  OathResponseV3,
  RpcError,
  RpcResponse,
} from './types/rpcUtils';

/** Default request timeout for API calls. */
export const DEFAULT_TIMEOUT_MS = 15_000;

export function createQueryInstance(url: string, config: AxiosRequestConfig = {}): AxiosInstance {
  return axios.create({
    baseURL: url,
    timeout: DEFAULT_TIMEOUT_MS,
    ...config,
  });
}

/**
 * Normalizes any thrown value (AxiosError, Error, anything else) into the
 * `RpcError` shape, so consumers always get `{ error: { code, message } }`.
 */
export function toRpcError(error: unknown): RpcError {
  if (axios.isAxiosError(error)) {
    return {
      error: {
        code: error.response?.status ?? 0,
        message:
          (error.response?.data as OathResponseError | undefined)?.error_description ??
          error.response?.statusText ??
          error.message,
      },
    };
  }
  return {
    error: {
      code: 0,
      message: error instanceof Error ? error.message : String(error),
    },
  };
}

export async function queryHandler<T, P = {}>(
  { defaultParams, method, params, query, url = '' }: QueryHandlerParams<P>,
  config?: AxiosRequestConfig,
): Promise<RpcResponse<T, P>> {
  try {
    const response = await query.post<JSONRPCResponse | JSONRPCErrorResponse>(
      url ?? '',
      {
        ...defaultParams,
        method,
        params,
      },
      config,
    );

    // A falsy `result` (false, 0, '' …) is a valid payload; only a JSON-RPC
    // error object marks the call as failed.
    if (!response.data || (response.data as JSONRPCErrorResponse).error) {
      return {
        error: (response.data as JSONRPCErrorResponse)?.error ?? {
          code: response.status,
          message: 'Malformed JSON-RPC response',
        },
      } as RpcError;
    }

    return {
      ...params,
      ...(response.data as JSONRPCResponse),
    };
  } catch (error) {
    return toRpcError(error);
  }
}

/**
 * Returns search object with right properties.
 * @param {object} param0 - search object.
 */
export const getSearchObjectProps = ({ query, wasted, year, gender }: SearchObjectOptions): SearchObjectOptions => ({
  query,
  wasted,
  year,
  gender,
});

export function handleErrorResponse<T extends OathResponseV3 | OathResponse>(response: AxiosResponse<T>): RpcError {
  return {
    error: {
      code: response.status,
      message: (response.data as OathResponseError).error_description ?? (response.data as OathResponseError).error,
    },
  };
}
