import { AxiosInstance } from 'axios';
import { JsonRpcResult } from '@json-rpc-tools/types';
import {
  Credentials,
  DefaultParams,
  EGenderVote,
  EList,
  EMovieStatus,
  EpisodeId,
  EpisodeList,
  EpisodeListWithId,
  EShowSources,
  EShowStatus,
  IMyShows,
  WithLoginParam,
  Method,
  OathResponse,
  OathResponseDone,
  OathResponseError,
  OathResponseV3,
  OathResponseV3Done,
  QueryHandlerParams,
  QueryParams,
  Rating,
  RpcError,
  RpcResponse,
  SearchObjectOptions,
  SearchParams,
  ShowSearchParams,
  WithId,
  WithMovieStatusParam,
  WithQueryParam,
  WithSearchParam,
  WithShowId,
  WithStatusParam,
  WithRatingParam,
  MethodV3,
} from '../types';
import {
  AUTH_URL,
  AUTH_URL_V3,
  BASE_URL_V2,
  BASE_URL_V3,
  DEFAULT_PARAMS,
} from '../constants';
import {
  createQueryInstance,
  getSearchObjectProps,
  handleErrorResponse,
  queryHandler,
} from '../utils';

export class MyShows implements IMyShows {
  private readonly credentials: Credentials;
  axios: AxiosInstance;
  axiosV3: AxiosInstance;
  defaultParams: DefaultParams;

  constructor(credentials: Credentials) {
    this.credentials = {
      ...credentials,
      grant_type: 'password',
    };
    this.axios = createQueryInstance(BASE_URL_V2);
    this.axiosV3 = createQueryInstance(BASE_URL_V3);
    this.defaultParams = DEFAULT_PARAMS;
  }

  /**
   * Returns an error if log in fails.
   */
  async login(): Promise<RpcError | void> {
    try {
      const response = await this.axios.post<OathResponse>(
        AUTH_URL,
        this.credentials
      );

      if ((response.data as OathResponseError).error) {
        return handleErrorResponse(response);
      }

      this.axios.defaults.headers.common['Authorization'] = `bearer ${
        (response.data as OathResponseDone).access_token
      }`;
    } catch (error) {
      return { error } as RpcError;
    }
  }

  /**
   * Returns an error if log in fails.
   */
  async loginV3(): Promise<RpcError | void> {
    try {
      const response = await this.axiosV3.post<OathResponseV3>(AUTH_URL_V3, {
        login: this.credentials.username,
        password: this.credentials.password,
      });

      if ((response.data as OathResponseError).error) {
        return handleErrorResponse(response);
      }

      this.axiosV3.defaults.headers.common.cookies =
        response.headers['set-cookie']?.join(';') ?? '';
      this.axiosV3.defaults.headers.common['authorization2'] = `Bearer ${
        (response.data as OathResponseV3Done).token
      }`;
    } catch (error) {
      return { error } as RpcError;
    }
  }

