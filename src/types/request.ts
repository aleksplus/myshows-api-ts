import { JSONRPCResponse } from 'json-rpc-2.0';
import { AxiosInstance } from 'axios';

import { MovieModel } from './models';
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

  manageUnCheckEpisode<T, R = Rating>(
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
}

export interface IMyShowsProfile {
  profileGet<T>(login: string): Promise<RpcResponse<T, WithLoginParam>>;

  profileFeed<T>(login: string): Promise<RpcResponse<T, WithLoginParam>>;

  profileFriends<T>(login: string): Promise<RpcResponse<T, WithLoginParam>>;

  profileFollowers<T>(login: string): Promise<RpcResponse<T, WithLoginParam>>;

  profileFriendsFeed<T>(): Promise<RpcResponse<T>>;

  profileShows<T>(login: string): Promise<RpcResponse<T[], WithLoginParam>>;

  profileEpisodes<T>(showId: number): Promise<RpcResponse<T, WithShowId>>;

  profileAchievements<T>(): Promise<RpcResponse<T>>;

  profileNewComments<T>(): Promise<RpcResponse<T>>;
}

export interface IMyShowsMovies {
  moviesSearch<T>(query: string): Promise<RpcResponse<T>>;

  moviesGetById(id: number): Promise<RpcResponse<MovieModel>>;
}

export interface IMyShowsShows {
  showsGetById<T>(id: number, withEpisodes: boolean): Promise<RpcResponse<T>>;

  showsGetByExternalId<T>(
    id: number,
    source: EShowSources,
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
    isTracked: boolean,
  ): Promise<RpcResponse<T>>;

  showsVoteEpisodeComment<T>(
    id: number,
    isPositive: boolean,
  ): Promise<RpcResponse<T>>;

  showsPostEpisodeComment<T>(
    id: number,
    text: string,
    parentId: number,
  ): Promise<RpcResponse<T>>;

  showsTranslateEpisodeComment<T>(
    id: number,
    language: string,
  ): Promise<RpcResponse<T>>;
}

export interface IMyShowsUsers {
  usersSearch<T>(
    search: Record<string, unknown>,
    page: number,
    pageSize: number,
  ): Promise<RpcResponse<T>>;

  usersCount<T>(search: Record<string, unknown>): Promise<RpcResponse<T>>;

  usersFiltersCounters<T>(
    query: string,
  ): Promise<RpcResponse<T, WithSearchParam<WithQueryParam>>>;
}

export interface IMyShowsBase {
  defaultParams: DefaultParams;

  login(): Promise<RpcError | void>;

  loginV3(): Promise<RpcError | void>;

  generic<P, T = JSONRPCResponse>(
    method: Method,
    params: Record<string, unknown>,
  ): Promise<T | RpcError>;
}

export interface IMyShows
  extends IMyShowsUsers,
    IMyShowsProfile,
    IMyShowsList,
    IMyShowsManage,
    IMyShowsShows,
    IMyShowsMovies,
    IMyShowsBase {}
