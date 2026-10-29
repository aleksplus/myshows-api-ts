/**
 * Integration tests against the live MyShows API.
 *
 * Skipped unless credentials are provided via env vars, so CI never runs it:
 *
 *   MYSHOWS_CLIENT_ID=... MYSHOWS_CLIENT_SECRET=... \
 *   MYSHOWS_USERNAME=... MYSHOWS_PASSWORD=... \
 *   npx vitest run test/integration.test.ts
 *
 * Read-only methods only — nothing here changes the account's data.
 */
import { beforeAll, describe, expect, it } from 'vitest';
import { MyShows } from '../src/components/base';
import { EGenderVote } from '../src/enums';

const hasCredentials = Boolean(
  process.env.MYSHOWS_CLIENT_ID &&
  process.env.MYSHOWS_CLIENT_SECRET &&
  process.env.MYSHOWS_USERNAME &&
  process.env.MYSHOWS_PASSWORD,
);

describe.skipIf(!hasCredentials)('MyShows live API', () => {
  let client: MyShows;

  beforeAll(() => {
    client = new MyShows({
      client_id: process.env.MYSHOWS_CLIENT_ID!,
      client_secret: process.env.MYSHOWS_CLIENT_SECRET!,
      username: process.env.MYSHOWS_USERNAME!,
      password: process.env.MYSHOWS_PASSWORD!,
    });
  });

  describe('v2 (OAuth + api.myshows.me)', () => {
    it('login() succeeds and stores the token', async () => {
      const error = await client.login();
      expect(error).toBeUndefined();
      expect(client.isTokenExpired()).toBe(false);
    });

    it('profileGet() returns the authenticated user', async () => {
      const response = await client.profileGet();
      expect(response.error).toBeUndefined();
      expect(response.result?.user?.login).toBe(process.env.MYSHOWS_USERNAME);
      expect(typeof response.result?.stats?.watchedEpisodes).toBe('number');
    });

    it('listsShows() returns an array of show summaries', async () => {
      const response = await client.listsShows();
      expect(response.error).toBeUndefined();
      expect(Array.isArray(response.result)).toBe(true);
      for (const show of response.result ?? []) {
        expect(typeof show.id).toBe('number');
        expect(typeof show.title).toBe('string');
      }
    });

    it('showsSearch() returns matched shows', async () => {
      const response = await client.showsSearch('Scrubs');
      expect(response.error).toBeUndefined();
      expect((response.result ?? []).length).toBeGreaterThan(0);
      expect(response.result?.[0]?.titleOriginal).toBeDefined();
    });

    it('showsTop() returns ranked shows', async () => {
      const response = await client.showsTop(EGenderVote.ALL, 10);
      expect(response.error).toBeUndefined();
      expect(response.result?.[0]?.rank).toBeDefined();
    });

    it('profileCounters() returns counters', async () => {
      const response = await client.profileCounters();
      expect(response.error).toBeUndefined();
      expect(typeof response.result?.unwatchedEpisodes).toBe('number');
    });

    it('refresh() exchanges the refresh token', async () => {
      const error = await client.refresh();
      expect(error).toBeUndefined();
      expect(client.isTokenExpired()).toBe(false);

      const response = await client.profileGet();
      expect(response.error).toBeUndefined();
    });

    it('wrong password produces a normalized RpcError', async () => {
      const bad = new MyShows({
        client_id: process.env.MYSHOWS_CLIENT_ID!,
        client_secret: process.env.MYSHOWS_CLIENT_SECRET!,
        username: process.env.MYSHOWS_USERNAME!,
        password: 'definitely-wrong-password',
      });
      const error = await bad.login();
      expect(error?.error).toBeDefined();
      expect(typeof error?.error?.code).toBe('number');
      expect(typeof error?.error?.message).toBe('string');
    });
  });

  describe('v3 (myshows.me session + movies)', () => {
    it('loginV3() succeeds and stores the session', async () => {
      const error = await client.loginV3();
      expect(error).toBeUndefined();
    });

    it('moviesSearch() returns matched movies', async () => {
      const response = await client.moviesSearch('Django Unchained');
      expect(response.error).toBeUndefined();
      expect((response.result ?? []).length).toBeGreaterThan(0);
      expect(response.result?.[0]?.movie?.titleOriginal).toBeDefined();
      expect(response.result?.[0]).toHaveProperty('weeklyRank');
      expect(response.result?.[0]?.movie?.genres?.[0]).toMatchObject({
        id: expect.any(Number),
        title: expect.any(String),
        alias: expect.any(String),
      });
    });

    it('moviesGetById() returns a movie via the v3 endpoint', async () => {
      const response = await client.moviesGetById(1162);
      expect(response.error).toBeUndefined();
      expect(response.result?.titleOriginal).toBe('Django Unchained');
      expect(typeof response.result?.canRate).toBe('boolean');
    });
  });
});
