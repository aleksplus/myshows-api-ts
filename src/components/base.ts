import {
  EGenderVote,
  EList,
  EMovieStatus,
  EShowSources,
  EShowStatus,
} from '../enums';
import {
  Feed,
  ShowRank,
  ShowRecommendation,
  MovieModel,
  MovieSearch,
  ProfileGetResponse,
  ShowsModel,
  EpisodeDetail,
  NotesSaveResponse
} from '../types/models';
import {
  EpisodeId,
  EpisodeList,
  EpisodeListWithId,
  IMyShows,
  SearchObjectOptions,
  ShowSearchParams,
  WithCountParam,
  WithId,
  WithLoginParam,
  WithMovieStatusParam,
  WithQueryParam,
  WithRatingParam,
  WithSearchParam,
  WithShowId,
  WithStatusParam,
} from '../types/request';
import { RpcResponse } from '../types/rpcUtils';
import { getSearchObjectProps } from '../utils';
import { MyShowsCore } from './core';

export class MyShows extends MyShowsCore implements IMyShows {
  /**
   * Returns a list of shows (requires authentication).
   * @param {string} [list=MyShows.EList.FAVORITES] - A list name.
   */
  async listsShows<T>(
    list = EList.FAVORITES,
  ): Promise<RpcResponse<T, EpisodeList>> {
    return await this.query<T, EpisodeList>({
      method: 'lists.Shows',
      params: {
        list,
      },
    });
  }

  /**
   * Adds a show to favorites list, returns true
   * if adding was successful (requires authentication).
   * @param {int} id - Show id
   */
  async listsAddShow<T>(id: number): Promise<RpcResponse<T, { id: number }>> {
    return await this.query<T, EpisodeListWithId>({
      method: 'lists.AddShow',
      params: {
        id,
        list: EList.FAVORITES,
      },
    });
  }

  /**
   * Removes a show from favorites list, returns true
   * if removing was successful (requires authentication).
   * @param {int} id - Episode id.
   */
  async listsRemoveShow<T>(id: number): Promise<RpcResponse<T, EpisodeId>> {
    return await this.query<T, EpisodeListWithId>({
      method: 'lists.RemoveShow',
      params: {
        id,
        list: EList.FAVORITES,
      },
    });
  }

  /**
   * Returns a list of episodes (requires authentication).
   * @param {string} [list=MyShows.EList.FAVORITES] - A list name, any of MyShows.EList enum.
   */
  async listsEpisodes<T>(
    list = EList.FAVORITES,
  ): Promise<RpcResponse<T, EpisodeList>> {
    return await this.query<T, EpisodeList>({
      method: 'lists.Episodes',
      params: {
        list,
      },
    });
  }

  /**
   * Adds an episode to a list, returns true if adding was successful (requires authentication).
   * @param {int} id - Episode id.
   * @param {string} list - A list name (can be MyShows.EList.FAVORITES or MyShows.EList.IGNORED).
   */
  async listsAddEpisode<T>(
    id: number,
    list: EList.FAVORITES | EList.IGNORED,
  ): Promise<RpcResponse<T, EpisodeListWithId>> {
    return await this.query<T, EpisodeListWithId>({
      method: 'lists.AddEpisode',
      params: {
        id,
        list,
      },
    });
  }

  /**
   * Removes an episode from a list, returns true if removing was successful (requires authentication).
   * @param {int} id - Episode id.
   * @param {string} list - A list name (can be MyShows.EList.FAVORITES or MyShows.EList.IGNORED).
   */
  async listsRemoveEpisode<T>(
    id: number,
    list: EList.FAVORITES | EList.IGNORED,
  ): Promise<RpcResponse<T, EpisodeListWithId>> {
    return await this.query<T, EpisodeListWithId>({
      method: 'lists.RemoveEpisode',
      params: {
        id,
        list,
      },
    });
  }

  /**
   * Change show status (requires authentication).
   * @param {int} id - Show id.
   * @param {string} status - New status, any of MyShows.EShowStatus enum.
   */
  async manageSetShowStatus<T>(id: number, status: EShowStatus) {
    return await this.query<T, WithStatusParam<EShowStatus>>({
      method: 'manage.SetShowStatus',
      params: {
        id,
        status,
      },
    });
  }

  /**
   * @description Change movie status (requires authentication).
   * @version: 3
   * @param {int} id - Movie id.
   * @param {string} status - New status, any of MyShows.EMovieStatus enum.
   */
  async manageSetMovieStatus<T>(id: number, status: EMovieStatus) {
    return await this.queryV3<T, WithMovieStatusParam<EMovieStatus>>({
      method: 'manage.SetMovieStatus',
      params: {
        movieId: id,
        status,
      },
    });
  }

  /**
   * Rate show (requires authentication).
   * @param {int} id - Show id.
   * @param {int} rating - Rating (from 0 to 5)
   */
  async manageRateShow<T, R = 1 | 2 | 3 | 4 | 5>(
    id: number,
    rating: R,
  ): Promise<RpcResponse<T, WithRatingParam<R> & WithId>> {
    return await this.query<T, WithRatingParam<R> & WithId>({
      method: 'manage.RateShow',
      params: {
        id,
        rating,
      },
    });
  }

  /**
   * Check an episode as watched (requires authentication).
   * @param {int} id - Episode id.
   * @param {int} [rating] - Rating (from 0 to 5).
   */
  async manageCheckEpisode<T, R = 1 | 2 | 3 | 4 | 5>(
    id: number,
    rating?: R,
  ): Promise<RpcResponse<T, WithRatingParam<R> & WithId>> {
    return await this.query<T, WithRatingParam<R> & WithId>({
      method: 'manage.CheckEpisode',
      params: {
        id,
        rating,
      },
    });
  }

  /**
   * Uncheck an episode as watched (requires authentication).
   * @param {int} id - Episode id.
   */
  async manageUnCheckEpisode<T>(
    id: number,
  ): Promise<RpcResponse<T, EpisodeId>> {
    return await this.query<T, EpisodeId>({
      method: 'manage.UnCheckEpisode',
      params: {
        id,
      },
    });
  }

