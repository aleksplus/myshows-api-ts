import { describe, expect, it } from 'vitest';
import { MyShows } from '../src/components/base';
import { credentials, installMock, mockApi, rpcOk } from './helpers';

function makeClient(responses: Parameters<typeof mockApi>[0] = []) {
  const client = new MyShows(credentials);
  const api = mockApi(responses);
  installMock(client['axios'], api);
  installMock(client['axiosV3'], api);
  return { client, api };
}

describe('MyShows request bodies', () => {
  it('showsPostEpisodeComment sends image/parentCommentId params', async () => {
    const { client, api } = makeClient([rpcOk({ id: 1 })]);

    await client.showsPostEpisodeComment(42, 'nice episode', undefined, 7);

    expect(api.requests[0]?.body.params).toEqual({
      episodeId: 42,
      text: 'nice episode',
      parentCommentId: 7,
    });
  });

  it('showsPostEpisodeComment omits unset optional params', async () => {
    const { client, api } = makeClient([rpcOk({ id: 1 })]);

    await client.showsPostEpisodeComment(42, 'nice episode');

    expect(api.requests[0]?.body.params).toEqual({ episodeId: 42, text: 'nice episode' });
  });

  it('manageRateEpisodesBulk sends only r1..r5', async () => {
    const { client, api } = makeClient([rpcOk(true)]);

    await client.manageRateEpisodesBulk([1, 2], [3], [], [], [4]);

    expect(api.requests[0]?.body.params).toEqual({ r1: [1, 2], r2: [3], r3: [], r4: [], r5: [4] });
  });

  it('omits login entirely when not provided', async () => {
    const { client, api } = makeClient([rpcOk({})]);

    await client.profileGet();

    expect(api.requests[0]?.body.params).toEqual({});
  });

  it('passes login through when provided', async () => {
    const { client, api } = makeClient([rpcOk({})]);

    await client.profileGet('someuser');

    expect(api.requests[0]?.body.params).toEqual({ login: 'someuser' });
  });
});

describe('MyShows responses', () => {
  it('returns falsy results without treating them as errors', async () => {
    const { client } = makeClient([rpcOk(false)]);

    const response = await client.manageUnCheckEpisode(1);

    expect(response.error).toBeUndefined();
    expect(response.result).toBe(false);
  });

  it('routes v3 methods through the v3 endpoint', async () => {
    const { client, api } = makeClient([rpcOk(true)]);

    await client.manageSetMovieStatus(8715, 'finished' as never);

    expect(api.requests[0]?.body.method).toBe('manage.SetMovieStatus');
    expect(api.requests[0]?.body.params).toEqual({ movieId: 8715, status: 'finished' });
  });
});
