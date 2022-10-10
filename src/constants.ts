import { DefaultParams } from './types';

export const AUTH_URL = 'https://myshows.me/oauth/token';
export const AUTH_URL_V3 = 'https://myshows.me/api/session';
export const BASE_URL_V2 = 'https://api.myshows.me/v2/rpc/';
export const BASE_URL_V3 = 'https://myshows.me/v3/rpc/';
export const DEFAULT_PARAMS: DefaultParams = {
  jsonrpc: '2.0',
  // @ts-ignore
  method: '',
  params: {},
  id: 1,
};