  /**
   * Rate an episode (requires authentication).
   * @param {int} id - Episode id.
   * @param {int} [rating] - Rating (from 0 to 5).
   */
  async manageRateEpisode<T, R = 1 | 2 | 3 | 4 | 5>(
    id: number,
    rating: R,
  ): Promise<RpcResponse<T, WithRatingParam<R> & WithId>> {
    return await this.query<T, WithRatingParam<R> & WithId>({
      method: 'manage.RateEpisode',
      params: {
        id,
        rating,
      },
    });
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
    r5: R[],
  ): Promise<RpcResponse<T, EpisodeId & Record<`r${number}`, R[]>>> {
    return await this.query<T, EpisodeId & Record<`r${number}`, R[]>>({
      method: 'manage.RateEpisodesBulk',
      params: {
        id,
        r1,
        r2,
        r3,
        r4,
        r5,
      },
    });
  }

  /**
   * Sync episodes (requires authentication).
   * @param {int} id - Show id.
   * @param {int[]} episodeIds - Episode ids.
   */
  async manageSyncEpisodes<T>(
    id: number,
    episodeIds: number[],
  ): Promise<
    RpcResponse<
      T,
      {
        showId: number;
        episodeIds: number[];
      }
    >
  > {
    return await this.query<
      T,
      {
        showId: number;
        episodeIds: number[];
      }
    >({
      method: 'manage.SyncEpisodes',
      params: {
        showId: id,
        episodeIds,
      },
    });
  }

  async manageSyncEpisodesDelta<T>(
    id: number,
    checkedIds: number[],
    unCheckedIds: number[],
  ): Promise<
    RpcResponse<
      T,
      {
        showId: number;
        checkedIds: number[];
        unCheckedIds: number[];
      }
    >
  > {
    return await this.query<
      T,
      {
        showId: number;
        checkedIds: number[];
        unCheckedIds: number[];
      }
    >({
      method: 'manage.SyncEpisodesDelta',
      params: {
        showId: id,
        checkedIds,
        unCheckedIds,
      },
    });
  }

  /**
   * Move episode air date (requires authentication).
   * @param {int} episodeId - Episode id.
   * @param {int} shiftDays - Days to shift (positive or negative).
   */
  async manageMoveEpisodeDate<T>(
    episodeId: number,
    shiftDays: number,
  ): Promise<RpcResponse<T, { episodeId: number; shiftDays: number }>> {
    return await this.query<T, { episodeId: number; shiftDays: number }>({
      method: 'manage.MoveEpisodeDate',
      params: {
        episodeId,
        shiftDays,
      },
    });
  }

  /**
   * Mark as watched several times (requires authentication).
   * @param {int} id - Episode id.
   * @param {int} count
   */
  async manageReWatchShow<T>(
    id: number,
    count: number,
  ): Promise<RpcResponse<T, WithCountParam>> {
    return await this.query<T, WithCountParam>({
      method: 'manage.ReWatchShow',
      params: {
        id,
        count,
      },
    });
  }

  /**
   * Returns user profile (requires authentication only if login param omited).
   * @param {string} [login] - Username. If omited method returns data for the current user.
   */
  async profileGet<T = ProfileGetResponse>(login: string): Promise<RpcResponse<T, WithLoginParam>> {
    return await this.query<T, WithLoginParam>({
      method: 'profile.Get',
      params: {
        login,
      },
    });
  }

  /**
   * Returns user public feed (requires authentication only if login param omited).
   * @param {string} [login] - Username. If omited method returns data for the current user.
   */
  async profileFeed<T = Feed[]>(login: string): Promise<RpcResponse<T, WithLoginParam>> {
    return await this.query<T, WithLoginParam>({
      method: 'profile.Feed',
      params: {
        login,
      },
    });
  }

  /**
   * Returns user's friend list (requires authentication only if login param omited).
   * @param {string} [login] - Username. If omited method returns data for the current user.
   */
  async profileFriends<T>(
    login: string,
  ): Promise<RpcResponse<T, WithLoginParam>> {
    return await this.query<T, WithLoginParam>({
      method: 'profile.Friends',
      params: {
        login,
      },
    });
  }

  /**
   * Returns user's followers (requires authentication only if login param omited).
   * @param {string} [login] - Username. If omited method returns data for the current user.
   */
  async profileFollowers<T>(
    login: string,
  ): Promise<RpcResponse<T, WithLoginParam>> {
    return await this.query<T, WithLoginParam>({
      method: 'profile.Followers',
      params: {
        login,
      },
    });
  }

  /**
   * Returns friends feed for the current user (requires authentication).
   */
  async profileFriendsFeed<T>(): Promise<RpcResponse<T>> {
    return await this.query<T, {}>({
      method: 'profile.FriendsFeed',
      params: {},
    });
  }

  /**
   * Returns user's shows (requires authentication only if login param omited).
   * @param {string} [login] - Username. If omited method returns data for the current user.
   */
  async profileShows<T>(
    login: string,
  ): Promise<RpcResponse<T[], WithLoginParam>> {
    return await this.query<T[], WithLoginParam>({
      method: 'profile.Shows',
      params: {
        login,
      },
    });
  }

  /**
   * Returns show episodes for the current user (requires authentication).
   * @param {int} showId - ID of the show.
   */
  async profileEpisodes<T>(
    showId: number,
  ): Promise<RpcResponse<T, WithShowId>> {
    return await this.query<T, WithShowId>({
      method: 'profile.Episodes',
      params: {
        showId,
      },
    });
  }

  /**
   * Returns list of achievements for the current user (requires authentication).
   */
  async profileAchievements<T>(): Promise<RpcResponse<T>> {
    return await this.query<T, {}>({
      method: 'profile.Achievements',
      params: {},
    });
  }

  /**
   * Returns list of achievements for the current user (requires authentication).
   */
  async profileNewComments<T>(): Promise<RpcResponse<T>> {
    return await this.query<T, {}>({
      method: 'profile.NewComments',
      params: {},
    });
  }

  /**
   * Returns friendship status between current user and specified user (requires authentication).
   * @param {string} login - Username.
   */
  async profileFriendship<T>(login: string): Promise<RpcResponse<T, WithLoginParam>> {
    return await this.query<T, WithLoginParam>({
      method: 'profile.Friendship',
      params: {
        login,
      },
    });
  }

