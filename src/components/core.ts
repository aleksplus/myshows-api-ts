import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { AUTH_URL, AUTH_URL_V3, BASE_URL_V2, BASE_URL_V3, DEFAULT_PARAMS } from '../constants';
import type {
  Credentials,
  DefaultParams,
  MethodParams,
  MethodV3,
  QueryHandlerParams,
  QueryParams,
} from '../types/request';
import type {
  OathResponse,
  OathResponseDone,
  OathResponseError,
  OathResponseV3,
  OathResponseV3Done,
  RpcError,
  RpcResponse,
} from '../types/rpcUtils';

import { createQueryInstance, handleErrorResponse, queryHandler, toRpcError } from '../utils';

export class MyShowsCore {
  private readonly credentials: Credentials;
  private refreshToken?: string;
  private tokenExpiresAt?: number;
  protected axios: AxiosInstance;
  protected axiosV3: AxiosInstance;
  defaultParams: DefaultParams;

  constructor(credentials: Credentials, config: AxiosRequestConfig = {}) {
    this.credentials = {
      ...credentials,
      grant_type: 'password',
    };
    this.axios = createQueryInstance(BASE_URL_V2, config);
    this.axiosV3 = createQueryInstance(BASE_URL_V3, config);
    this.defaultParams = DEFAULT_PARAMS;
  }

  /**
   * Returns an error if log in fails.
   */
  async login(): Promise<RpcError | undefined> {
    try {
      const response = await this.axios.post<OathResponse>(AUTH_URL, this.credentials);

      if ((response.data as OathResponseError).error) {
        return handleErrorResponse(response);
      }

      this.applyOAuthTokens(response.data as OathResponseDone);
    } catch (error) {
      return toRpcError(error);
    }
  }

  /**
   * Refreshes the OAuth access token using the refresh token from the last
   * successful `login()`. Returns an error if no session to refresh.
   */
  async refresh(): Promise<RpcError | undefined> {
    if (!this.refreshToken) {
      return { error: { code: 0, message: 'No refresh token: call login() first' } };
    }

    try {
      const response = await this.axios.post<OathResponse>(AUTH_URL, {
        client_id: this.credentials.client_id,
        client_secret: this.credentials.client_secret,
        grant_type: 'refresh_token',
        refresh_token: this.refreshToken,
      });

      if ((response.data as OathResponseError).error) {
        return handleErrorResponse(response);
      }

      this.applyOAuthTokens(response.data as OathResponseDone);
    } catch (error) {
      return toRpcError(error);
    }
  }

  /**
   * True when there is no stored access token or it has expired.
   */
  isTokenExpired(): boolean {
    return this.tokenExpiresAt === undefined || Date.now() >= this.tokenExpiresAt;
  }

  /**
   * Returns an error if log in fails.
   */
  async loginV3(): Promise<RpcError | undefined> {
    try {
      const response = await this.axiosV3.post<OathResponseV3>(AUTH_URL_V3, {
        login: this.credentials.username,
        password: this.credentials.password,
      });

      if ((response.data as OathResponseError).error) {
        return handleErrorResponse(response);
      }

      // Header names match the myshows.me web app; do not "fix" the casing
      // without verifying against the live v3 API.
      this.axiosV3.defaults.headers.common.cookies = response.headers['set-cookie']?.join(';') ?? '';
      this.axiosV3.defaults.headers.common.authorization2 = `Bearer ${(response.data as OathResponseV3Done).token}`;
    } catch (error) {
      return toRpcError(error);
    }
  }

  /**
   * Internal query wrapper
   * @param params
   * @param instance
   */
  protected async query<T, P = QueryParams>(
    params: Omit<QueryHandlerParams<P>, 'query' | 'defaultParams'>,
    instance?: AxiosInstance,
  ) {
    return await queryHandler<T, P>({
      query: instance ?? this.axios,
      defaultParams: this.defaultParams,
      ...params,
    });
  }

  /**
   * Internal query wrapper V3
   * @param params
   * @param instance
   */
  protected async queryV3<T, P = QueryParams>(
    params: Omit<QueryHandlerParams<P, MethodV3>, 'query' | 'defaultParams'>,
    instance?: AxiosInstance,
  ) {
    return await queryHandler<T, P>({
      query: instance ?? this.axiosV3,
      defaultParams: this.defaultParams,
      ...params,
    });
  }

  /**
   * Generic api method, list of available methods: https://api.myshows.me/shared/doc/
   * @param {string} method - RPC method name.
   * @param {object} params - Method params, typed per method via `MethodParams`.
   */
  async generic<T = unknown, M extends keyof MethodParams = keyof MethodParams>(
    method: M,
    params: MethodParams[M],
  ): Promise<RpcResponse<T>> {
    return await this.query<T, MethodParams[M]>({
      method,
      params,
    });
  }

  private applyOAuthTokens(data: OathResponseDone) {
    this.axios.defaults.headers.common.Authorization = `bearer ${data.access_token}`;
    this.refreshToken = data.refresh_token;
    this.tokenExpiresAt = Date.now() + data.expires_in * 1000;
  }
}
