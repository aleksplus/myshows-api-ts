import axios, { AxiosError, type AxiosAdapter, type InternalAxiosRequestConfig } from 'axios';

export interface CapturedRequest {
  url: string;
  body: any;
  headers: Record<string, string>;
}

export interface MockApi {
  adapter: AxiosAdapter;
  requests: CapturedRequest[];
}

/**
 * Creates an axios adapter that records every request and replies with the
 * next queued response (or `{ result: null }` when the queue is empty).
 * Mirrors the built-in http adapter: HTTP >= 400 rejects with an AxiosError.
 */
export function mockApi(
  responses: Array<{ data?: unknown; status?: number; headers?: Record<string, string> }> = [],
): MockApi {
  const requests: CapturedRequest[] = [];
  const queue = [...responses];

  const adapter: AxiosAdapter = async (config: InternalAxiosRequestConfig) => {
    requests.push({
      url: config.url ?? '',
      body: typeof config.data === 'string' ? JSON.parse(config.data) : config.data,
      headers: config.headers as Record<string, string>,
    });
    const response = queue.shift() ?? { data: { jsonrpc: '2.0', id: 1, result: null }, status: 200 };
    const status = response.status ?? 200;
    const axiosResponse = {
      data: response.data,
      status,
      statusText: status >= 400 ? 'Error' : 'OK',
      headers: response.headers ?? {},
      config,
    };

    if (status >= 400) {
      throw new AxiosError(
        `Request failed with status code ${status}`,
        AxiosError.ERR_BAD_RESPONSE,
        config,
        undefined,
        axiosResponse as never,
      );
    }

    return axiosResponse;
  };

  return { adapter, requests };
}

/** Replaces the adapter of an axios instance so no real requests are made. */
export function installMock(instance: ReturnType<typeof axios.create>, api: MockApi) {
  instance.defaults.adapter = api.adapter;
}

export function rpcOk(result: unknown) {
  return { data: { jsonrpc: '2.0', id: 1, result }, status: 200 };
}

export function rpcErr(code = -32000, message = 'rpc failure') {
  return { data: { jsonrpc: '2.0', id: 1, error: { code, message } }, status: 200 };
}

export const credentials = {
  client_id: 'cid',
  client_secret: 'secret',
  username: 'user',
  password: 'pass',
};