  /**
   * Returns show statuses for specified shows (requires authentication).
   * @param {number[]} [showIds] - Array of show IDs. If omitted, returns all user's shows statuses.
   */
  async profileShowStatuses<T>(
    showIds?: number[],
  ): Promise<RpcResponse<T, { showIds?: number[] }>> {
    return await this.query<T, { showIds?: number[] }>({
      method: 'profile.ShowStatuses',
      params: {
        showIds,
      },
    });
  }

  /**
   * Returns user's show by show ID (requires authentication).
   * @param {int} showId - Show ID.
   */
  async profileShow<T>(showId: number): Promise<RpcResponse<T, WithShowId>> {
    return await this.query<T, WithShowId>({
      method: 'profile.Show',
      params: {
        showId,
      },
    });
  }

  /**
   * Returns user's episode by episode ID (requires authentication).
   * @param {int} episodeId - Episode ID.
   */
  async profileEpisode<T>(
    episodeId: number,
  ): Promise<RpcResponse<T, { episodeId: number }>> {
    return await this.query<T, { episodeId: number }>({
      method: 'profile.Episode',
      params: {
        episodeId,
      },
    });
  }

  /**
   * Returns achievement details (requires authentication).
   * @param {string} alias - Achievement alias.
   * @param {string} key - Achievement key.
   */
  async profileAchievement<T>(
    alias: string,
    key: string,
  ): Promise<RpcResponse<T, { alias: string; key: string }>> {
    return await this.query<T, { alias: string; key: string }>({
      method: 'profile.Achievement',
      params: {
        alias,
        key,
      },
    });
  }

  /**
   * Returns new news comments count for the current user (requires authentication).
   */
  async profileNewNewsComments<T>(): Promise<RpcResponse<T>> {
    return await this.query<T, {}>({
      method: 'profile.NewNewsComments',
      params: {},
    });
  }

  /**
   * Returns new comment replies count for the current user (requires authentication).
   */
  async profileNewCommentReplies<T>(): Promise<RpcResponse<T>> {
    return await this.query<T, {}>({
      method: 'profile.NewCommentReplies',
      params: {},
    });
  }

  /**
   * Returns new news comment replies count for the current user (requires authentication).
   */
  async profileNewNewsCommentReplies<T>(): Promise<RpcResponse<T>> {
    return await this.query<T, {}>({
      method: 'profile.NewNewsCommentReplies',
      params: {},
    });
  }

  /**
   * Returns various counters for the current user (requires authentication).
   */
  async profileCounters<T>(): Promise<RpcResponse<T>> {
    return await this.query<T, {}>({
      method: 'profile.Counters',
      params: {},
    });
  }

  /**
   * Returns user settings (requires authentication).
   */
  async profileSettings<T>(): Promise<RpcResponse<T>> {
    return await this.query<T, {}>({
      method: 'profile.Settings',
      params: {},
    });
  }

  /**
   * Save user settings (requires authentication).
   * @param {Array} settings - Array of settings objects with alias and value.
   */
  async profileSaveSettings<T>(
    settings: Array<{ alias: string; value: string }>,
  ): Promise<RpcResponse<T, { settings: Array<{ alias: string; value: string }> }>> {
    return await this.query<T, { settings: Array<{ alias: string; value: string }> }>({
      method: 'profile.SaveSettings',
      params: {
        settings,
      },
    });
  }

  /**
   * Returns episode comments count for user by login (requires authentication only if login param omitted).
   * @param {string} [login] - Username. If omitted returns data for the current user.
   */
  async profileEpisodeCommentsCount<T>(login?: undefined): Promise<RpcResponse<T, {}>>;
  async profileEpisodeCommentsCount<T>(login: string): Promise<RpcResponse<T, WithLoginParam>>;
  async profileEpisodeCommentsCount<T>(
    login?: string,
  ): Promise<RpcResponse<T, {}> | RpcResponse<T, WithLoginParam>> {
    if (login) {
      return await this.query<T, WithLoginParam>({
        method: 'profile.EpisodeCommentsCount',
        params: { login },
      });
    } else {
      return await this.query<T, {}>({
        method: 'profile.EpisodeCommentsCount',
        params: {},
      });
    }
  }

  /**
   * Returns user's episode comments (requires authentication only if login param omitted).
   * @param {string} [login] - Username. If omitted returns data for the current user.
   * @param {int} [page=0] - Page number.
   * @param {int} [pageSize=100] - Number of comments per page (max 100).
   * @param {string} [sort='date'] - Sort order.
   */
  async profileEpisodeComments<T>(
    login: string,
    page = 0,
    pageSize = 100,
    sort = 'date',
  ): Promise<RpcResponse<T, WithLoginParam & { page: number; pageSize: number; sort: string }>> {
    return await this.query<T, WithLoginParam & { page: number; pageSize: number; sort: string }>({
      method: 'profile.EpisodeComments',
      params: {
        login,
        page,
        pageSize,
        sort,
      },
    });
  }

  /**
   * Returns news comments count for user by login (requires authentication only if login param omitted).
   * @param {string} [login] - Username. If omitted returns data for the current user.
   */
  async profileNewsCommentsCount<T>(login?: undefined): Promise<RpcResponse<T, {}>>;
  async profileNewsCommentsCount<T>(login: string): Promise<RpcResponse<T, WithLoginParam>>;
  async profileNewsCommentsCount<T>(
    login?: string,
  ): Promise<RpcResponse<T, {}> | RpcResponse<T, WithLoginParam>> {
    if (login) {
      return await this.query<T, WithLoginParam>({
        method: 'profile.NewsCommentsCount',
        params: { login },
      });
    } else {
      return await this.query<T, {}>({
        method: 'profile.NewsCommentsCount',
        params: {},
      });
    }
  }

  /**
   * Returns user's news comments (requires authentication only if login param omitted).
   * @param {string} [login] - Username. If omitted returns data for the current user.
   * @param {int} [page=0] - Page number.
   * @param {int} [pageSize=100] - Number of comments per page (max 100).
   * @param {string} [sort='date'] - Sort order.
   */
  async profileNewsComments<T>(
    login: string,
    page = 0,
    pageSize = 100,
    sort = 'date',
  ): Promise<RpcResponse<T, WithLoginParam & { page: number; pageSize: number; sort: string }>> {
    return await this.query<T, WithLoginParam & { page: number; pageSize: number; sort: string }>({
      method: 'profile.NewsComments',
      params: {
        login,
        page,
        pageSize,
        sort,
      },
    });
  }

