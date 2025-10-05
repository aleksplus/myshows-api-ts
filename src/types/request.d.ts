import { JSONRPCResponse } from 'json-rpc-2.0';
import { AxiosInstance } from 'axios';

import { 
  MovieModel,
  ProfileGetResponse,
  Feed,
  User,
  ProfileFriendshipResponse,
  UserShowSummary,
  UserShowStatus,
  UserEpisodeSummary,
  ProfileShowResponse,
  ProfileEpisodeResponse,
  ProfileAchievementResponse,
  NewComment,
  NewNewsComment,
  ProfileCountersResponse,
  UserProfileSetting,
  UserComment,
  NewsComment,
  ShowSummary,
  ShowFilter,
  EpisodeDetail,
  Genre,
  ShowRank,
  EpisodeCommentsResponse,
  PostEpisodeCommentResponse,
  NewsCommentsResponse,
  AuthRegisterResponse,
  AuthLoginByAppleIDResponse,
  SiteMetaResponse,
  SiteCountersResponse,
  PaymentType,
  Product,
  ShowRecommendation,
  NewsCategory,
  NotesSaveResponse,
  NoteSummary,
  NewsDetail,
  NewsSummary,
  ShowDetail,
  AchievementSummary
} from './models';
import {
  EGender,
  EGenderVote,
  EList,
  EMovieStatus,
  EShowSources,
  EShowStatus,
} from '../enums';
import { RpcError, RpcResponse } from './rpcUtils';

export type MethodV2 =
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
  | 'manage.ReWatchShow'
  | 'users.Search'
  | 'users.Count'
  | 'users.Filters'
  | 'users.Follow'
  | 'users.UnFollow'
  | 'users.FiltersCounters'
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

export type MethodV3 =
  | 'manage.SetMovieStatus'
  | 'movies.GetCatalog'
  | 'movies.GetById'
  | 'profile.UnwatchedMovies'
  | 'profile.UnwatchedMoviesFilters'
  | 'profile.UnwatchedMoviesCount'
  | 'profile.WatchedMovies'
  | 'profile.WatchedMoviesFilters'
  | 'profile.WatchedMoviesCount';

export type Method = MethodV2 | MethodV3;

export interface EpisodeList {
  list: EList;
}

export interface EpisodeId {
  id: number;
}

export interface EpisodeListWithId extends EpisodeList, EpisodeId {
  list: EList.FAVORITES | EList.IGNORED;
}

export type ShowSearchParams = {
  network: number;
  genre: number;
  country: string;
  year: number;
  watching: number;
  category: string;
  status: string;
  sort: string;
  query: string;
};

export type SearchParams = {
  search: SearchObjectOptions;
};

export type Rating = 1 | 2 | 3 | 4 | 5;

export interface WithId {
  id: number;
}

export interface WithShowId {
  showId: number;
}

export interface WithLoginParam {
  login: string;
}

export interface WithRatingParam<R = Rating> extends WithId {
  rating?: R;
}

export interface WithCountParam extends WithId {
  count: number;
}

export interface WithStatusParam<S> extends WithId {
  status: S;
}

export interface WithQueryParam {
  query: string;
}

export interface WithSearchParam<S> {
  search: S;
  page?: number;
  pageSize?: number;
}

export interface WithMovieStatusParam<S> {
  movieId: number;
  status: S;
}

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

export type SearchObjectOptions = Partial<{
  query: string;
  wasted: number;
  year: number;
  gender: EGender;
}>;

export type QueryParams = Record<string, unknown>;

export interface QueryHandlerParams<P = QueryParams, M = Method> {
  defaultParams: DefaultParams;
  method: M;
  params: P;
  query: AxiosInstance;
  url?: string;
}

export interface IMyShowsList {
  listsShows<T>(list: EList): Promise<RpcResponse<T, { list: EList }>>;

  listsAddShow<T>(id: number): Promise<RpcResponse<T, { id: number }>>;

  listsRemoveShow<T>(id: number): Promise<RpcResponse<T, WithId>>;

  listsEpisodes<T>(list: EList): Promise<RpcResponse<T, { list: EList }>>;

  listsAddEpisode<T>(
    id: number,
    list: EList,
  ): Promise<
    RpcResponse<
      T,
      {
        list: EList.FAVORITES | EList.IGNORED;
        id: number;
      }
    >
  >;

