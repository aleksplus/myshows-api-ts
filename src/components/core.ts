import { JSONRPCResponse } from 'json-rpc-2.0';
import { AxiosInstance } from 'axios';

import {
  Credentials,
  DefaultParams,
  EpisodeId,
  IMyShowsBase,
  Method,
  MethodV3,
  QueryHandlerParams,
  QueryParams,
  Rating,
  SearchObjectOptions,
  SearchParams,
  ShowSearchParams,
  WithLoginParam,
  WithQueryParam,
} from '../types/request';
import {
  OathResponse,
  OathResponseDone,
  OathResponseError,
  OathResponseV3,
  OathResponseV3Done,
  RpcError,
  RpcResponse,
} from '../types/rpcUtils';
import { EList, EMovieStatus, EShowSources, EShowStatus } from '../enums';

import {
  AUTH_URL,
  AUTH_URL_V3,
  BASE_URL_V2,
  BASE_URL_V3,
  DEFAULT_PARAMS,
} from '../constants';

import {
  createQueryInstance,
  handleErrorResponse,
  queryHandler,
} from '../utils';

export class MyShowsCore implements IMyShowsBase {
  private readonly credentials: Credentials;
  protected axios: AxiosInstance;
  protected axiosV3: AxiosInstance;
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
        this.credentials,
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
   * @private
   */
  protected async queryV3<T, P = QueryParams>(
    params: Omit<QueryHandlerParams<P, MethodV3>, 'query' | 'defaultParams'>,
    instance?: AxiosInstance,
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
    params: WithLoginParam,
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'profile.FriendsFeed',
    params: object,
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'profile.ShowStatuses',
    params: {
      showIds?: number[];
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'profile.Episodes' | 'profile.Show',
    params: {
      showId: number;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'profile.Episode',
    params: {
      episodeId: number;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'profile.Achievements',
    params: {
      login: string;
      withPublic: false;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'profile.Achievement',
    params: {
      alias: string;
      key: string;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method:
      | 'profile.NewComments'
      | 'profile.NewNewsComments'
      | 'profile.NewCommentReplies'
      | 'profile.NewNewsCommentReplies'
      | 'profile.Counters'
      | 'profile.Settings',
    params: object,
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'profile.SaveSettings',
    params: {
      settings: Array<{
        alias: string;
        value: string;
      }>;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'profile.EpisodeComments' | 'profile.NewsComments',
    params: {
      login: string;
      page: number;
      pageSize: number;
      sort: string;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'profile.MarkCommentsAsViewed',
    params: object,
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.Get',
    params: {
      search: ShowSearchParams;
      page: number;
      pageSize: number;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.Count' | 'shows.Filters',
    params: {
      search: ShowSearchParams;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.GetById',
    params: {
      showId: number;
      withEpisodes: boolean;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.GetByExternalId',
    params: {
      id: number;
      source: EShowSources;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.Search',
    params: WithQueryParam,
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.SearchByFile',
    params: {
      file: string;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.Ids',
    params: {
      fromId: number;
      count: number;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.Episode',
    params: EpisodeId,
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.Genres',
    params: object,
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.Top',
    params: {
      mode: 'all';
      count: number;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.EpisodeComments' | 'shows.ViewEpisodeComments',
    params: {
      episodeId: number;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.TrackEpisodeComments',
    params: {
      episodeId: number;
      isTracked: boolean;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.VoteEpisodeComment',
    params: {
      commentId: number;
      isPositive: boolean;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.PostEpisodeComment',
    params: {
      episodeId: number;
      text: string;
      image: string;
      parentCommentId: number;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.UpdateEpisodeComment',
    params: {
      commentId: number;
      text: string;
      image: string;
      deleteImage: boolean;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.DeleteEpisodeComment',
    params: {
      commentId: number;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'shows.TranslateEpisodeComment',
    params: {
      commentId: number;
      language: string;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'lists.Episodes' | 'lists.Shows',
    params: {
      list: EList;
    },
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
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'manage.SetShowStatus',
    params: {
      id: number;
      status: EShowStatus;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'manage.SetMovieStatus',
    params: {
      id: number;
      status: EMovieStatus;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'manage.RateShow' | 'manage.CheckEpisode' | 'manage.RateEpisode',
    params: {
      id: number;
      rating: Rating;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'manage.UnCheckEpisode',
    params: EpisodeId,
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'manage.RateEpisodesBulk',
    params: {
      r1: number[];
      r2: number[];
      r3: number[];
      r4: number[];
      r5: number[];
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'manage.SyncEpisodes',
    params: {
      showId: number;
      episodeIds: number[];
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'manage.SyncEpisodesDelta',
    params: {
      showId: number;
      checkedIds: number[];
      unCheckedIds: number[];
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'manage.MoveEpisodeDate',
    params: {
      episodeId: number;
      shiftDays: number;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'users.Search',
    params: {
      search: SearchObjectOptions;
      page: number;
      pageSize: number;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'users.Count' | 'users.Filters',
    params: SearchParams,
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
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'notes.Count',
    params: {
      search: {
        isShow: boolean;
        isEpisode: boolean;
      };
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'notes.Save',
    params: {
      showId: number;
      text: string;
      episodeId: number;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'notes.Delete' | 'notes.Restore',
    params: EpisodeId,
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'auth.Register',
    params: {
      clientId: string;
      sig: string;
      login: string;
      email: string;
      password: string;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'auth.LoginByAppleID',
    params: {
      clientId: string;
      sig: string;
      identityToken: string;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'auth.UnlinkSocialProfile',
    params: {
      provider: EShowSources;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'auth.LinkSocialProfile',
    params: {
      provider: EShowSources;
      returnUrl: string;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'iap.ValidateReceiptIOS',
    params: {
      receiptData: string;
      transactionId: string;
      isSandbox: boolean;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'iap.ValidateReceiptAndroid',
    params: {
      payload: string;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'site.Meta',
    params: {
      url: string;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'site.Counters',
    params: object,
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'site.ShowsPopular' | 'site.ShowsOnline' | 'site.ShowsOnlinePromo',
    params: {
      count: number;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'site.TopEpisodeComments',
    params: {
      episodeCount: number;
      days: number;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'site.PaymentTypes' | 'site.Products',
    params: object,
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'site.CreateProTransaction',
    params: {
      product: string;
      paymentType: string;
    },
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
    },
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
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'news.GetById' | 'news.Comments' | 'news.ViewComments',
    params: {
      newsId: number;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'news.Categories',
    params: object,
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'news.TrackComments',
    params: {
      newsId: number;
      isTracked: boolean;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'news.VoteComment',
    params: {
      commentId: number;
      isPositive: boolean;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'news.PostComment',
    params: {
      newsId: number;
      text: string;
      image: string;
      parentCommentId: number;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'news.UpdateComment',
    params: {
      commentId: number;
      text: string;
      image: string;
      deleteImage: boolean;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'news.DeleteComment',
    params: {
      commentId: number;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'news.TranslateComment',
    params: {
      commentId: number;
      language: string;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'push.RegisterTokenIOS',
    params: {
      token: string;
      idfa: string;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'push.RegisterTokenAndroid',
    params: {
      token: string;
      gaid: string;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'push.RegisterTokenWeb',
    params: {
      token: string;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'push.SendTestAndroid' | 'push.SendTestIOS',
    params: {
      pushType: string;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'recommendation.Get',
    params: {
      count: number;
    },
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<T>(
    method: 'recommendation.Reject' | 'recommendation.UndoReject',
    params: EpisodeId,
  ): Promise<RpcResponse<T> | RpcError>;

  async generic<V, T = JSONRPCResponse>(
    method: Method,
    params: Record<string, any>,
  ): Promise<RpcResponse<T | RpcError>> {
    return await this.query<T, Record<string, any>>({
      method: method,
      params,
    });
  }
}