  /**
   * Marks all user comments as viewed (requires authentication).
   */
  async profileMarkCommentsAsViewed<T>(): Promise<RpcResponse<T>> {
    return await this.query<T, {}>({
      method: 'profile.MarkCommentsAsViewed',
      params: {},
    });
  }

  /**
   * Returns shows based on search criteria (does not require authentication).
   * @param {object} search - Search criteria object.
   * @param {int} [page=0] - Page number.
   * @param {int} [pageSize=100] - Number of shows per page (max 100).
   */
  async showsGet<T extends ShowsModel>(
    search: Partial<ShowSearchParams>,
    page = 0,
    pageSize = 100,
  ): Promise<RpcResponse<T, { search: Partial<ShowSearchParams>; page: number; pageSize: number }>> {
    return await this.query<T, { search: Partial<ShowSearchParams>; page: number; pageSize: number }>({
      method: 'shows.Get',
      params: {
        search,
        page,
        pageSize,
      },
    });
  }

  /**
   * Returns total count of shows matching search criteria (does not require authentication).
   * @param {object} search - Search criteria object.
   */
  async showsCount<T>(
    search: Partial<ShowSearchParams>,
  ): Promise<RpcResponse<T, { search: Partial<ShowSearchParams> }>> {
    return await this.query<T, { search: Partial<ShowSearchParams> }>({
      method: 'shows.Count',
      params: {
        search,
      },
    });
  }

  /**
   * Returns available filters for shows search (does not require authentication).
   * @param {object} search - Search criteria object.
   */
  async showsFilters<T>(
    search: Partial<ShowSearchParams>,
  ): Promise<RpcResponse<T, { search: Partial<ShowSearchParams> }>> {
    return await this.query<T, { search: Partial<ShowSearchParams> }>({
      method: 'shows.Filters',
      params: {
        search,
      },
    });
  }

  /**
   * Returns a show by id (does not require authentication).
   * @param {int} id - Show id.
   * @param {boolean} [withEpisodes=true] - Include episodes in response.
   */
  async showsGetById<T>(
    id: number,
    withEpisodes = true,
  ): Promise<
    RpcResponse<
      T,
      {
        showId: number;
        withEpisodes: boolean;
      }
    >
  > {
    return await this.query<
      T,
      {
        showId: number;
        withEpisodes: boolean;
      }
    >({
      method: 'shows.GetById',
      params: {
        showId: id,
        withEpisodes,
      },
    });
  }

  /**
   * Returns a show by external id (does not require authentication).
   * @param {*} id - External show id.
   * @param {*} source - Source name, any of EShowSources enum.
   */
  async showsGetByExternalId<T>(
    id: number,
    source: EShowSources,
  ): Promise<
    RpcResponse<
      T,
      {
        id: number;
        source: EShowSources;
      }
    >
  > {
    return await this.query<
      T,
      {
        id: number;
        source: EShowSources;
      }
    >({
      method: 'shows.GetByExternalId',
      params: {
        id,
        source,
      },
    });
  }

  /**
   * Returns matched shows (does not require authentication).
   * @param {string} query - Query string.
   */
  async showsSearch<T extends ShowsModel>(
    query: string,
  ): Promise<RpcResponse<T, WithQueryParam>> {
    return await this.query<T, WithQueryParam>({
      method: 'shows.Search',
      params: {
        query,
      },
    });
  }

  /**
   * Returns matched shows (does not require authentication).
   * @param {string} file - Query string.
   */
  async showsSearchByFile<T>(
    file: string,
  ): Promise<RpcResponse<T, { file: string }>> {
    return await this.query<T, { file: string }>({
      method: 'shows.SearchByFile',
      params: {
        file,
      },
    });
  }

  /**
   * Returns shows ids (does not require authentication).
   * @param {int} fromId - Starting show id (excluding).
   * @param {int} [count=100] - Number of ids (max 1000).
   */
  async showsIds<T>(
    fromId: number,
    count: number,
  ): Promise<RpcResponse<T, { fromId: number; count: number }>> {
    return await this.query<T, { fromId: number; count: number }>({
      method: 'shows.Ids',
      params: {
        fromId,
        count,
      },
    });
  }

  /**
   * Returns an episode by id (does not require authentication).
   * @param {int} id - Episode id.
   */
  async showsEpisode<T = EpisodeDetail>(id: number): Promise<RpcResponse<T, { id: number }>> {
    return await this.query<T, { id: number }>({
      method: 'shows.Episode',
      params: {
        id,
      },
    });
  }

  /**
   * Returns a list of genres (does not require authentication).
   */
  async showsGenres<T>(): Promise<RpcResponse<T>> {
    return await this.query<T, {}>({
      method: 'shows.Genres',
      params: {},
    });
  }

  /**
   * Returns top voted shows (does not require authentication).
   * @param {int} [mode=MyShows.EGenderVote.ALL] - Gender of votes, any of MyShows.EGenderVote enum.
   * @param {int} [count=500] - Number of shows (max 500).
   */
  async showsTop<T = ShowRank[]>(
    mode = EGenderVote.ALL,
    count = 500,
  ): Promise<RpcResponse<T, { mode: EGenderVote; count: number }>> {
    return await this.query<T, { mode: EGenderVote; count: number }>({
      method: 'shows.Top',
      params: {
        mode,
        count,
      },
    });
  }

  /**
   * Marks comments as viewed for an episode (requires authentication).
   * @param {int} id - Episode id.
   */
  async showsViewEpisodeComments<T = boolean>(id: number): Promise<RpcResponse<T, { episodeId: number }>> {
    return await this.query<T, { episodeId: number }>({
      method: 'shows.ViewEpisodeComments',
      params: {
        episodeId: id,
      },
    });
  }

  /**
   * Change tracking status for new comments for an episode (requires authentication).
   * @param {int} id - Episode id.
   * @param {boolean} isTracked - Should we track new comments for this episode or not.
   */
  async showsTrackEpisodeComments<T = boolean>(
    id: number,
    isTracked: boolean,
  ): Promise<RpcResponse<T, { episodeId: number; isTracked: boolean }>> {
    return await this.query<T, { episodeId: number; isTracked: boolean }>({
      method: 'shows.TrackEpisodeComments',
      params: {
        episodeId: id,
        isTracked,
      },
    });
  }

