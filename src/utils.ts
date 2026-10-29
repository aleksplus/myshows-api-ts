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

export function createQueryInstance(url: string): AxiosInstance {
  return axios.create({
    baseURL: url,
  });
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

    return (response.data as JSONRPCResponse)?.result
      ? {
          ...params,
          ...response.data,
        }
      : ({
          error: (response.data as JSONRPCErrorResponse)?.error,
        } as RpcError);
  } catch (error) {
    return { error } as RpcError;
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
