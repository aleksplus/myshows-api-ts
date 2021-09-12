import { JsonRpcError, JsonRpcResult } from '@json-rpc-tools/types';
import { AxiosInstance } from 'axios';

export type Method =
  | 'profile.Get'
  | 'profile.Feed'
  | 'profile.Friends'
  | 'profile.Followers'
  | 'profile.Friendship'
  | 'profile.FriendsFeed'
  | 'profile.Shows'
  | 'profile.ShowStatuses'
  | 'profile.Episodes'
  | 'profile.Show'
  | 'profile.Episode'
  | 'profile.Achievements'
  | 'profile.Achievement'
  | 'profile.NewComments'
  | 'profile.NewNewsComments'
  | 'profile.NewCommentReplies'
  | 'profile.NewNewsCommentReplies'
  | 'profile.Counters'
  | 'profile.Settings'
  | 'profile.SaveSettings'
  | 'profile.EpisodeCommentsCount'
  | 'profile.EpisodeComments'
  | 'profile.NewsCommentsCount'
  | 'profile.NewsComments'
  | 'profile.MarkCommentsAsViewed'
  | 'shows.Get'
  | 'shows.Count'
  | 'shows.Filters'
  | 'shows.GetById'
  | 'shows.GetByExternalId'
  | 'shows.Search'
  | 'shows.SearchByFile'
  | 'shows.Ids'
  | 'shows.Episode'
  | 'shows.Genres'
  | 'shows.Top'
  | 'shows.EpisodeComments'
  | 'shows.ViewEpisodeComments'
  | 'shows.TrackEpisodeComments'
  | 'shows.VoteEpisodeComment'
  | 'shows.PostEpisodeComment'
  | 'shows.UpdateEpisodeComment'
  | 'shows.DeleteEpisodeComment'
  | 'shows.TranslateEpisodeComment'
  | 'lists.Episodes'
  | 'lists.AddEpisode'
  | 'lists.RemoveEpisode'
  | 'lists.Shows'
  | 'lists.AddShow'
  | 'lists.RemoveShow'
  | 'manage.SetShowStatus'
  | 'manage.RateShow'
  | 'manage.CheckEpisode'
  | 'manage.UnCheckEpisode'
  | 'manage.RateEpisode'
  | 'manage.RateEpisodesBulk'
  | 'manage.SyncEpisodes'
  | 'manage.SyncEpisodesDelta'
  | 'manage.MoveEpisodeDate'
  | 'users.Search'
  | 'users.Count'
  | 'users.Filters'
  | 'users.Follow'
  | 'users.UnFollow'
  | 'notes.Get'
  | 'notes.Count'
  | 'notes.Save'
  | 'notes.Delete'
  | 'notes.Restore'
  | 'auth.Register'
  | 'auth.LoginByAppleID'
  | 'auth.UnlinkSocialProfile'
  | 'auth.LinkSocialProfile'
  | 'iap.ValidateReceiptIOS'
  | 'iap.ValidateReceiptAndroid'
  | 'site.Meta'
  | 'site.Counters'
  | 'site.ShowsPopular'
  | 'site.ShowsOnline'
  | 'site.ShowsOnlinePromo'
  | 'site.TopEpisodeComments'
  | 'site.PaymentTypes'
  | 'site.Products'
  | 'site.CreateProTransaction'
  | 'news.Get'
  | 'news.Count'
  | 'news.GetById'
  | 'news.Categories'
  | 'news.Comments'
  | 'news.ViewComments'
  | 'news.TrackComments'
  | 'news.VoteComment'
  | 'news.PostComment'
  | 'news.UpdateComment'
  | 'news.DeleteComment'
  | 'news.TranslateComment'
  | 'push.RegisterTokenIOS'
  | 'push.RegisterTokenAndroid'
  | 'push.RegisterTokenWeb'
  | 'push.SendTestAndroid'
  | 'push.SendTestIOS'
  | 'recommendation.Get'
  | 'recommendation.Reject'
  | 'recommendation.UndoReject';

export enum EList {
  FAVORITES = 'favorites',
  IGNORED = 'ignored',
  UNWATCHED = 'unwatched',
  NEXT = 'next',
}

export enum EGender {
  MALE = 'm',
  FEMALE = 'f',
  UNKNOWN = 'x',
}

export enum EGenderVote {
  MALE = 'm',
  FEMALE = 'f',
  ALL = 'all',
}

export enum ESpentTime {
  NONE = 1,
  HOUR = 2,
  DAY = 3,
  WEEK = 4,
  MONTH = 5,
  YEAR = 6,
}

