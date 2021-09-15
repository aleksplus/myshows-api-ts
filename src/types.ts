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

export type Rating = 1 | 2 | 3 | 4 | 5;

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

  profileShows<T>(login: string): Promise<RpcResponse<T[],
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

  generic<P, T = JsonRpcResult<P>>(
    method: Method,
    params: Record<string, unknown>
  ): Promise<T | RpcError>
}
