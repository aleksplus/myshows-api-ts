import { describe, expect, it } from 'vitest';
import { MyShowsCore } from '../src/components/core';
import type { OathResponseDone } from '../src/types/rpcUtils';
import { credentials, installMock, mockApi } from './helpers';

function oauthDone(accessToken: string): OathResponseDone {
  return {
    access_token: accessToken,
    expires_in: 3600,
    token_type: 'Bearer',
    scope: 'basic',
    refresh_token: `refresh-${accessToken}`,
  };
}

function makeCore(responses: Parameters<typeof mockApi>[0] = []) {
  const core = new MyShowsCore(credentials);
  const api = mockApi(responses);
  installMock(core['axios'], api);
  installMock(core['axiosV3'], api);
  return { core, api };
}

describe('MyShowsCore.login', () => {
  it('stores the bearer token and expiry on success', async () => {
    const { core } = makeCore([{ data: oauthDone('token-1'), status: 200 }]);

    const error = await core.login();

    expect(error).toBeUndefined();
    expect(core['axios'].defaults.headers.common.Authorization).toBe('bearer token-1');
    expect(core.isTokenExpired()).toBe(false);
  });

  it('reports OAuth errors from an HTTP 400 as { code, message }', async () => {
    const { core } = makeCore([
      { data: { error: 'invalid_grant', error_description: 'Bad credentials' }, status: 400 },
    ]);

    const error = await core.login();

    expect(error).toEqual({ error: { code: 400, message: 'Bad credentials' } });
    expect(core['axios'].defaults.headers.common.Authorization).toBeUndefined();
  });

  it('reports OAuth errors delivered with HTTP 200', async () => {
    const { core } = makeCore([
      { data: { error: 'invalid_client', error_description: 'unknown client' }, status: 200 },
    ]);

    const error = await core.login();

    expect(error).toEqual({ error: { code: 200, message: 'unknown client' } });
  });
});

describe('MyShowsCore.refresh', () => {
  it('fails when there is no previous login', async () => {
    const { core } = makeCore();

    const error = await core.refresh();

    expect(error?.error?.message).toBe('No refresh token: call login() first');
  });

  it('exchanges the refresh token for a new access token', async () => {
    const { core, api } = makeCore([
      { data: oauthDone('token-1'), status: 200 },
      { data: oauthDone('token-2'), status: 200 },
    ]);

    await core.login();
    const error = await core.refresh();

    expect(error).toBeUndefined();
    expect(core['axios'].defaults.headers.common.Authorization).toBe('bearer token-2');

    const refreshBody = api.requests[1]?.body;
    expect(refreshBody.grant_type).toBe('refresh_token');
    expect(refreshBody.refresh_token).toBe('refresh-token-1');
    expect(refreshBody.client_id).toBe('cid');
  });

  it('reports refresh failures as RpcError', async () => {
    const { core } = makeCore([
      { data: oauthDone('token-1'), status: 200 },
      { data: { error: 'invalid_grant', error_description: 'refresh token expired' }, status: 400 },
    ]);

    await core.login();
    const error = await core.refresh();

    expect(error).toEqual({ error: { code: 400, message: 'refresh token expired' } });
  });
});

describe('MyShowsCore.isTokenExpired', () => {
  it('is true before login', () => {
    const { core } = makeCore();
    expect(core.isTokenExpired()).toBe(true);
  });
});

describe('MyShowsCore.loginV3', () => {
  it('stores the session token and cookies', async () => {
    const { core } = makeCore([
      { data: { token: 'v3-token' }, status: 200, headers: { 'set-cookie': ['a=1', 'b=2'] } },
    ]);

    const error = await core.loginV3();

    expect(error).toBeUndefined();
    expect(core['axiosV3'].defaults.headers.common.authorization2).toBe('Bearer v3-token');
  });

  it('reports v3 auth failures', async () => {
    const { core } = makeCore([{ data: { error: 'invalid_login', error_description: 'wrong password' }, status: 200 }]);

    const error = await core.loginV3();

    expect(error).toEqual({ error: { code: 200, message: 'wrong password' } });
  });
});