  /**
   * Vote for a comment (requires authentication).
   * @param {int} id - Comment id.
   * @param {boolean} isPositive - true/false for positive/negative vote.
   */
  async showsVoteEpisodeComment<T = number>(
    id: number,
    isPositive: boolean,
  ): Promise<RpcResponse<T, { commentId: number; isPositive: boolean }>> {
    return await this.query<T, { commentId: number; isPositive: boolean }>({
      method: 'shows.VoteEpisodeComment',
      params: {
        commentId: id,
        isPositive,
      },
    });
  }

  /**
   * Returns episode comments (does not require authentication).
   * @param {int} id - Episode id.
   */
  async showsEpisodeComments<T>(id: number): Promise<RpcResponse<T, { episodeId: number }>> {
    return await this.query<T, { episodeId: number }>({
      method: 'shows.EpisodeComments',
      params: {
        episodeId: id,
      },
    });
  }

  /**
   * Post comment (requires authentication).
   * @param {int} id - Episode id.
   * @param {string} text - Comment body (between 5 and 2000 (4000 for pro users) characters).
   * @param {string} [image] - Base64 encoded image.
   * @param {int} [parentId] - Parent comment id.
   */
  async showsPostEpisodeComment<T>(
    id: number,
    text: string,
    image: undefined,
    parentId?: number,
  ): Promise<RpcResponse<T, { episodeId: number; text: string; parentCommentId?: number }>>;
  async showsPostEpisodeComment<T>(
    id: number,
    text: string,
    image: string,
    parentId?: number,
  ): Promise<RpcResponse<T, { episodeId: number; text: string; image: string; parentCommentId?: number }>>;
  async showsPostEpisodeComment<T>(
    id: number,
    text: string,
    parentId: number,
  ): Promise<RpcResponse<T, { episodeId: number; text: string; parentCommentId: number }>>;
  async showsPostEpisodeComment<T>(
    id: number,
    text: string,
    imageOrParent?: string | number,
    parentId?: number,
  ): Promise<RpcResponse<T>> {
    const params: any = {
      episodeId: id,
      text,
    };

    if (typeof imageOrParent === 'string') {
      params.image = imageOrParent;
      if (typeof parentId === 'number') {
        params.parentCommentId = parentId;
      }
    } else if (typeof imageOrParent === 'number') {
      params.parentCommentId = imageOrParent;
    }

    return await this.query<T, any>({
      method: 'shows.PostEpisodeComment',
      params,
    });
  }

  /**
   * Update episode comment (requires authentication).
   * @param {int} id - Comment id.
   * @param {string} text - Comment body (between 5 and 2000 (4000 for pro users) characters).
   * @param {string} [image] - Base64 encoded image.
   * @param {boolean} [deleteImage=false] - Whether to delete existing image.
   */
  async showsUpdateEpisodeComment<T>(
    id: number,
    text: string,
    image?: string,
    deleteImage = false,
  ): Promise<RpcResponse<T, { commentId: number; text: string; image?: string; deleteImage: boolean }>> {
    return await this.query<T, { commentId: number; text: string; image?: string; deleteImage: boolean }>({
      method: 'shows.UpdateEpisodeComment',
      params: {
        commentId: id,
        text,
        image,
        deleteImage,
      },
    });
  }

  /**
   * Delete episode comment (requires authentication).
   * @param {int} id - Comment id.
   */
  async showsDeleteEpisodeComment<T>(
    id: number,
  ): Promise<RpcResponse<T, { commentId: number }>> {
    return await this.query<T, { commentId: number }>({
      method: 'shows.DeleteEpisodeComment',
      params: {
        commentId: id,
      },
    });
  }

  /**
   * Returns matched movies (does not require authentication).
   * @param {string} query - Query string.
   */
  async moviesSearch(query: string) {
    return await this.queryV3<MovieSearch[], WithSearchParam<WithQueryParam>>({
      method: 'movies.GetCatalog',
      params: {
        search: { query },
      },
    });
  }

  /**
   * Returns a movie by id
   * @param {int} id - Show id.
   */
  async moviesGetById<T>(id: number) {
    return await this.query<
      MovieModel,
      {
        movieId: number;
      }
    >({
      method: 'movies.GetById',
      params: {
        movieId: id,
      },
    });
  }