export enum EShowSources {
  TVRAGE = 'tvrage',
  TVMAZE = 'tvmaze',
  THETVDB = 'thetvdb',
  IMDB = 'imdb',
  KINOPOISK = 'kinopoisk',
}

export enum EShowStatus {
  watching = 'watching',
  later = 'later',
  cancelled = 'cancelled',
  remove = 'remove',
}

type OmitRpc<T extends {
  jsonrpc: any;
  id: any;
}> = Omit<T, 'jsonrpc' | 'id'>;

export type RpcError = OmitRpc<JsonRpcError>;
export type RpcResult<T = any> = OmitRpc<JsonRpcResult<T>>;
export type RpcResponse<T = any, P = {}> = (RpcResult<T> & P) | RpcError;

export type Credentials = {
  client_id: string;
  client_secret: string;
  username: string;
  password: string;
  grant_type?: 'password';
};

export type DefaultParams = {
  jsonrpc: string;
  method: Method;
  params: Record<string, unknown>;
  id: number;
};

export interface IMyShowsList {
  listsShows<T>(list: EList): Promise<RpcResponse<T, { list: EList }>>;

  listsAddShow<T>(id: number): Promise<RpcResponse<T, { id: number }>>;

  listsRemoveShow<T>(id: number): Promise<RpcResponse<T,
    {
      id: number;
    }>>;

  listsEpisodes<T>(list: EList): Promise<RpcResponse<T, { list: EList }>>;

  listsAddEpisode<T>(
    id: number,
    list: EList
  ): Promise<RpcResponse<T,
    {
      list: EList.FAVORITES | EList.IGNORED;
      id: number;
    }>>;

  listsRemoveEpisode<T>(
    id: number,
    list: EList.FAVORITES | EList.IGNORED
  ): Promise<RpcResponse<T,
    {
      list: EList.FAVORITES | EList.IGNORED;
      id: number;
    }>>;
}

type Rating = 1 | 2 | 3 | 4 | 5;

export interface IMyShowsManage {
  manageSetShowStatus<T>(
    id: number,
    status: EShowStatus
  ): Promise<RpcResponse<T,
    {
      id: number;
      status: EShowStatus;
    }>>;

  manageRateShow<T, R = Rating>(
    id: number,
    rating: R
  ): Promise<RpcResponse<T,
    {
      id: number;
      rating: R;
    }>>;

  manageCheckEpisode<T, R = Rating>(
    id: number,
    rating: R
  ): Promise<RpcResponse<T,
    {
      id: number;
      rating: R;
    }>>;

  manageUnCheckEpisode<T, R = Rating>(
    id: number
  ): Promise<RpcResponse<T,
    {
      id: number;
    }>>;

  manageRateEpisode<T, R = Rating>(
    id: number,
    rating: Rating
  ): Promise<RpcResponse<T,
    {
      id: number;
      rating: R;
    }>>;

  manageRateEpisode<T, R = Rating>(
    id: number,
    rating: R
  ): Promise<RpcResponse<T,
    {
      id: number;
      rating: R;
    }>>;

  manageRateEpisodesBulk<T, R = Rating>(
    id: number,
    r1: R[],
    r2: R[],
    r3: R[],
    r4: R[],
    r5: R[]
  ): Promise<RpcResponse<T,
    {
      id: number;
    }>>;

  manageSyncEpisodes<T>(
    id: number,
    episodeIds: number[]
  ): Promise<RpcResponse<T,
    {
      id: number;
    }>>;

  manageSyncEpisodesDelta<T>(
    id: number,
    checkedIds: number[],
    unCheckedIds: number[]
  ): Promise<RpcResponse<T,
    {
      id: number;
    }>>;
}

export interface IMyShowsProfile {
  profileGet<T>(login: string): Promise<RpcResponse<T,
    {
      login: string;
    }>>;

  profileFeed<T>(login: string): Promise<RpcResponse<T,
    {
      login: string;
    }>>;

  profileFriends<T>(login: string): Promise<RpcResponse<T,
    {
      login: string;
    }>>;

  profileFollowers<T>(login: string): Promise<RpcResponse<T,
    {
      login: string;
    }>>;

  profileFriendsFeed<T>(): Promise<RpcResponse<T>>;

  profileShows<T>(login: string): Promise<RpcResponse<T,
    {
      login: string;
    }>>;

  profileEpisodes<T>(showId: number): Promise<RpcResponse<T,
    {
      showId: number;
    }>>;

  profileAchievements<T>(): Promise<RpcResponse<T>>;

  profileNewComments<T>(): Promise<RpcResponse<T>>;
}

export interface IMyShowsShows {
  showsGetById<T>(id: number, withEpisodes: boolean): Promise<RpcResponse<T>>;