  listsRemoveEpisode<T>(
    id: number,
    list: EList.FAVORITES | EList.IGNORED,
  ): Promise<
    RpcResponse<
      T,
      {
        list: EList.FAVORITES | EList.IGNORED;
        id: number;
      }
    >
  >;
}

export interface IMyShowsManageV3 {
  manageSetShowStatus<T>(
    id: number,
    status: EShowStatus,
  ): Promise<RpcResponse<T, WithStatusParam<EShowStatus>>>;

  manageSetMovieStatus<T>(
    id: number,
    status: EMovieStatus,
  ): Promise<RpcResponse<T, WithMovieStatusParam<EMovieStatus>>>;
}

export interface IMyShowsManage extends IMyShowsManageV3 {
  manageRateShow<T, R = Rating>(
    id: number,
    rating: R,
  ): Promise<RpcResponse<T, WithRatingParam<R>>>;

  manageCheckEpisode<T, R = Rating>(
    id: number,
    rating?: R,
  ): Promise<
    RpcResponse<
      T,
      {
        id: number;
        rating?: R;
      }
    >
  >;

  manageUnCheckEpisode<T>(
    id: number,
  ): Promise<RpcResponse<T, WithId>>;

  manageRateEpisode<T, R = Rating>(
    id: number,
    rating: Rating,
  ): Promise<RpcResponse<T, WithRatingParam<R>>>;

  manageRateEpisode<T, R = Rating>(
    id: number,
    rating: R,
  ): Promise<RpcResponse<T, WithRatingParam<R>>>;

  manageRateEpisodesBulk<T, R = Rating>(
    id: number,
    r1: R[],
    r2: R[],
    r3: R[],
    r4: R[],
    r5: R[],
  ): Promise<RpcResponse<T, WithId>>;

