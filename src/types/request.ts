import type { AxiosInstance } from 'axios';

import { EGender, EGenderVote, EList, EMovieStatus, EShowSources, EShowStatus, ESpentTime } from '../enums';

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

/** Lists that items can be added to or removed from (`lists.Add*` / `lists.Remove*`). */
export type EManagedList = EList.FAVORITES | EList.IGNORED;

export interface EpisodeId {
  id: number;
}

export interface EpisodeListWithId extends EpisodeList, EpisodeId {
  list: EManagedList;
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

/** Gender filter for `shows.Top`; accepts raw strings alongside `EGenderVote` members. */
export type ShowTopMode = EGenderVote | 'all' | 'm' | 'f';

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
  params: Record<string, unknown>;
  id: number;
};

export type SearchObjectOptions = Partial<{
  query: string;
  wasted: ESpentTime;
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

/**
 * Maps every supported RPC method to its params object — the single source
 * of truth used by `MyShowsCore.generic()`. Field optionality mirrors the
 * API spec (https://api.myshows.me/shared/doc/swagger.json).
 */
export interface MethodParams {
  // profile
  'profile.Get': { login?: string };
  'profile.Feed': { login?: string };
  'profile.Friends': { login?: string };
  'profile.Followers': { login?: string };
  'profile.Friendship': WithLoginParam;
  'profile.FriendsFeed': object;
  'profile.Shows': { login?: string };
  'profile.ShowStatuses': { showIds?: number[] };
  'profile.Episodes': WithShowId;
  'profile.Show': WithShowId;
  'profile.Episode': { episodeId: number };
  'profile.Achievements': { login?: string; withPublic?: boolean };
  'profile.Achievement': { alias: string; key: string };
  'profile.NewComments': object;
  'profile.NewNewsComments': object;
  'profile.NewCommentReplies': object;
  'profile.NewNewsCommentReplies': object;
  'profile.Counters': object;
  'profile.Settings': object;
  'profile.SaveSettings': { settings: Array<{ alias: string; value: string }> };
  'profile.EpisodeCommentsCount': { login?: string };
  'profile.EpisodeComments': { login?: string; page?: number; pageSize?: number; sort?: string };
  'profile.NewsCommentsCount': { login?: string };
  'profile.NewsComments': { login?: string; page?: number; pageSize?: number; sort?: string };
  'profile.MarkCommentsAsViewed': object;
  // shows
  'shows.Get': { search: Partial<ShowSearchParams>; page?: number; pageSize?: number };
  'shows.Count': { search: Partial<ShowSearchParams> };
  'shows.Filters': { search: Partial<ShowSearchParams> };
  'shows.GetById': { showId: number; withEpisodes?: boolean };
  'shows.GetByExternalId': { id: number; source: EShowSources };
  'shows.Search': WithQueryParam;
  'shows.SearchByFile': { file: string };
  'shows.Ids': { fromId: number; count?: number };
  'shows.Episode': EpisodeId;
  'shows.Genres': object;
  'shows.Top': { mode?: ShowTopMode; count?: number };
  'shows.EpisodeComments': { episodeId: number };
  'shows.ViewEpisodeComments': { episodeId: number };
  'shows.TrackEpisodeComments': { episodeId: number; isTracked: boolean };
  'shows.VoteEpisodeComment': { commentId: number; isPositive: boolean };
  'shows.PostEpisodeComment': { episodeId: number; text: string; image?: string; parentCommentId?: number };
  'shows.UpdateEpisodeComment': { commentId: number; text: string; image?: string; deleteImage?: boolean };
  'shows.DeleteEpisodeComment': { commentId: number };
  'shows.TranslateEpisodeComment': { commentId: number; language?: string };
  // lists
  'lists.Episodes': { list: EList };
  'lists.Shows': { list: EList };
  'lists.AddEpisode': { id: number; list: EManagedList };
  'lists.RemoveEpisode': { id: number; list: EManagedList };
  'lists.AddShow': { id: number; list: EManagedList };
  'lists.RemoveShow': { id: number; list: EManagedList };
  // manage
  'manage.SetShowStatus': { id: number; status: EShowStatus };
  'manage.RateShow': { id: number; rating: Rating };
  'manage.CheckEpisode': { id: number; rating?: Rating };
  'manage.UnCheckEpisode': EpisodeId;
  'manage.RateEpisode': { id: number; rating: Rating };
  'manage.RateEpisodesBulk': { r1: number[]; r2: number[]; r3: number[]; r4: number[]; r5: number[] };
  'manage.SyncEpisodes': { showId: number; episodeIds: number[] };
  'manage.SyncEpisodesDelta': { showId: number; checkedIds: number[]; unCheckedIds: number[] };
  'manage.MoveEpisodeDate': { episodeId: number; shiftDays: number };
  'manage.ReWatchShow': WithCountParam;
  // users
  'users.Search': { search?: SearchObjectOptions; page?: number; pageSize?: number };
  'users.Count': { search?: SearchObjectOptions };
  'users.Filters': { search?: SearchObjectOptions };
  'users.Follow': WithLoginParam;
  'users.UnFollow': WithLoginParam;
  'users.FiltersCounters': WithSearchParam<WithQueryParam>;
  // notes
  'notes.Get': { search?: { isShow?: boolean; isEpisode?: boolean }; page?: number; pageSize?: number };
  'notes.Count': { search?: { isShow?: boolean; isEpisode?: boolean } };
  'notes.Save': { showId: number; text: string; episodeId?: number };
  'notes.Delete': EpisodeId;
  'notes.Restore': EpisodeId;
  // auth
  'auth.Register': { clientId: string; sig: string; login: string; email: string; password: string };
  'auth.LoginByAppleID': { clientId: string; sig: string; identityToken: string };
  'auth.UnlinkSocialProfile': { provider: EShowSources };
  'auth.LinkSocialProfile': { provider: EShowSources; returnUrl: string };
  // in-app purchases
  'iap.ValidateReceiptIOS': { receiptData: string; transactionId: string; isSandbox?: boolean };
  'iap.ValidateReceiptAndroid': { payload: string };
  // site
  'site.Meta': { url: string };
  'site.Counters': object;
  'site.ShowsPopular': { count?: number };
  'site.ShowsOnline': { count?: number };
  'site.ShowsOnlinePromo': { count?: number };
  'site.TopEpisodeComments': { episodeCount?: number; days?: number };
  'site.PaymentTypes': object;
  'site.Products': object;
  'site.CreateProTransaction': { product: string; paymentType: string };
  // news
  'news.Get': {
    search?: Partial<{
      showId: number;
      episodeId: number;
      category: string;
      tag: string;
      isTrailer: boolean;
      similarNewsId: number;
      forCurrentUser: boolean;
    }>;
    page?: number;
    pageSize?: number;
  };
  'news.Count': {
    search?: Partial<{
      showId: number;
      episodeId: number;
      category: string;
      tag: string;
      isTrailer: boolean;
      similarNewsId: number;
      forCurrentUser: boolean;
    }>;
  };
  'news.GetById': { newsId: number };
  'news.Categories': object;
  'news.Comments': { newsId: number };
  'news.ViewComments': { newsId: number };
  'news.TrackComments': { newsId: number; isTracked: boolean };
  'news.VoteComment': { commentId: number; isPositive: boolean };
  'news.PostComment': { newsId: number; text: string; image?: string; parentCommentId?: number };
  'news.UpdateComment': { commentId: number; text: string; image?: string; deleteImage?: boolean };
  'news.DeleteComment': { commentId: number };
  'news.TranslateComment': { commentId: number; language?: string };
  // push
  'push.RegisterTokenIOS': { token: string; idfa?: string };
  'push.RegisterTokenAndroid': { token: string; gaid?: string };
  'push.RegisterTokenWeb': { token: string };
  'push.SendTestAndroid': { pushType: string };
  'push.SendTestIOS': { pushType: string };
  // recommendations
  'recommendation.Get': { count?: number };
  'recommendation.Reject': EpisodeId;
  'recommendation.UndoReject': EpisodeId;
  // v3 only
  'manage.SetMovieStatus': WithMovieStatusParam<EMovieStatus>;
  'movies.GetCatalog': WithSearchParam<WithQueryParam>;
  'movies.GetById': { movieId: number };
  'profile.UnwatchedMovies': object;
  'profile.UnwatchedMoviesFilters': object;
  'profile.UnwatchedMoviesCount': object;
  'profile.WatchedMovies': object;
  'profile.WatchedMoviesFilters': object;
  'profile.WatchedMoviesCount': object;
}