  showsGetByExternalId<T>(
    id: number,
    source: EShowSources
  ): Promise<RpcResponse<T>>;

  showsSearch<T>(query: string): Promise<RpcResponse<T>>;

  showsSearchByFile<T>(file: string): Promise<RpcResponse<T>>;

  showsIds<T>(fromId: number, count: number): Promise<RpcResponse<T>>;

  showsEpisode<T>(id: number): Promise<RpcResponse<T>>;

  showsGenres<T>(): Promise<RpcResponse<T>>;

  showsTop<T>(mode: EGenderVote, count: number): Promise<RpcResponse<T>>;

  showsViewEpisodeComments<T>(id: number): Promise<RpcResponse<T>>;

  showsTrackEpisodeComments<T>(
    id: number,
    isTracked: boolean
  ): Promise<RpcResponse<T>>;

  showsVoteEpisodeComment<T>(
    id: number,
    isPositive: boolean
  ): Promise<RpcResponse<T>>;

  showsPostEpisodeComment<T>(
    id: number,
    text: string,
    parentId: number
  ): Promise<RpcResponse<T>>;

  showsTranslateEpisodeComment<T>(
    id: number,
    language: string
  ): Promise<RpcResponse<T>>;
}

export interface IMyShowsUsers {
  usersSearch<T>(
    search: Record<string, unknown>,
    page: number,
    pageSize: number
  ): Promise<RpcResponse<T>>;

  usersCount<T>(search: Record<string, unknown>): Promise<RpcResponse<T>>;

  usersFiltersCounters<T>(query: string): Promise<RpcResponse<T,
    {
      query: string;
    }>>;
}