  manageSyncEpisodes<T>(
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
  >;

  manageSyncEpisodesDelta<T>(
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
  >;

  manageReWatchShow(id: number, count: number): Promise<RpcResponse>;
}

export interface IMyShowsProfile {
  profileGet<T = ProfileGetResponse>(login: string): Promise<RpcResponse<T, WithLoginParam>>;

  profileFeed<T = Feed[]>(login: string): Promise<RpcResponse<T, WithLoginParam>>;

  profileFriends<T = User[]>(login: string): Promise<RpcResponse<T, WithLoginParam>>;

  profileFollowers<T = User[]>(login: string): Promise<RpcResponse<T, WithLoginParam>>;

  profileFriendship<T = ProfileFriendshipResponse>(login: string): Promise<RpcResponse<T, WithLoginParam>>;

  profileFriendsFeed<T = Feed[]>(): Promise<RpcResponse<T>>;

  profileShows<T = UserShowSummary[]>(login: string): Promise<RpcResponse<T, WithLoginParam>>;

  profileShowStatuses<T = UserShowStatus[]>(showIds?: number[]): Promise<RpcResponse<T, { showIds?: number[] }>>;

  profileShow<T = ProfileShowResponse>(showId: number): Promise<RpcResponse<T, WithShowId>>;

  profileEpisodes<T = UserEpisodeSummary[]>(showId: number): Promise<RpcResponse<T, WithShowId>>;

  profileEpisode<T = ProfileEpisodeResponse>(episodeId: number): Promise<RpcResponse<T, { episodeId: number }>>;

  profileAchievements<T = AchievementSummary[]>(): Promise<RpcResponse<T>>;

  profileAchievement<T = ProfileAchievementResponse>(alias: string, key: string): Promise<RpcResponse<T, { alias: string; key: string }>>;

  profileNewComments<T = NewComment[]>(): Promise<RpcResponse<T>>;

  profileNewNewsComments<T = NewNewsComment[]>(): Promise<RpcResponse<T>>;

  profileNewCommentReplies<T = NewComment[]>(): Promise<RpcResponse<T>>;

  profileNewNewsCommentReplies<T = NewNewsComment[]>(): Promise<RpcResponse<T>>;

  profileCounters<T = ProfileCountersResponse>(): Promise<RpcResponse<T>>;

  profileSettings<T = UserProfileSetting[]>(): Promise<RpcResponse<T>>;

  profileSaveSettings<T = boolean>(settings: Array<{ alias: string; value: string }>): Promise<RpcResponse<T, { settings: Array<{ alias: string; value: string }> }>>;

  profileEpisodeCommentsCount<T = number>(login?: string): Promise<RpcResponse<T, {}> | RpcResponse<T, WithLoginParam>>;

  profileEpisodeComments<T = UserComment[]>(login: string, page?: number, pageSize?: number, sort?: string): Promise<RpcResponse<T, WithLoginParam & { page: number; pageSize: number; sort: string }>>;

  profileNewsCommentsCount<T = number>(login?: string): Promise<RpcResponse<T, {}> | RpcResponse<T, WithLoginParam>>;

  profileNewsComments<T = NewsComment[]>(login: string, page?: number, pageSize?: number, sort?: string): Promise<RpcResponse<T, WithLoginParam & { page: number; pageSize: number; sort: string }>>;

  profileMarkCommentsAsViewed<T = boolean>(): Promise<RpcResponse<T>>;
}

export interface IMyShowsMovies {
  moviesSearch<T>(query: string): Promise<RpcResponse<T>>;

  moviesGetById(id: number): Promise<RpcResponse<MovieModel>>;
}

export interface IMyShowsShows {
  showsGet<T = ShowSummary[]>(search: Partial<ShowSearchParams>, page?: number, pageSize?: number): Promise<RpcResponse<T, { search: Partial<ShowSearchParams>; page: number; pageSize: number }>>;

  showsCount<T = number>(search: Partial<ShowSearchParams>): Promise<RpcResponse<T, { search: Partial<ShowSearchParams> }>>;

  showsFilters<T = ShowFilter[]>(search: Partial<ShowSearchParams>): Promise<RpcResponse<T, { search: Partial<ShowSearchParams> }>>;

  showsGetById<T = ShowDetail>(id: number, withEpisodes?: boolean): Promise<RpcResponse<T, { showId: number; withEpisodes: boolean }>>;

  showsGetByExternalId<T = ShowDetail>(
    id: number,
    source: EShowSources,
  ): Promise<RpcResponse<T, { id: number; source: EShowSources }>>;

  showsSearch<T = ShowDetail[]>(query: string): Promise<RpcResponse<T, WithQueryParam>>;

  showsSearchByFile<T = string[]>(file: string): Promise<RpcResponse<T, { file: string }>>;

  showsIds<T = number[]>(fromId: number, count: number): Promise<RpcResponse<T, { fromId: number; count: number }>>;

  showsEpisode<T = EpisodeDetail>(id: number): Promise<RpcResponse<T, { id: number }>>;

  showsGenres<T = Genre[]>(): Promise<RpcResponse<T>>;

  showsTop<T = ShowRank[]>(mode?: EGenderVote, count?: number): Promise<RpcResponse<T, { mode: EGenderVote; count: number }>>;

  showsViewEpisodeComments<T = boolean>(id: number): Promise<RpcResponse<T, { episodeId: number }>>;

  showsTrackEpisodeComments<T = boolean>(
    id: number,
    isTracked: boolean,
  ): Promise<RpcResponse<T, { episodeId: number; isTracked: boolean }>>;

  showsVoteEpisodeComment<T = number>(
    id: number,
    isPositive: boolean,
  ): Promise<RpcResponse<T, { commentId: number; isPositive: boolean }>>;

  showsEpisodeComments<T = EpisodeCommentsResponse>(id: number): Promise<RpcResponse<T, { episodeId: number }>>;

  showsPostEpisodeComment<T = PostEpisodeCommentResponse>(
    id: number,
    text: string,
    imageOrParent?: string | number,
    parentId?: number,
  ): Promise<RpcResponse<T>>;

  showsUpdateEpisodeComment<T = boolean>(
    id: number,
    text: string,
    image?: string,
    deleteImage?: boolean,
  ): Promise<RpcResponse<T, { commentId: number; text: string; image?: string; deleteImage: boolean }>>;

  showsDeleteEpisodeComment<T = boolean>(
    id: number,
  ): Promise<RpcResponse<T, { commentId: number }>>;

  showsTranslateEpisodeComment<T = string>(
    id: number,
    language: string,
  ): Promise<RpcResponse<T, { commentId: number; language: string }>>;
}

export interface IMyShowsUsers {
  usersSearch<T = User[]>(
    search: SearchObjectOptions,
    page?: number,
    pageSize?: number,
  ): Promise<RpcResponse<T, WithSearchParam<SearchObjectOptions>>>;

  usersCount<T = number>(search: SearchObjectOptions): Promise<RpcResponse<T, WithSearchParam<SearchObjectOptions>>>;

  usersFiltersCounters<T = ShowFilter[]>(
    query: string,
  ): Promise<RpcResponse<T, WithSearchParam<WithQueryParam>>>;

  usersFollow<T = boolean>(login: string): Promise<RpcResponse<T, WithLoginParam>>;

  usersUnFollow<T = boolean>(login: string): Promise<RpcResponse<T, WithLoginParam>>;

  usersFilters<T = ShowFilter[]>(search: SearchObjectOptions): Promise<RpcResponse<T, WithSearchParam<SearchObjectOptions>>>;
}

export interface IMyShowsNews {
  newsGet<T = NewsSummary[]>(
    search: Partial<{
      showId: number;
      episodeId: number;
      category: string;
      tag: string;
      isTrailer: boolean;
      similarNewsId: number;
      forCurrentUser: boolean;
    }>,
    page?: number,
    pageSize?: number,
  ): Promise<RpcResponse<T, { search: Partial<typeof search>; page: number; pageSize: number }>>;

  newsCount<T = number>(
    search: Partial<{
      showId: number;
      episodeId: number;
      category: string;
      tag: string;
      isTrailer: boolean;
      similarNewsId: number;
      forCurrentUser: boolean;
    }>,
  ): Promise<RpcResponse<T, { search: Partial<typeof search> }>>;

  newsGetById<T = NewsDetail>(newsId: number): Promise<RpcResponse<T, { newsId: number }>>;

  newsCategories<T = NewsCategory[]>(): Promise<RpcResponse<T>>;

  newsComments<T = NewsCommentsResponse>(newsId: number): Promise<RpcResponse<T, { newsId: number }>>;

  newsViewComments<T = boolean>(newsId: number): Promise<RpcResponse<T, { newsId: number }>>;

  newsTrackComments<T = boolean>(newsId: number, isTracked: boolean): Promise<RpcResponse<T, { newsId: number; isTracked: boolean }>>;

  newsVoteComment<T = number>(commentId: number, isPositive: boolean): Promise<RpcResponse<T, { commentId: number; isPositive: boolean }>>;

  newsPostComment<T = NewsComment>(
    newsId: number,
    text: string,
    image?: string,
    parentCommentId?: number,
  ): Promise<RpcResponse<T, { newsId: number; text: string; image?: string; parentCommentId?: number }>>;

  newsUpdateComment<T = boolean>(
    commentId: number,
    text: string,
    image?: string,
    deleteImage?: boolean,
  ): Promise<RpcResponse<T, { commentId: number; text: string; image?: string; deleteImage: boolean }>>;

  newsDeleteComment<T = boolean>(commentId: number): Promise<RpcResponse<T, { commentId: number }>>;

  newsTranslateComment<T = string>(commentId: number, language: string): Promise<RpcResponse<T, { commentId: number; language: string }>>;
}

export interface IMyShowsNotes {
  notesGet<T = NoteSummary[]>(
    search: { isShow: boolean; isEpisode: boolean },
    page?: number,
    pageSize?: number,
  ): Promise<RpcResponse<T, { search: { isShow: boolean; isEpisode: boolean }; page: number; pageSize: number }>>;

  notesCount<T = number>(
    search: { isShow: boolean; isEpisode: boolean },
  ): Promise<RpcResponse<T, { search: { isShow: boolean; isEpisode: boolean } }>>;

  notesSave<T = NotesSaveResponse>(
    showId: number,
    text: string,
    episodeId?: number,
  ): Promise<RpcResponse<T, { showId: number; text: string; episodeId?: number }>>;

  notesDelete<T = boolean>(episodeId: number): Promise<RpcResponse<T, EpisodeId>>;

  notesRestore<T = boolean>(episodeId: number): Promise<RpcResponse<T, EpisodeId>>;
}

export interface IMyShowsAuth {
  authRegister<T = AuthRegisterResponse>(
    clientId: string,
    sig: string,
    login: string,
    email: string,
    password: string,
  ): Promise<RpcResponse<T, { clientId: string; sig: string; login: string; email: string; password: string }>>;

  authLoginByAppleID<T = AuthLoginByAppleIDResponse>(
    clientId: string,
    sig: string,
    identityToken: string,
  ): Promise<RpcResponse<T, { clientId: string; sig: string; identityToken: string }>>;

  authUnlinkSocialProfile<T = boolean>(provider: EShowSources): Promise<RpcResponse<T, { provider: EShowSources }>>;

  authLinkSocialProfile<T = string>(
    provider: EShowSources,
    returnUrl: string,
  ): Promise<RpcResponse<T, { provider: EShowSources; returnUrl: string }>>;
}

export interface IMyShowsIAP {
  iapValidateReceiptIOS<T = boolean>(
    receiptData: string,
    transactionId: string,
    isSandbox: boolean,
  ): Promise<RpcResponse<T, { receiptData: string; transactionId: string; isSandbox: boolean }>>;

  iapValidateReceiptAndroid<T = boolean>(payload: string): Promise<RpcResponse<T, { payload: string }>>;
}

export interface IMyShowsSite {
  siteMeta<T = SiteMetaResponse>(url: string): Promise<RpcResponse<T, { url: string }>>;

  siteCounters<T = SiteCountersResponse>(): Promise<RpcResponse<T>>;

  siteShowsPopular<T = ShowSummary[]>(count?: number): Promise<RpcResponse<T, { count: number }>>;

  siteShowsOnline<T = ShowSummary[]>(count?: number): Promise<RpcResponse<T, { count: number }>>;

  siteShowsOnlinePromo<T = ShowSummary[]>(count?: number): Promise<RpcResponse<T, { count: number }>>;

  siteTopEpisodeComments<T = NewComment[]>(episodeCount?: number, days?: number): Promise<RpcResponse<T, { episodeCount: number; days: number }>>;

  sitePaymentTypes<T = PaymentType[]>(): Promise<RpcResponse<T>>;

  siteProducts<T = Product[]>(): Promise<RpcResponse<T>>;

  siteCreateProTransaction<T = string>(
    product: string,
    paymentType: string,
  ): Promise<RpcResponse<T, { product: string; paymentType: string }>>;
}

export interface IMyShowsPush {
  pushRegisterTokenIOS<T = boolean>(token: string, idfa: string): Promise<RpcResponse<T, { token: string; idfa: string }>>;

  pushRegisterTokenAndroid<T = boolean>(token: string, gaid: string): Promise<RpcResponse<T, { token: string; gaid: string }>>;

  pushRegisterTokenWeb<T = boolean>(token: string): Promise<RpcResponse<T, { token: string }>>;

  pushSendTestAndroid<T = boolean>(pushType: string): Promise<RpcResponse<T, { pushType: string }>>;

  pushSendTestIOS<T = boolean>(pushType: string): Promise<RpcResponse<T, { pushType: string }>>;
}

export interface IMyShowsRecommendation {
  recommendationGet<T = ShowRecommendation[]>(count?: number): Promise<RpcResponse<T, { count: number }>>;

  recommendationReject<T = boolean>(id: number): Promise<RpcResponse<T, EpisodeId>>;

  recommendationUndoReject<T = boolean>(id: number): Promise<RpcResponse<T, EpisodeId>>;
}

export interface IMyShowsBase {
  defaultParams: DefaultParams;

  login(): Promise<RpcError | void>;

  loginV3(): Promise<RpcError | void>;

  generic<P, T = JSONRPCResponse>(
    method: Method,
    params: Record<string, unknown>,
  ): Promise<RpcResponse<T | RpcError, P>>;
}

export interface IMyShows
  extends IMyShowsUsers,
    IMyShowsProfile,
    IMyShowsList,
    IMyShowsManage,
    IMyShowsShows,
    IMyShowsMovies,
    IMyShowsNews,
    IMyShowsNotes,
    IMyShowsAuth,
    IMyShowsIAP,
    IMyShowsSite,
    IMyShowsPush,
    IMyShowsRecommendation,
    IMyShowsBase {}
