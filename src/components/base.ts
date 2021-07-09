import axios, { AxiosInstance } from "axios";
import {
  Credentials,
  DefaultParams,
  EGender,
  EGenderVote,
  EList,
  EShowSources,
  EShowStatus,
  IMyShows,
  Method,
  RpcResponse,
} from "../types";

const AUTH_URL = "https://myshows.me/oauth/token";
const BASE_URL = "https://api.myshows.me/v2/rpc/";
const DEFAULT_PARAMS: DefaultParams = {
  jsonrpc: "2.0",
  // @ts-ignore
  method: "",
  params: {},
  id: 1,
};

type SearchObjectOptions = Partial<{
  query: string;
  wasted: number;
  year: number;
  gender: EGender;
}>;
/**
 * Returns search object with right properties.
 * @param {object} param0 - search object.
 */
const GetSearchObjectProps = ({
  query,
  wasted,
  year,
  gender,
}: SearchObjectOptions) => ({
  query,
  wasted,
  year,
  gender,
});

export class MyShows implements IMyShows {
  credentials: Credentials;
  axios: AxiosInstance;
  defaultParams: DefaultParams;

  constructor(credentials: Credentials) {
    this.credentials = {
      ...credentials,
      grant_type: "password",
    };
    this.axios = axios.create({
      baseURL: BASE_URL,
    });
    this.defaultParams = DEFAULT_PARAMS;
  }

  /**
   * Returns an error if log in fails.
   */
  async login() {
    try {
      let response = await this.axios.post(AUTH_URL, this.credentials);

      this.axios.defaults.headers.common[
        "Authorization"
      ] = `bearer ${response.data.access_token}`;
    } catch (error) {
      return { error };
    }
  }