export interface IMyShows
  extends IMyShowsUsers,
    IMyShowsProfile,
    IMyShowsList,
    IMyShowsManage,
    IMyShowsShows {
  credentials: Credentials;
  axios: AxiosInstance;
  defaultParams: DefaultParams;

  login(): Promise<RpcError | void>;

  generic<T>(method: 'profile.Get' | 'profile.Feed' | 'profile.Friends' | 'profile.Followers' | 'profile.Friendship' | 'profile.Shows' | 'profile.EpisodeCommentsCount' | 'profile.NewsCommentsCount' | 'users.Follow' | 'users.UnFollow', params: {
    login: string
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'profile.FriendsFeed', params: object): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'profile.ShowStatuses', params: {
    showIds?: number[];
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'profile.Episodes' | 'profile.Show', params: {
    showId: number
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'profile.Episode', params: {
    episodeId: number
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'profile.Achievements', params: {
    login: string,
    withPublic: false
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'profile.Achievement', params: {
    alias: string,
    key: string
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'profile.NewComments' | 'profile.NewNewsComments' | 'profile.NewCommentReplies' | 'profile.NewNewsCommentReplies' | 'profile.Counters' | 'profile.Settings', params: object): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'profile.SaveSettings', params: {
    settings: Array<{
      alias: string,
      value: string
    }>
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'profile.EpisodeComments' | 'profile.NewsComments', params: {
    login: string,
    page: number,
    pageSize: number,
    sort: string
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'profile.MarkCommentsAsViewed', params: object): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'shows.Get', params: {
    search: {
      network: number,
      genre: number,
      country: string,
      year: number,
      watching: number,
      category: string,
      status: string,
      sort: string,
      query: string
    },
    page: number,
    pageSize: number
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'shows.Count' | 'shows.Filters', params: {
    search: {
      network: number,
      genre: number,
      country: string,
      year: number,
      watching: number,
      category: string,
      status: string,
      sort: string,
      query: string
    },
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'shows.GetById', params: {
    showId: number,
    withEpisodes: boolean
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'shows.GetByExternalId', params: {
    id: number,
    source: EShowSources
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'shows.Search', params: {
    query: string
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'shows.SearchByFile', params: {
    file: string
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'shows.Ids', params: {
    fromId: number,
    count: number
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'shows.Episode', params: {
    id: number
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'shows.Genres', params: object): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'shows.Top', params: {
    mode: 'all',
    count: number
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'shows.EpisodeComments' | 'shows.ViewEpisodeComments', params: {
    episodeId: number
  }): Promise<RpcResponse<T> | RpcError>;


  generic<T>(method: 'shows.TrackEpisodeComments', params: {
    episodeId: number,
    isTracked: boolean
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'shows.VoteEpisodeComment', params: {
    commentId: number,
    isPositive: boolean
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'shows.PostEpisodeComment', params: {
    episodeId: number,
    text: string,
    image: string,
    parentCommentId: number
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'shows.UpdateEpisodeComment', params: {
    commentId: number,
    text: string,
    image: string,
    deleteImage: boolean
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'shows.DeleteEpisodeComment', params: {
    commentId: number
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'shows.TranslateEpisodeComment', params: {
    commentId: number,
    language: string
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'lists.Episodes' | 'lists.Shows', params: {
    list: EList
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'lists.AddEpisode' | 'lists.RemoveEpisode' | 'lists.AddShow' | 'lists.RemoveShow', params: {
    id: number,
    list: EList
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'manage.SetShowStatus', params: {
    id: number,
    status: EShowStatus
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'manage.RateShow' | 'manage.CheckEpisode' | 'manage.RateEpisode', params: {
    id: number,
    rating: Rating
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'manage.UnCheckEpisode', params: {
    id: number
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'manage.RateEpisodesBulk', params: {
    r1: number[],
    r2: number[],
    r3: number[],
    r4: number[],
    r5: number[]
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'manage.SyncEpisodes', params: {
    showId: number,
    episodeIds: number[]
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'manage.SyncEpisodesDelta', params: {
    showId: number,
    checkedIds: number[],
    unCheckedIds: number[]
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'manage.MoveEpisodeDate', params: {
    episodeId: number,
    shiftDays: number
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'users.Search', params: {
    search: {
      query: string,
      wasted: number,
      year: number,
      gender: string
    },
    page: number,
    pageSize: number
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'users.Count' | 'users.Filters', params: {
    search: {
      query: string,
      wasted: number,
      year: number,
      gender: string
    },
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'notes.Get', params: {
    search: {
      isShow: boolean,
      isEpisode: boolean
    },
    page: number,
    pageSize: number
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'notes.Count', params: {
    search: {
      isShow: boolean,
      isEpisode: boolean
    }
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'notes.Save', params: {
    showId: number,
    text: string,
    episodeId: number
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'notes.Delete' | 'notes.Restore', params: {
    id: number
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'auth.Register', params: {
    clientId: string,
    sig: string,
    login: string,
    email: string,
    password: string
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'auth.LoginByAppleID', params: {
    clientId: string,
    sig: string,
    identityToken: string
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'auth.UnlinkSocialProfile', params: {
    provider: EShowSources
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'auth.LinkSocialProfile', params: {
    provider: EShowSources,
    returnUrl: string
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'iap.ValidateReceiptIOS', params: {
    receiptData: string,
    transactionId: string,
    isSandbox: boolean
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'iap.ValidateReceiptAndroid', params: {
    payload: string
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'site.Meta', params: {
    url: string
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'site.Counters', params: object): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'site.ShowsPopular' | 'site.ShowsOnline' | 'site.ShowsOnlinePromo', params: {
    count: number
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'site.TopEpisodeComments', params: {
    episodeCount: number,
    days: number
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'site.PaymentTypes' | 'site.Products', params: object): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'site.CreateProTransaction', params: {
    product: string,
    paymentType: string
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'news.Get', params: {
    search: {
      showId: number,
      episodeId: number,
      category: string,
      tag: string,
      isTrailer: boolean,
      similarNewsId: number,
      forCurrentUser: boolean
    },
    page: number,
    pageSize: number
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'news.Count', params: {
    search: {
      showId: number,
      episodeId: number,
      category: string,
      tag: string,
      isTrailer: boolean,
      similarNewsId: number,
      forCurrentUser: boolean
    }
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'news.GetById' | 'news.Comments' | 'news.ViewComments', params: {
    newsId: number
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'news.Categories', params: object): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'news.TrackComments', params: {
    newsId: number,
    isTracked: boolean
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'news.VoteComment', params: {
    commentId: number,
    isPositive: boolean
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'news.PostComment', params: {
    newsId: number,
    text: string,
    image: string,
    parentCommentId: number
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'news.UpdateComment', params: {
    commentId: number,
    text: string,
    image: string,
    deleteImage: boolean
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'news.DeleteComment', params: {
    commentId: number
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'news.TranslateComment', params: {
    commentId: number,
    language: string
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'push.RegisterTokenIOS', params: {
    token: string,
    idfa: string
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'push.RegisterTokenAndroid', params: {
    token: string,
    gaid: string
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'push.RegisterTokenWeb', params: {
    token: string
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'push.SendTestAndroid' | 'push.SendTestIOS', params: {
    pushType: string
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'recommendation.Get', params: {
    count: number
  }): Promise<RpcResponse<T> | RpcError>;

  generic<T>(method: 'recommendation.Reject' | 'recommendation.UndoReject', params: {
    id: number
  }): Promise<RpcResponse<T> | RpcError>;
}