  /**
   * Translate comment (requires authentication).
   * @param {int} id - Comment id.
   * @param {boolean} [language=user's default language] - Target language.
   */
  async showsTranslateEpisodeComment<T = string>(
    id: number,
    language: string,
  ): Promise<RpcResponse<T, { commentId: number; language: string }>> {
    return await this.query<T, { commentId: number; language: string }>({
      method: 'shows.TranslateEpisodeComment',
      params: {
        commentId: id,
        language,
      },
    });
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
  async usersSearch<T>(
    search: SearchObjectOptions = {},
    page = 0,
    pageSize = 100,
  ): Promise<RpcResponse<T, WithSearchParam<SearchObjectOptions>>> {
    const picked = getSearchObjectProps(search);

    return await this.query<T, WithSearchParam<SearchObjectOptions>>({
      method: 'users.Search',
      params: {
        search: picked,
        page,
        pageSize,
      },
    });
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
  async usersCount<T>(
    search: SearchObjectOptions = {},
  ): Promise<RpcResponse<T, WithSearchParam<SearchObjectOptions>>> {
    const picked = getSearchObjectProps(search);

    return await this.query<T, WithSearchParam<SearchObjectOptions>>({
      method: 'users.Count',
      params: {
        search: picked,
      },
    });
  }

  /**
   * Returns a total number of matched users by gender,
   * year of registration and spent time. If query param is not set
   * returns total number of website's users (does not require authentication).
   * @param {string} [query] - query string.
   */
  async usersFiltersCounters<T>(
    query: string,
  ): Promise<RpcResponse<T, WithSearchParam<WithQueryParam>>> {
    return await this.query<T, WithSearchParam<WithQueryParam>>({
      method: 'users.FiltersCounters',
      params: {
        search: {
          query,
        },
      },
    });
  }

  /**
   * Follow a user (requires authentication).
   * @param {string} login - Username to follow.
   */
  async usersFollow<T>(login: string): Promise<RpcResponse<T, WithLoginParam>> {
    return await this.query<T, WithLoginParam>({
      method: 'users.Follow',
      params: {
        login,
      },
    });
  }

  /**
   * Unfollow a user (requires authentication).
   * @param {string} login - Username to unfollow.
   */
  async usersUnFollow<T>(login: string): Promise<RpcResponse<T, WithLoginParam>> {
    return await this.query<T, WithLoginParam>({
      method: 'users.UnFollow',
      params: {
        login,
      },
    });
  }

  /**
   * Returns available filters for users search (does not require authentication).
   * @param {object} [search] - search object.
   */
  async usersFilters<T>(
    search: SearchObjectOptions = {},
  ): Promise<RpcResponse<T, WithSearchParam<SearchObjectOptions>>> {
    const picked = getSearchObjectProps(search);

    return await this.query<T, WithSearchParam<SearchObjectOptions>>({
      method: 'users.Filters',
      params: {
        search: picked,
      },
    });
  }

  // News methods
  /**
   * Returns news based on search criteria (does not require authentication).
   * @param {object} search - Search criteria object.
   * @param {int} [page=0] - Page number.
   * @param {int} [pageSize=100] - Number of news per page (max 100).
   */
  async newsGet<T>(
    search: Partial<{
      showId: number;
      episodeId: number;
      category: string;
      tag: string;
      isTrailer: boolean;
      similarNewsId: number;
      forCurrentUser: boolean;
    }>,
    page = 0,
    pageSize = 100,
  ): Promise<RpcResponse<T, { search: Partial<typeof search>; page: number; pageSize: number }>> {
    return await this.query<T, { search: Partial<typeof search>; page: number; pageSize: number }>({
      method: 'news.Get',
      params: {
        search,
        page,
        pageSize,
      },
    });
  }

  /**
   * Returns total count of news matching search criteria (does not require authentication).
   * @param {object} search - Search criteria object.
   */
  async newsCount<T>(
    search: Partial<{
      showId: number;
      episodeId: number;
      category: string;
      tag: string;
      isTrailer: boolean;
      similarNewsId: number;
      forCurrentUser: boolean;
    }>,
  ): Promise<RpcResponse<T, { search: Partial<typeof search> }>> {
    return await this.query<T, { search: Partial<typeof search> }>({
      method: 'news.Count',
      params: {
        search,
      },
    });
  }

  /**
   * Returns news by id (does not require authentication).
   * @param {int} newsId - News id.
   */
  async newsGetById<T>(
    newsId: number,
  ): Promise<RpcResponse<T, { newsId: number }>> {
    return await this.query<T, { newsId: number }>({
      method: 'news.GetById',
      params: {
        newsId,
      },
    });
  }

  /**
   * Returns news categories (does not require authentication).
   */
  async newsCategories<T>(): Promise<RpcResponse<T>> {
    return await this.query<T, {}>({
      method: 'news.Categories',
      params: {},
    });
  }

  /**
   * Returns news comments (does not require authentication).
   * @param {int} newsId - News id.
   */
  async newsComments<T>(
    newsId: number,
  ): Promise<RpcResponse<T, { newsId: number }>> {
    return await this.query<T, { newsId: number }>({
      method: 'news.Comments',
      params: {
        newsId,
      },
    });
  }

  /**
   * Marks news comments as viewed for the current user (requires authentication).
   * @param {int} newsId - News id.
   */
  async newsViewComments<T>(
    newsId: number,
  ): Promise<RpcResponse<T, { newsId: number }>> {
    return await this.query<T, { newsId: number }>({
      method: 'news.ViewComments',
      params: {
        newsId,
      },
    });
  }

  /**
   * Change tracking status for new comments for news (requires authentication).
   * @param {int} newsId - News id.
   * @param {boolean} isTracked - Should we track new comments for this news or not.
   */
  async newsTrackComments<T>(
    newsId: number,
    isTracked: boolean,
  ): Promise<RpcResponse<T, { newsId: number; isTracked: boolean }>> {
    return await this.query<T, { newsId: number; isTracked: boolean }>({
      method: 'news.TrackComments',
      params: {
        newsId,
        isTracked,
      },
    });
  }

  /**
   * Vote for a news comment (requires authentication).
   * @param {int} commentId - Comment id.
   * @param {boolean} isPositive - true/false for positive/negative vote.
   */
  async newsVoteComment<T>(
    commentId: number,
    isPositive: boolean,
  ): Promise<RpcResponse<T, { commentId: number; isPositive: boolean }>> {
    return await this.query<T, { commentId: number; isPositive: boolean }>({
      method: 'news.VoteComment',
      params: {
        commentId,
        isPositive,
      },
    });
  }

  /**
   * Post news comment (requires authentication).
   * @param {int} newsId - News id.
   * @param {string} text - Comment body (between 5 and 2000 (4000 for pro users) characters).
   * @param {string} [image] - Base64 encoded image.
   * @param {int} [parentCommentId] - Parent comment id.
   */
  async newsPostComment<T>(
    newsId: number,
    text: string,
    image?: string,
    parentCommentId?: number,
  ): Promise<RpcResponse<T, { newsId: number; text: string; image?: string; parentCommentId?: number }>> {
    return await this.query<T, { newsId: number; text: string; image?: string; parentCommentId?: number }>({
      method: 'news.PostComment',
      params: {
        newsId,
        text,
        image,
        parentCommentId,
      },
    });
  }

  /**
   * Update news comment (requires authentication).
   * @param {int} commentId - Comment id.
   * @param {string} text - Comment body (between 5 and 2000 (4000 for pro users) characters).
   * @param {string} [image] - Base64 encoded image.
   * @param {boolean} [deleteImage=false] - Whether to delete existing image.
   */
  async newsUpdateComment<T>(
    commentId: number,
    text: string,
    image?: string,
    deleteImage = false,
  ): Promise<RpcResponse<T, { commentId: number; text: string; image?: string; deleteImage: boolean }>> {
    return await this.query<T, { commentId: number; text: string; image?: string; deleteImage: boolean }>({
      method: 'news.UpdateComment',
      params: {
        commentId,
        text,
        image,
        deleteImage,
      },
    });
  }

  /**
   * Delete news comment (requires authentication).
   * @param {int} commentId - Comment id.
   */
  async newsDeleteComment<T>(
    commentId: number,
  ): Promise<RpcResponse<T, { commentId: number }>> {
    return await this.query<T, { commentId: number }>({
      method: 'news.DeleteComment',
      params: {
        commentId,
      },
    });
  }

  /**
   * Translate news comment (requires authentication).
   * @param {int} commentId - Comment id.
   * @param {string} language - Target language.
   */
  async newsTranslateComment<T>(
    commentId: number,
    language: string,
  ): Promise<RpcResponse<T, { commentId: number; language: string }>> {
    return await this.query<T, { commentId: number; language: string }>({
      method: 'news.TranslateComment',
      params: {
        commentId,
        language,
      },
    });
  }

  // Notes methods
  /**
   * Returns user notes based on search criteria (requires authentication).
   * @param {object} search - Search criteria object.
   * @param {int} [page=0] - Page number.
   * @param {int} [pageSize=100] - Number of notes per page (max 100).
   */
  async notesGet<T>(
    search: { isShow: boolean; isEpisode: boolean },
    page = 0,
    pageSize = 100,
  ): Promise<RpcResponse<T, { search: { isShow: boolean; isEpisode: boolean }; page: number; pageSize: number }>> {
    return await this.query<T, { search: { isShow: boolean; isEpisode: boolean }; page: number; pageSize: number }>({
      method: 'notes.Get',
      params: {
        search,
        page,
        pageSize,
      },
    });
  }

  /**
   * Returns total count of notes matching search criteria (requires authentication).
   * @param {object} search - Search criteria object.
   */
  async notesCount<T>(
    search: { isShow: boolean; isEpisode: boolean },
  ): Promise<RpcResponse<T, { search: { isShow: boolean; isEpisode: boolean } }>> {
    return await this.query<T, { search: { isShow: boolean; isEpisode: boolean } }>({
      method: 'notes.Count',
      params: {
        search,
      },
    });
  }

  /**
   * Save note (requires authentication).
   * @param {int} showId - Show id.
   * @param {string} text - Note text.
   * @param {int} [episodeId] - Episode id.
   */
  async notesSave<T>(
    showId: number,
    text: string,
    episodeId?: number,
  ): Promise<RpcResponse<T, NotesSaveResponse>> {
    return await this.query<T, { showId: number; text: string; episodeId?: number }>({
      method: 'notes.Save',
      params: {
        showId,
        text,
        episodeId,
      },
    });
  }

  /**
   * Delete note (requires authentication).
   * @param {int} episodeId - Episode id.
   */
  async notesDelete<T>(episodeId: number): Promise<RpcResponse<T, EpisodeId>> {
    return await this.query<T, EpisodeId>({
      method: 'notes.Delete',
      params: {
        id: episodeId,
      },
    });
  }

  /**
   * Restore note (requires authentication).
   * @param {int} episodeId - Episode id.
   */
  async notesRestore<T>(episodeId: number): Promise<RpcResponse<T, EpisodeId>> {
    return await this.query<T, EpisodeId>({
      method: 'notes.Restore',
      params: {
        id: episodeId,
      },
    });
  }

  // Auth methods
  /**
   * Register new user (does not require authentication).
   * @param {string} clientId - Client ID.
   * @param {string} sig - Signature.
   * @param {string} login - Username.
   * @param {string} email - Email address.
   * @param {string} password - Password.
   */
  async authRegister<T>(
    clientId: string,
    sig: string,
    login: string,
    email: string,
    password: string,
  ): Promise<RpcResponse<T, { clientId: string; sig: string; login: string; email: string; password: string }>> {
    return await this.query<T, { clientId: string; sig: string; login: string; email: string; password: string }>({
      method: 'auth.Register',
      params: {
        clientId,
        sig,
        login,
        email,
        password,
      },
    });
  }

  /**
   * Login with Apple ID (does not require authentication).
   * @param {string} clientId - Client ID.
   * @param {string} sig - Signature.
   * @param {string} identityToken - Apple ID identity token.
   */
  async authLoginByAppleID<T>(
    clientId: string,
    sig: string,
    identityToken: string,
  ): Promise<RpcResponse<T, { clientId: string; sig: string; identityToken: string }>> {
    return await this.query<T, { clientId: string; sig: string; identityToken: string }>({
      method: 'auth.LoginByAppleID',
      params: {
        clientId,
        sig,
        identityToken,
      },
    });
  }

  /**
   * Unlink social profile (requires authentication).
   * @param {string} provider - Social provider from EShowSources enum.
   */
  async authUnlinkSocialProfile<T>(
    provider: EShowSources,
  ): Promise<RpcResponse<T, { provider: EShowSources }>> {
    return await this.query<T, { provider: EShowSources }>({
      method: 'auth.UnlinkSocialProfile',
      params: {
        provider,
      },
    });
  }

  /**
   * Link social profile (requires authentication).
   * @param {string} provider - Social provider from EShowSources enum.
   * @param {string} returnUrl - Return URL after authentication.
   */
  async authLinkSocialProfile<T>(
    provider: EShowSources,
    returnUrl: string,
  ): Promise<RpcResponse<T, { provider: EShowSources; returnUrl: string }>> {
    return await this.query<T, { provider: EShowSources; returnUrl: string }>({
      method: 'auth.LinkSocialProfile',
      params: {
        provider,
        returnUrl,
      },
    });
  }

  // IAP methods
  /**
   * Validate iOS receipt (requires authentication).
   * @param {string} receiptData - Base64 encoded receipt data.
   * @param {string} transactionId - Transaction ID.
   * @param {boolean} isSandbox - Whether this is a sandbox receipt.
   */
  async iapValidateReceiptIOS<T>(
    receiptData: string,
    transactionId: string,
    isSandbox: boolean,
  ): Promise<RpcResponse<T, { receiptData: string; transactionId: string; isSandbox: boolean }>> {
    return await this.query<T, { receiptData: string; transactionId: string; isSandbox: boolean }>({
      method: 'iap.ValidateReceiptIOS',
      params: {
        receiptData,
        transactionId,
        isSandbox,
      },
    });
  }

  /**
   * Validate Android receipt (requires authentication).
   * @param {string} payload - Receipt payload.
   */
  async iapValidateReceiptAndroid<T>(
    payload: string,
  ): Promise<RpcResponse<T, { payload: string }>> {
    return await this.query<T, { payload: string }>({
      method: 'iap.ValidateReceiptAndroid',
      params: {
        payload,
      },
    });
  }

  // Site methods
  /**
   * Get website metadata for URL (does not require authentication).
   * @param {string} url - URL to get metadata for.
   */
  async siteMeta<T>(url: string): Promise<RpcResponse<T, { url: string }>> {
    return await this.query<T, { url: string }>({
      method: 'site.Meta',
      params: {
        url,
      },
    });
  }

  /**
   * Returns website counters (does not require authentication).
   */
  async siteCounters<T>(): Promise<RpcResponse<T>> {
    return await this.query<T, {}>({
      method: 'site.Counters',
      params: {},
    });
  }

  /**
   * Returns popular shows (does not require authentication).
   * @param {int} [count=500] - Number of shows (max 500).
   */
  async siteShowsPopular<T>(
    count = 500,
  ): Promise<RpcResponse<T, { count: number }>> {
    return await this.query<T, { count: number }>({
      method: 'site.ShowsPopular',
      params: {
        count,
      },
    });
  }

  /**
   * Returns online shows (does not require authentication).
   * @param {int} [count=500] - Number of shows (max 500).
   */
  async siteShowsOnline<T>(
    count = 500,
  ): Promise<RpcResponse<T, { count: number }>> {
    return await this.query<T, { count: number }>({
      method: 'site.ShowsOnline',
      params: {
        count,
      },
    });
  }

  /**
   * Returns online promo shows (does not require authentication).
   * @param {int} [count=500] - Number of shows (max 500).
   */
  async siteShowsOnlinePromo<T>(
    count = 500,
  ): Promise<RpcResponse<T, { count: number }>> {
    return await this.query<T, { count: number }>({
      method: 'site.ShowsOnlinePromo',
      params: {
        count,
      },
    });
  }

  /**
   * Returns top episode comments (does not require authentication).
   * @param {int} [episodeCount=100] - Number of episodes.
   * @param {int} [days=7] - Number of days.
   */
  async siteTopEpisodeComments<T>(
    episodeCount = 100,
    days = 7,
  ): Promise<RpcResponse<T, { episodeCount: number; days: number }>> {
    return await this.query<T, { episodeCount: number; days: number }>({
      method: 'site.TopEpisodeComments',
      params: {
        episodeCount,
        days,
      },
    });
  }

  /**
   * Returns payment types (does not require authentication).
   */
  async sitePaymentTypes<T>(): Promise<RpcResponse<T>> {
    return await this.query<T, {}>({
      method: 'site.PaymentTypes',
      params: {},
    });
  }

  /**
   * Returns products (does not require authentication).
   */
  async siteProducts<T>(): Promise<RpcResponse<T>> {
    return await this.query<T, {}>({
      method: 'site.Products',
      params: {},
    });
  }

  /**
   * Create pro transaction (requires authentication).
   * @param {string} product - Product identifier.
   * @param {string} paymentType - Payment type.
   */
  async siteCreateProTransaction<T>(
    product: string,
    paymentType: string,
  ): Promise<RpcResponse<T, { product: string; paymentType: string }>> {
    return await this.query<T, { product: string; paymentType: string }>({
      method: 'site.CreateProTransaction',
      params: {
        product,
        paymentType,
      },
    });
  }

  // Push notification methods
  /**
   * Register iOS push token (requires authentication).
   * @param {string} token - Push token.
   * @param {string} idfa - IDFA.
   */
  async pushRegisterTokenIOS<T>(
    token: string,
    idfa: string,
  ): Promise<RpcResponse<T, { token: string; idfa: string }>> {
    return await this.query<T, { token: string; idfa: string }>({
      method: 'push.RegisterTokenIOS',
      params: {
        token,
        idfa,
      },
    });
  }

  /**
   * Register Android push token (requires authentication).
   * @param {string} token - Push token.
   * @param {string} gaid - Google Advertising ID.
   */
  async pushRegisterTokenAndroid<T>(
    token: string,
    gaid: string,
  ): Promise<RpcResponse<T, { token: string; gaid: string }>> {
    return await this.query<T, { token: string; gaid: string }>({
      method: 'push.RegisterTokenAndroid',
      params: {
        token,
        gaid,
      },
    });
  }

  /**
   * Register web push token (requires authentication).
   * @param {string} token - Push token.
   */
  async pushRegisterTokenWeb<T>(
    token: string,
  ): Promise<RpcResponse<T, { token: string }>> {
    return await this.query<T, { token: string }>({
      method: 'push.RegisterTokenWeb',
      params: {
        token,
      },
    });
  }

  /**
   * Send test push to Android (requires authentication).
   * @param {string} pushType - Push type.
   */
  async pushSendTestAndroid<T>(
    pushType: string,
  ): Promise<RpcResponse<T, { pushType: string }>> {
    return await this.query<T, { pushType: string }>({
      method: 'push.SendTestAndroid',
      params: {
        pushType,
      },
    });
  }

  /**
   * Send test push to iOS (requires authentication).
   * @param {string} pushType - Push type.
   */
  async pushSendTestIOS<T>(
    pushType: string,
  ): Promise<RpcResponse<T, { pushType: string }>> {
    return await this.query<T, { pushType: string }>({
      method: 'push.SendTestIOS',
      params: {
        pushType,
      },
    });
  }

  // Recommendation methods
  /**
   * Get recommendations (requires authentication).
   * @param {int} [count=50] - Number of recommendations.
   */
  async recommendationGet<T = ShowRecommendation[]>(
    count = 50,
  ): Promise<RpcResponse<T, { count: number }>> {
    return await this.query<T, { count: number }>({
      method: 'recommendation.Get',
      params: {
        count,
      },
    });
  }

  /**
   * Reject recommendation (requires authentication).
   * @param {int} id - Episode id.
   */
  async recommendationReject<T>(id: number): Promise<RpcResponse<T, EpisodeId>> {
    return await this.query<T, EpisodeId>({
      method: 'recommendation.Reject',
      params: {
        id,
      },
    });
  }

  /**
   * Undo reject recommendation (requires authentication).
   * @param {int} id - Episode id.
   */
  async recommendationUndoReject<T>(id: number): Promise<RpcResponse<T, EpisodeId>> {
    return await this.query<T, EpisodeId>({
      method: 'recommendation.UndoReject',
      params: {
        id,
      },
    });
  }
}
