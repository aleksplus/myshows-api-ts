import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { JsonRpcError, JsonRpcResult } from '@json-rpc-tools/types';
import {
  OathResponse,
  OathResponseError,
  OathResponseV3,
  QueryHandlerParams,
  RpcError,
  RpcResponse,
  SearchObjectOptions,
} from './types';

export function createQueryInstance(url: string): AxiosInstance {
  return axios.create({
    baseURL: url,
  });
}

export async function queryHandler<T, P = {}>(
  { defaultParams, method, params, query, url = '' }: QueryHandlerParams<P>,
  config?: AxiosRequestConfig
): Promise<RpcResponse<T, P>> {
  try {
    const response = await query.post<JsonRpcResult | JsonRpcError>(
      url ?? '',
      {
        ...defaultParams,
        method: method,
        params: params,
      },
      config
    );

    if ((response.data as JsonRpcResult)?.result) {
      return {
        ...params,
        ...response.data,
      };
    } else {
      return { error: (response.data as JsonRpcError)?.error } as RpcError;
    }
  } catch (error) {
    return { error } as RpcError;
  }
}

/**
 * Returns search object with right properties.
 * @param {object} param0 - search object.
 */
export const getSearchObjectProps = ({
  query,
  wasted,
  year,
  gender,
}: SearchObjectOptions): SearchObjectOptions => ({
  query,
  wasted,
  year,
  gender,
});

export function handleErrorResponse<T extends OathResponseV3 | OathResponse>(
  response: AxiosResponse<T>
): RpcError {
  return {
    error: {
      code: response.status,
      message:
        (response.data as OathResponseError).error_description ??
        (response.data as OathResponseError).error,
    },
  };
}
