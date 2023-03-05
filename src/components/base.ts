import {
  EpisodeId,
  EpisodeList,
  EpisodeListWithId,
  IMyShows,
  SearchObjectOptions,
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
import { MovieModel, MovieSearch, ShowsModel } from '../types/models';
import {
  EGenderVote,
  EList,
  EMovieStatus,
  EShowSources,
  EShowStatus,
} from '../enums';
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
   * Returns user profile (requires authentication only if login param omited).
   * @param {string} [login] - Username. If omited method returns data for the current user.
   */
  async profileGet<T>(login: string): Promise<RpcResponse<T, WithLoginParam>> {
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
  async profileFeed<T>(login: string): Promise<RpcResponse<T, WithLoginParam>> {
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
  async showsEpisode<T>(id: number): Promise<RpcResponse<T>> {
    return await this.query<T, WithId>({
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
  async showsTop<T>(
    mode = EGenderVote.ALL,
    count = 500,
  ): Promise<RpcResponse<T>> {
    return await this.query<T, {}>({
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
  async showsViewEpisodeComments<T>(id: number): Promise<RpcResponse<T>> {
    return await this.query<T, {}>({
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
  async showsTrackEpisodeComments<T>(
    id: number,
    isTracked: boolean,
  ): Promise<RpcResponse<T>> {
    return await this.query<T, {}>({
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
  async showsVoteEpisodeComment<T>(
    id: number,
    isPositive: boolean,
  ): Promise<RpcResponse<T>> {
    return await this.query<T, {}>({
      method: 'shows.VoteEpisodeComment',
      params: {
        commentId: id,
        isPositive,
      },
    });
  }

  /**
   * Post comment (requires authentication).
   * @param {int} id - Episode id.
   * @param {string} text - Comment body (between 5 and 2000 (4000 for pro users) characters).
   * @param {int} [parentId] - Parent comment id.
   */
  async showsPostEpisodeComment<T>(
    id: number,
    text: string,
    parentId: number,
  ): Promise<RpcResponse<T>> {
    return await this.query<T, {}>({
      method: 'shows.PostEpisodeComment',
      params: {
        commentId: id,
        text,
        parentCommentId: parentId,
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
  async showsTranslateEpisodeComment<T>(
    id: number,
    language: string,
  ): Promise<RpcResponse<T>> {
    return await this.query<T, {}>({
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
}