  /**
   * Generic api method, list of available methods: https://api.myshows.me/shared/doc/
   * @param {string} method
   * @param {object} params
   */
  async generic<T>(method: Method, params: Record<string, unknown>) {
    try {
      const response = await this.axios.post<T>("", {
        ...this.defaultParams,
        method: method,
        params,
      });

      if (response) {
        return response.data;
      } else {
        // @ts-ignore
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Returns a list of shows (requires authentication).
   * @param {string} [list=MyShows.EList.FAVORITES] - A list name.
   */
  async listsShows<T>(
    list = EList.FAVORITES
  ): Promise<RpcResponse<T, { list: EList }>> {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "lists.Shows",
        params: {
          list,
        },
      });

      const { result } = response.data;

      if (result) {
        return { list, result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Adds a show to favorites list, returns true
   * if adding was successful (requires authentication).
   * @param {int} id - Show id
   */
  async listsAddShow<T>(id: number): Promise<RpcResponse<T, { id: number }>> {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "lists.AddShow",
        params: {
          id,
          list: EList.FAVORITES,
        },
      });

      const { result } = response.data;

      if (result) {
        return { id, result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Removes a show from favorites list, returns true
   * if removing was successful (requires authentication).
   * @param {int} id - Episode id.
   */
  async listsRemoveShow<T>(id: number): Promise<
    RpcResponse<
      T,
      {
        id: number;
      }
    >
  > {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "lists.RemoveShow",
        params: {
          id,
          list: EList.FAVORITES,
        },
      });

      const { result } = response.data;

      if (result) {
        return { id, result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Returns a list of episodes (requires authentication).
   * @param {string} [list=MyShows.EList.FAVORITES] - A list name, any of MyShows.EList enum.
   */
  async listsEpisodes<T>(
    list = EList.FAVORITES
  ): Promise<RpcResponse<T, { list: EList }>> {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "lists.Episodes",
        params: {
          list,
        },
      });

      const { result } = response.data;

      if (result) {
        return { list, result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Adds an episode to a list, returns true if adding was successful (requires authentication).
   * @param {int} id - Episode id.
   * @param {string} list - A list name (can be MyShows.EList.FAVORITES or MyShows.EList.IGNORED).
   */
  async listsAddEpisode<T>(
    id: number,
    list: EList.FAVORITES | EList.IGNORED
  ): Promise<
    RpcResponse<
      T,
      {
        list: EList.FAVORITES | EList.IGNORED;
        id: number;
      }
    >
  > {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "lists.AddEpisode",
        params: {
          id,
          list,
        },
      });

      const { result } = response.data;

      if (result) {
        return { id, list, result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Removes an episode from a list, returns true if removing was successful (requires authentication).
   * @param {int} id - Episode id.
   * @param {string} list - A list name (can be MyShows.EList.FAVORITES or MyShows.EList.IGNORED).
   */
  async listsRemoveEpisode<T>(
    id: number,
    list: EList.FAVORITES | EList.IGNORED
  ): Promise<
    RpcResponse<
      T,
      {
        list: EList.FAVORITES | EList.IGNORED;
        id: number;
      }
    >
  > {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "lists.RemoveEpisode",
        params: {
          id,
          list,
        },
      });

      const { result } = response.data;

      if (result) {
        return { id, list, result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Change show status (requires authentication).
   * @param {int} id - Show id.
   * @param {string} status - New status, any of MyShows.EShowStatus enum.
   */
  async manageSetShowStatus<T>(
    id: number,
    status: EShowStatus
  ): Promise<
    RpcResponse<
      T,
      {
        id: number;
        status: EShowStatus;
      }
    >
  > {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "manage.SetShowStatus",
        params: {
          id,
          status,
        },
      });

      const { result } = response.data;

      if (result) {
        return { id, status, result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Rate show (requires authentication).
   * @param {int} id - Show id.
   * @param {int} rating - Rating (from 0 to 5)
   */
  async manageRateShow<T, R = 1 | 2 | 3 | 4 | 5>(
    id: number,
    rating: R
  ): Promise<
    RpcResponse<
      T,
      {
        id: number;
        rating: R;
      }
    >
  > {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "manage.RateShow",
        params: {
          id,
          rating,
        },
      });

      const { result } = response.data;

      if (result) {
        return { id, rating, result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Check an episode as watched (requires authentication).
   * @param {int} id - Episode id.
   * @param {int} [rating] - Rating (from 0 to 5).
   */
  async manageCheckEpisode<T, R = 1 | 2 | 3 | 4 | 5>(
    id: number,
    rating: R
  ): Promise<
    RpcResponse<
      T,
      {
        id: number;
        rating: R;
      }
    >
  > {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "manage.CheckEpisode",
        params: {
          id,
          rating,
        },
      });

      const { result } = response.data;

      if (result) {
        return { id, rating, result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Uncheck an episode as watched (requires authentication).
   * @param {int} id - Episode id.
   */
  async manageUnCheckEpisode<T>(id: number): Promise<
    RpcResponse<
      T,
      {
        id: number;
      }
    >
  > {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "manage.UnCheckEpisode",
        params: {
          id,
        },
      });

      const { result } = response.data;

      if (result) {
        return { id, result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Rate an episode (requires authentication).
   * @param {int} id - Episode id.
   * @param {int} [rating] - Rating (from 0 to 5).
   */
  async manageRateEpisode<T, R = 1 | 2 | 3 | 4 | 5>(
    id: number,
    rating: R
  ): Promise<
    RpcResponse<
      T,
      {
        id: number;
        rating: R;
      }
    >
  > {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "manage.RateEpisode",
        params: {
          id,
          rating,
        },
      });

      const { result } = response.data;

      if (result) {
        return { id, rating, result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Bulk rate episodes (requires authentication).
   * @param id
   * @param {int[]} r1 - Episode ids with rating 1.
   * @param {int[]} r2 - Episode ids with rating 2.
   * @param {int[]} r3 - Episode ids with rating 3.
   * @param {int[]} r4 - Episode ids with rating 4.
   * @param {int[]} r5 - Episode ids with rating 5.
   */
  async manageRateEpisodesBulk<T, R = 1 | 2 | 3 | 4 | 5>(
    id: number,
    r1: R[],
    r2: R[],
    r3: R[],
    r4: R[],
    r5: R[]
  ): Promise<
    RpcResponse<
      T,
      {
        id: number;
      }
    >
  > {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "manage.RateEpisodesBulk",
        params: {
          id,
          r1,
          r2,
          r3,
          r4,
          r5,
        },
      });

      const { result } = response.data;

      if (result) {
        return { id, result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Sync episodes (requires authentication).
   * @param {int} id - Show id.
   * @param {int[]} episodeIds - Episode ids.
   */
  async manageSyncEpisodes<T>(
    id: number,
    episodeIds: number[]
  ): Promise<
    RpcResponse<
      T,
      {
        id: number;
      }
    >
  > {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "manage.SyncEpisodes",
        params: {
          showId: id,
          episodeIds,
        },
      });

      const { result } = response.data;

      if (result) {
        return { id, result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  async manageSyncEpisodesDelta<T>(
    id: number,
    checkedIds: number[],
    unCheckedIds: number[]
  ): Promise<
    RpcResponse<
      T,
      {
        id: number;
      }
    >
  > {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "manage.SyncEpisodesDelta",
        params: {
          showId: id,
          checkedIds,
          unCheckedIds,
        },
      });

      const { result } = response.data;

      if (result) {
        return { id, result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Returns user profile (requires authentication only if login param omited).
   * @param {string} [login] - User name. If omited method returns data for the current user.
   */
  async profileGet<T>(login: string): Promise<
    RpcResponse<
      T,
      {
        login: string;
      }
    >
  > {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "profile.Get",
        params: {
          login,
        },
      });

      const { result } = response.data;

      if (result) {
        return { login, result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Returns user public feed (requires authentication only if login param omited).
   * @param {string} [login] - User name. If omited method returns data for the current user.
   */
  async profileFeed<T>(login: string): Promise<
    RpcResponse<
      T,
      {
        login: string;
      }
    >
  > {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "profile.Feed",
        params: {
          login,
        },
      });

      const { result } = response.data;

      if (result) {
        return { login, result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Returns user's friend list (requires authentication only if login param omited).
   * @param {string} [login] - User name. If omited method returns data for the current user.
   */
  async profileFriends<T>(login: string): Promise<
    RpcResponse<
      T,
      {
        login: string;
      }
    >
  > {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "profile.Friends",
        params: {
          login,
        },
      });

      const { result } = response.data;

      if (result) {
        return { login, result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Returns user's followers (requires authentication only if login param omited).
   * @param {string} [login] - User name. If omited method returns data for the current user.
   */
  async profileFollowers<T>(login: string): Promise<
    RpcResponse<
      T,
      {
        login: string;
      }
    >
  > {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "profile.Followers",
        params: {
          login,
        },
      });

      const { result } = response.data;

      if (result) {
        return { login, result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Returns friends feed for the current user (requires authentication).
   */
  async profileFriendsFeed<T>(): Promise<RpcResponse<T>> {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "profile.FriendsFeed",
      });

      const { result } = response.data;

      if (result) {
        return { result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Returns user's shows (requires authentication only if login param omited).
   * @param {string} [login] - User name. If omited method returns data for the current user.
   */
  async profileShows<T>(login: string): Promise<
    RpcResponse<
      T,
      {
        login: string;
      }
    >
  > {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "profile.Shows",
        params: {
          login,
        },
      });

      const { result } = response.data;

      if (result) {
        return { login, result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Returns show episodes for the current user (requires authentication).
   * @param {int} showId - ID of the show.
   */
  async profileEpisodes<T>(showId: number): Promise<
    RpcResponse<
      T,
      {
        showId: number;
      }
    >
  > {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "profile.Episodes",
        params: {
          showId,
        },
      });

      const { result } = response.data;

      if (result) {
        return { showId, result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Returns list of achievements for the current user (requires authentication).
   */
  async profileAchievements() {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "profile.Achievements",
      });

      const { result } = response.data;

      if (result) {
        return { result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Returns list of achievements for the current user (requires authentication).
   */
  async profileNewComments() {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "profile.NewComments",
      });

      const { result } = response.data;

      if (result) {
        return { result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Returns a show by id (does not require authentication).
   * @param {int} id - Show id.
   * @param {boolean} [withEpisodes=true] - Include episodes in response.
   */
  async showsGetById(id: number, withEpisodes = true) {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "shows.GetById",
        params: {
          showId: id,
          withEpisodes,
        },
      });

      const { result } = response.data;

      if (result) {
        return { result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Returns a show by external id (does not require authentication).
   * @param {*} id - External show id.
   * @param {*} source - Source name, any of EShowSources enum.
   */
  async showsGetByExternalId(id: number, source: EShowSources) {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "shows.GetByExternalId",
        params: {
          id,
          source,
        },
      });

      const { result } = response.data;

      if (result) {
        return { result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Returns matched shows (does not require authentication).
   * @param {string} query - Query string.
   */
  async showsSearch(query: string) {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "shows.Search",
        params: {
          query,
        },
      });

      const { result } = response.data;

      if (result) {
        return { result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Returns matched shows (does not require authentication).
   * @param {string} file - Query string.
   */
  async showsSearchByFile(file: string) {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "shows.SearchByFile",
        params: {
          file,
        },
      });

      const { result } = response.data;

      if (result) {
        return { result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Returns shows ids (does not require authentication).
   * @param {int} fromId - Starting show id (excluding).
   * @param {int} [count=100] - Number of ids (max 1000).
   */
  async showsIds(fromId: number, count: number) {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "shows.Ids",
        params: {
          fromId,
          count,
        },
      });

      const { result } = response.data;

      if (result) {
        return { result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Returns an episode by id (does not require authentication).
   * @param {int} id - Episode id.
   */
  async showsEpisode(id: number) {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "shows.Episode",
        params: {
          id,
        },
      });

      const { result } = response.data;

      if (result) {
        return { result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Returns a list of genres (does not require authentication).
   */
  async showsGenres() {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "shows.Genres",
      });

      const { result } = response.data;

      if (result) {
        return { result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Returns top voted shows (does not require authentication).
   * @param {int} [mode=MyShows.EGenderVote.ALL] - Gender of votes, any of MyShows.EGenderVote enum.
   * @param {int} [count=500] - Number of shows (max 500).
   */
  async showsTop<T>(
    mode = EGenderVote.ALL,
    count = 500
  ): Promise<RpcResponse<T>> {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "shows.Top",
        params: {
          mode,
          count,
        },
      });

      const { result } = response.data;

      if (result) {
        return { result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Marks comments as viewed for an episode (requires authentication).
   * @param {int} id - Episode id.
   */
  async showsViewEpisodeComments(id: number) {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "shows.ViewEpisodeComments",
        params: {
          episodeId: id,
        },
      });

      const { result } = response.data;

      if (result) {
        return { result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Change tracking status for new comments for an episode (requires authentication).
   * @param {int} id - Episode id.
   * @param {boolean} isTracked - Should we track new comments for this episode or not.
   */
  async showsTrackEpisodeComments(id: number, isTracked: boolean) {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "shows.TrackEpisodeComments",
        params: {
          episodeId: id,
          isTracked,
        },
      });

      const { result } = response.data;

      if (result) {
        return { result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Vote for a comment (requires authentication).
   * @param {int} id - Comment id.
   * @param {boolean} isPositive - true/false for positive/negative vote.
   */
  async showsVoteEpisodeComment(id: number, isPositive: boolean) {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "shows.VoteEpisodeComment",
        params: {
          commentId: id,
          isPositive,
        },
      });

      const { result } = response.data;

      if (result) {
        return { result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Post comment (requires authentication).
   * @param {int} id - Episode id.
   * @param {string} text - Comment body (between 5 and 2000 (4000 for pro users) characters).
   * @param {int} [parentId] - Parent comment id.
   */
  async showsPostEpisodeComment(id: number, text: string, parentId: number) {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "shows.PostEpisodeComment",
        params: {
          commentId: id,
          text,
          parentCommentId: parentId,
        },
      });

      const { result } = response.data;

      if (result) {
        return { result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Translate comment (requires authentication).
   * @param {int} id - Comment id.
   * @param {boolean} [language=user's default language] - Target language.
   */
  async showsTranslateEpisodeComment(id: number, language: string) {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "shows.TranslateEpisodeComment",
        params: {
          commentId: id,
          language,
        },
      });

      const { result } = response.data;

      if (result) {
        return { result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Returns a list of matched users (does not require authentication).
   * @param {object} [search] - search object.
   * @param {string} [search.query] - query string.
   * @param {number} [search.wasted] - wasted time interval, any of ESpentTime enum.
   * @param {number} [search.year] - year of registration.
   * @param {string} [search.gender] - gender, any of EGender enum.
   * @param {int} [page=0] - page number.
   * @param {int} [pageSize=100] - total number of users to return (max 100).
   */
  async usersSearch(
    search: SearchObjectOptions = {},
    page = 0,
    pageSize = 100
  ) {
    try {
      const picked = GetSearchObjectProps(search);

      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "users.Search",
        params: {
          search: picked,
          page,
          pageSize,
        },
      });

      const { result } = response.data;

      if (result) {
        return { search: picked, page, pageSize, result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Returns a total number of matched users. If search param is not set returns
   * total number of website's users (does not require authentication).
   * @param {object} [search] - search object.
   * @param {string} [search.query] - query string.
   * @param {number} [search.wasted] - wasted time interval, any of ESpentTime enum.
   * @param {number} [search.year] - year of registration.
   * @param {string} [search.gender] - gender, any of EGender enum.
   */
  async usersCount(search = {}) {
    try {
      const picked = GetSearchObjectProps(search);

      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "users.Count",
        params: {
          search: picked,
        },
      });

      const { result } = response.data;

      if (result) {
        return { search: picked, result };
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }

  /**
   * Returns a total number of matched users by gender,
   * year of registration and spent time. If query param is not set
   * returns total number of website's users (does not require authentication).
   * @param {string} [query] - query string.
   */
  async usersFiltersCounters<T>(query: string) {
    try {
      const response = await this.axios.post("", {
        ...this.defaultParams,
        method: "users.FiltersCounters",
        params: {
          search: {
            query,
          },
        },
      });

      const { result } = response.data;

      if (result) {
        return { query, result } as RpcResponse<
          T,
          {
            query: string;
          }
        >;
      } else {
        return { error: response.data.error };
      }
    } catch (error) {
      return { error };
    }
  }
}
