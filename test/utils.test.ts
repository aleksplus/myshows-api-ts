import { describe, expect, it } from 'vitest';
import axios, { AxiosError } from 'axios';
import { queryHandler, toRpcError } from '../src/utils';
import { installMock, mockApi, rpcErr, rpcOk } from './helpers';

const defaultParams = { jsonrpc: '2.0', id: 1, params: {} };

function makeQuery(responses: Parameters<typeof mockApi>[0]) {
  const api = mockApi(responses);
  const instance = axios.create();
  installMock(instance, api);
  const query = (params: Record<string, unknown>) =>
    queryHandler({
      defaultParams,
      method: 'shows.GetById',
      params,
      query: instance,
    });
  return { query, api };
}

describe('queryHandler', () => {
  it('returns the result for a successful call', async () => {
    const { query } = makeQuery([rpcOk({ id: 1, title: 'Scrubs' })]);

    const response = await query({ showId: 1 });

    expect(response.error).toBeUndefined();
    expect(response.result).toEqual({ id: 1, title: 'Scrubs' });
  });

  it('treats falsy results as successes, not errors', async () => {
    for (const falsy of [false, 0, '', null]) {
      const { query } = makeQuery([rpcOk(falsy)]);
      const response = await query({ id: 1 });
      expect(response.error, `result: ${String(falsy)}`).toBeUndefined();
      expect(response.result).toEqual(falsy);
    }
  });

  it('returns the JSON-RPC error object on error responses', async () => {
    const { query } = makeQuery([rpcErr(-32001, 'episode not found')]);

    const response = await query({ id: 999 });

    expect(response).toEqual({ error: { code: -32001, message: 'episode not found' } });
  });

  it('reports a malformed body as an error', async () => {
    const { query } = makeQuery([{ data: '', status: 200 }]);

    const response = await query({ id: 1 });

    expect(response.error).toEqual({ code: 200, message: 'Malformed JSON-RPC response' });
  });

  it('normalizes HTTP errors to { code, message }', async () => {
    const { query } = makeQuery([{ data: { message: 'server exploded' }, status: 500 }]);

    const response = await query({ id: 1 });

    expect(response.error).toBeDefined();
    expect(response.error?.code).toBe(500);
  });

  it('normalizes thrown non-HTTP errors to { code: 0, message }', async () => {
    const instance = axios.create();
    instance.defaults.adapter = async () => {
      throw new Error('boom');
    };

    const response = await queryHandler({
      defaultParams,
      method: 'shows.GetById',
      params: { id: 1 },
      query: instance,
    });

    expect(response.error).toEqual({ code: 0, message: 'boom' });
  });

  it('sends the JSON-RPC 2.0 envelope with method and params', async () => {
    const { query, api } = makeQuery([rpcOk(true)]);

    await query({ showId: 7, withEpisodes: true });

    expect(api.requests[0]?.body).toEqual({
      jsonrpc: '2.0',
      id: 1,
      params: { showId: 7, withEpisodes: true },
      method: 'shows.GetById',
    });
  });
});

describe('toRpcError', () => {
  it('extracts code and error_description from axios errors with a response', () => {
    const error = new AxiosError('Request failed', 'ERR_BAD_REQUEST', undefined, undefined, {
      status: 400,
      statusText: 'Bad Request',
      data: { error: 'invalid_grant', error_description: 'Bad credentials' },
      headers: {},
      config: {} as never,
    } as never);

    expect(toRpcError(error)).toEqual({ error: { code: 400, message: 'Bad credentials' } });
  });

  it('falls back to the axios message for network-level failures', () => {
    const error = new AxiosError('Network Error');

    expect(toRpcError(error)).toEqual({ error: { code: 0, message: 'Network Error' } });
  });

  it('stringifies unknown thrown values', () => {
    expect(toRpcError('nope')).toEqual({ error: { code: 0, message: 'nope' } });
  });
});