  /**
   * Internal query wrapper
   * @param params
   * @param instance
   * @private
   */
  private async query<T, P = QueryParams>(
    params: Omit<QueryHandlerParams<P>, 'query' | 'defaultParams'>,
    instance?: AxiosInstance
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
   * @private
   */
  private async queryV3<T, P = QueryParams>(
    params: Omit<QueryHandlerParams<P, MethodV3>, 'query' | 'defaultParams'>,
    instance?: AxiosInstance
  ) {
    return await queryHandler<T, P>({
      query: this.axiosV3,
      defaultParams: this.defaultParams,
      ...params,
    });
  }

  /**
   * Generic api method, list of available methods: https://api.myshows.me/shared/doc/
   * @param {string} method
   * @param {object} params
   */
  async generic<T>(
    method:
      | 'profile.Get'
      | 'profile.Feed'
      | 'profile.Friends'
      | 'profile.Followers'
      | 'profile.Friendship'
      | 'profile.Shows'
      | 'profile.EpisodeCommentsCount'
      | 'profile.NewsCommentsCount'
      | 'users.Follow'
      | 'users.UnFollow',
    params: WithLoginParam
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'profile.FriendsFeed',
    params: object
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'profile.ShowStatuses',
    params: {
      showIds?: number[];
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'profile.Episodes' | 'profile.Show',
    params: {
      showId: number;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'profile.Episode',
    params: {
      episodeId: number;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'profile.Achievements',
    params: {
      login: string;
      withPublic: false;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'profile.Achievement',
    params: {
      alias: string;
      key: string;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method:
      | 'profile.NewComments'
      | 'profile.NewNewsComments'
      | 'profile.NewCommentReplies'
      | 'profile.NewNewsCommentReplies'
      | 'profile.Counters'
      | 'profile.Settings',
    params: object
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'profile.SaveSettings',
    params: {
      settings: Array<{
        alias: string;
        value: string;
      }>;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'profile.EpisodeComments' | 'profile.NewsComments',
    params: {
      login: string;
      page: number;
      pageSize: number;
      sort: string;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'profile.MarkCommentsAsViewed',
    params: object
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.Get',
    params: {
      search: ShowSearchParams;
      page: number;
      pageSize: number;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.Count' | 'shows.Filters',
    params: {
      search: ShowSearchParams;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.GetById',
    params: {
      showId: number;
      withEpisodes: boolean;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.GetByExternalId',
    params: {
      id: number;
      source: EShowSources;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.Search',
    params: WithQueryParam
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.SearchByFile',
    params: {
      file: string;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.Ids',
    params: {
      fromId: number;
      count: number;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.Episode',
    params: EpisodeId
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.Genres',
    params: object
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.Top',
    params: {
      mode: 'all';
      count: number;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.EpisodeComments' | 'shows.ViewEpisodeComments',
    params: {
      episodeId: number;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.TrackEpisodeComments',
    params: {
      episodeId: number;
      isTracked: boolean;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.VoteEpisodeComment',
    params: {
      commentId: number;
      isPositive: boolean;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.PostEpisodeComment',
    params: {
      episodeId: number;
      text: string;
      image: string;
      parentCommentId: number;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.UpdateEpisodeComment',
    params: {
      commentId: number;
      text: string;
      image: string;
      deleteImage: boolean;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.DeleteEpisodeComment',
    params: {
      commentId: number;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.TranslateEpisodeComment',
    params: {
      commentId: number;
      language: string;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'lists.Episodes' | 'lists.Shows',
    params: {
      list: EList;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method:
      | 'lists.AddEpisode'
      | 'lists.RemoveEpisode'
      | 'lists.AddShow'
      | 'lists.RemoveShow',
    params: {
      id: number;
      list: EList;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'manage.SetShowStatus',
    params: {
      id: number;
      status: EShowStatus;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'manage.SetMovieStatus',
    params: {
      id: number;
      status: EMovieStatus;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'manage.RateShow' | 'manage.CheckEpisode' | 'manage.RateEpisode',
    params: {
      id: number;
      rating: Rating;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'manage.UnCheckEpisode',
    params: EpisodeId
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'manage.RateEpisodesBulk',
    params: {
      r1: number[];
      r2: number[];
      r3: number[];
      r4: number[];
      r5: number[];
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'manage.SyncEpisodes',
    params: {
      showId: number;
      episodeIds: number[];
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'manage.SyncEpisodesDelta',
    params: {
      showId: number;
      checkedIds: number[];
      unCheckedIds: number[];
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'manage.MoveEpisodeDate',
    params: {
      episodeId: number;
      shiftDays: number;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'users.Search',
    params: {
      search: SearchObjectOptions;
      page: number;
      pageSize: number;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'users.Count' | 'users.Filters',
    params: SearchParams
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'notes.Get',
    params: {
      search: {
        isShow: boolean;
        isEpisode: boolean;
      };
      page: number;
      pageSize: number;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'notes.Count',
    params: {
      search: {
        isShow: boolean;
        isEpisode: boolean;
      };
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'notes.Save',
    params: {
      showId: number;
      text: string;
      episodeId: number;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'notes.Delete' | 'notes.Restore',
    params: EpisodeId
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'auth.Register',
    params: {
      clientId: string;
      sig: string;
      login: string;
      email: string;
      password: string;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'auth.LoginByAppleID',
    params: {
      clientId: string;
      sig: string;
      identityToken: string;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'auth.UnlinkSocialProfile',
    params: {
      provider: EShowSources;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'auth.LinkSocialProfile',
    params: {
      provider: EShowSources;
      returnUrl: string;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'iap.ValidateReceiptIOS',
    params: {
      receiptData: string;
      transactionId: string;
      isSandbox: boolean;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'iap.ValidateReceiptAndroid',
    params: {
      payload: string;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'site.Meta',
    params: {
      url: string;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'site.Counters',
    params: object
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'site.ShowsPopular' | 'site.ShowsOnline' | 'site.ShowsOnlinePromo',
    params: {
      count: number;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'site.TopEpisodeComments',
    params: {
      episodeCount: number;
      days: number;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'site.PaymentTypes' | 'site.Products',
    params: object
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'site.CreateProTransaction',
    params: {
      product: string;
      paymentType: string;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'news.Get',
    params: {
      search: {
        showId: number;
        episodeId: number;
        category: string;
        tag: string;
        isTrailer: boolean;
        similarNewsId: number;
        forCurrentUser: boolean;
      };
      page: number;
      pageSize: number;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'news.Count',
    params: {
      search: {
        showId: number;
        episodeId: number;
        category: string;
        tag: string;
        isTrailer: boolean;
        similarNewsId: number;
        forCurrentUser: boolean;
      };
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'news.GetById' | 'news.Comments' | 'news.ViewComments',
    params: {
      newsId: number;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'news.Categories',
    params: object
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'news.TrackComments',
    params: {
      newsId: number;
      isTracked: boolean;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'news.VoteComment',
    params: {
      commentId: number;
      isPositive: boolean;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'news.PostComment',
    params: {
      newsId: number;
      text: string;
      image: string;
      parentCommentId: number;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'news.UpdateComment',
    params: {
      commentId: number;
      text: string;
      image: string;
      deleteImage: boolean;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'news.DeleteComment',
    params: {
      commentId: number;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'news.TranslateComment',
    params: {
      commentId: number;
      language: string;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'push.RegisterTokenIOS',
    params: {
      token: string;
      idfa: string;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'push.RegisterTokenAndroid',
    params: {
      token: string;
      gaid: string;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'push.RegisterTokenWeb',
    params: {
      token: string;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'push.SendTestAndroid' | 'push.SendTestIOS',
    params: {
      pushType: string;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'recommendation.Get',
    params: {
      count: number;
    }
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'recommendation.Reject' | 'recommendation.UndoReject',
    params: EpisodeId
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<V, T = JsonRpcResult<V>>(
    method: Method,
    params: Record<string, any>
  ): Promise<RpcResponse<T | RpcError>> {
    return await this.query<T, Record<string, any>>({
      method: method,
      params,
    });
  }

  /**
   * Returns a list of shows (requires authentication).
   * @param {string} [list=MyShows.EList.FAVORITES] - A list name.
   */
  async listsShows<T>(
    list = EList.FAVORITES
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
    list = EList.FAVORITES
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
    list: EList.FAVORITES | EList.IGNORED
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
    list: EList.FAVORITES | EList.IGNORED
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
    rating: R
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
    rating?: R
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
    id: number
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
    rating: R
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
    r5: R[]
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
    episodeIds: number[]
  ): Promise<RpcResponse<T,
    {
      showId: number;
      episodeIds: number[];
    }>> {
    return await this.query<T,
      {
        showId: number;
        episodeIds: number[];
      }>({
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
    unCheckedIds: number[]
  ): Promise<RpcResponse<T,
    {
      showId: number;
      checkedIds: number[];
      unCheckedIds: number[];
    }>> {
    return await this.query<T,
      {
        showId: number;
        checkedIds: number[];
        unCheckedIds: number[];
      }>({
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
    login: string
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
    login: string
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
    login: string
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
    showId: number
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
    withEpisodes = true
  ): Promise<RpcResponse<T,
    {
      showId: number;
      withEpisodes: boolean;
    }>> {
    return await this.query<T,
      {
        showId: number;
        withEpisodes: boolean;
      }>({
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
    source: EShowSources
  ): Promise<RpcResponse<T,
    {
      id: number;
      source: EShowSources;
    }>> {
    return await this.query<T,
      {
        id: number;
        source: EShowSources;
      }>({
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
  async showsSearch<T>(query: string): Promise<RpcResponse<T, WithQueryParam>> {
    return await this.query<T, WithQueryParam>({
      method: 'shows.Search',
      params: {
        query,
      },
    });
  }

  /**
   * Returns matched movies (does not require authentication).
   * @param {string} query - Query string.
   */
  async moviesSearch<T>(query: string) {
    return await this.queryV3<T, WithSearchParam<WithQueryParam>>({
      method: 'movies.GetCatalog',
      params: {
        search: { query },
      },
    });
  }

  /**
   * Returns matched shows (does not require authentication).
   * @param {string} file - Query string.
   */
  async showsSearchByFile<T>(
    file: string
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
    count: number
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
    count = 500
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
    isTracked: boolean
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
    isPositive: boolean
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
    parentId: number
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
   * Translate comment (requires authentication).
   * @param {int} id - Comment id.
   * @param {boolean} [language=user's default language] - Target language.
   */
  async showsTranslateEpisodeComment<T>(
    id: number,
    language: string
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
    pageSize = 100
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
    search: SearchObjectOptions = {}
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
    query: string
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
