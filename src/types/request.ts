import type { AxiosInstance } from 'axios';

import { EGender, EList } from '../enums';

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
