import { EMovieStatus } from '../enums';

interface MovieOuterLink {
  title: string;
  description: string;
  source: string;
  url: string;
}

interface KinopoiskEntity {
  kinopoiskId: number | null;
  kinopoiskRating: number | null;
  kinopoiskVoted: number | null;
  kinopoiskUrl: string | null;
}

interface IMDBEntity {
  imdbId: number | null;
  imdbRating: number | null;
  imdbVoted: number | null;
  imdbUrl: string | null;
}

interface OnlineLinks {
  onlineLinks: MovieOuterLink[];
  onlineLinkExclusive: MovieOuterLink | null;
}

interface MovieModelBase extends Partial<KinopoiskEntity>, Partial<IMDBEntity> {
  id: number;
  title: string;
  titleOriginal: string;
  description?: string;
  status: string;
  year: number;
  watchingTotal?: number;
  voted: number;
  rating: number;
  runtime: number;
  image: string;
  genreIds: number[];
}

interface ShowSeason {
  started: string;
  ended: string;
  totalSeasons: number;
  episodes: EpisodeSummary[] | null;
}

export interface ShowsModel extends MovieModelBase, ShowSeason, OnlineLinks {
  country: string;
  countryTitle: string;
  tvrageId: number;
  watching: number;
  runtimeTotal: string;
  images: string[];
  network: {
    id: number;
    title: string;
    country: string;
  };
}

interface MovieImageInfo {
  width: number;
  height: number;
  previewUrl: string;
  blurhash: string;
}

interface MovieModelCountry {
  alias: string;
  title: string;
}

interface MovieModelCompany {
  id: number;
  title: string;
}

export interface MovieModel extends MovieModelBase {
  countries: MovieModelCountry[];
  productionCompanies?: MovieModelCompany[];
  releaseDate: string;
  watched: number;
  runtimeText: string;
  imageInfo: Partial<MovieImageInfo>;
  hasBackgroundImage?: false;
  commentsTotal?: number;
  commentsNew?: number;
}

interface UserMovie {
  id: MovieModel['id'];
  watchStatus: string | null;
  rating: number | null;
  isFavorite: boolean;
  note: string | null;
  watchCount: number;
}

export interface MovieSearchModel extends MovieModel {
  onlineCount: number;
  userMovie: UserMovie;
}

/** Watch statuses a movie can carry in `movies.GetCatalog` results. */
export type EMovieSearchStatus = EMovieStatus.finished | EMovieStatus.later;

export interface MovieSearch {
  movie: MovieSearchModel;
  audience: number;
  status: EMovieSearchStatus;
}

export interface User {
  login?: string;
  avatar?: string;
  wastedTime?: number;
  gender?: string;
  isPro?: boolean;
  isDeleted?: boolean;
}

export interface UserStats {
  watchedEpisodes?: number;
  remainingEpisodes?: number;
  totalEpisodes?: number;
  watchedHours?: number;
  remainingHours?: number;
  totalHours?: number;
  watchedDays?: number;
  remainingDays?: number;
  totalDays?: number;
}

export interface UserRanks {
  fiendsPos?: number;
  fiendsTotal?: number;
}

export interface UserSocial {
  vkontakte?: string;
  twitter?: string;
}

export interface ProfileGetResponse {
  user?: User;
  stats?: UserStats;
  ranks?: UserRanks;
  commentsCount?: number;
  commentsRating?: number;
  proPayedTill?: string;
  social?: UserSocial;
}

export interface Feed {
  id?: number;
  user?: User;
  createdAt?: string;
  type?: string;
  show?: ShowSummary;
  episodes?: EpisodeSummary[];
  rating?: number;
  showStatus?: string;
  commentId?: number;
  achievement?: AchievementSummary;
  affectedUser?: User;
}

export interface ShowSummary {
  id?: number;
  title?: string;
  titleOriginal?: string;
  status?: string;
  totalSeasons?: number;
  year?: number;
  watching?: number;
  voted?: number;
  rating?: number;
  images?: string[];
  image?: string;
  onlineCount?: number;
  promoUrl?: string;
  category?: string;
}

export interface EpisodeSummary {
  id?: number;
  title?: string;
  showId?: number;
  seasonNumber?: number;
  episodeNumber?: number;
  airDate?: string;
  airDateUTC?: string;
  images?: string[];
  image?: string;
  shortName?: string;
  commentsCount?: number;
  isSpecial?: number;
}

export interface AchievementSummary {
  title?: string;
  description?: string;
  image?: string;
  alias?: string;
  key?: string;
  achievedAt?: string;
}

export interface ProfileFriendshipResponse {
  isFriend?: boolean;
  isFollower?: boolean;
}

export interface UserShowSummary {
  show?: ShowSummary;
  watchStatus?: string;
  rating?: number;
  watchCount?: number;
  totalEpisodes?: number;
  watchedEpisodes?: number;
}

export interface UserShowStatus {
  showId?: number;
  watchStatus?: string;
}

export interface UserEpisodeSummary {
  id?: number;
  watchDate?: string;
  rating?: number;
  isMoveAble?: boolean;
}

export interface NoteSummary {
  id?: number;
  text?: string;
  createdAt?: string;
  show?: ShowSummary;
  episode?: EpisodeSummary;
}

export interface ProfileShowResponse {
  id?: number;
  watchStatus?: string;
  rating?: number;
  isFavorite?: boolean;
  note?: NoteSummary;
}

export interface ProfileEpisodeResponse {
  id?: number;
  watchDate?: string;
  rating?: number;
  isMoveAble?: boolean;
  isFavorite?: boolean;
  isIgnored?: boolean;
  note?: NoteSummary;
}

export interface AchievementFriend {
  user?: User;
  achievedAt?: string;
}

export interface ProfileAchievementResponse {
  title?: string;
  description?: string;
  image?: string;
  alias?: string;
  key?: string;
  achievedAt?: string;
  friends?: AchievementFriend[];
}

export interface NewComment {
  id?: number;
  count?: number;
  show?: ShowSummary;
  episode?: EpisodeSummary;
}

export interface NewNewsComment {
  id?: number;
  count?: number;
  news?: NewsSummary;
}

export interface NewsSummary {
  id?: number;
  title?: string;
  alias?: string;
  foreword?: string;
  publishedAt?: string;
  images?: string[];
  image?: string;
  author?: NewsAuthor;
  video?: string;
  commentsTotal?: number;
  commentsNew?: number;
}

export interface NewsAuthor {
  href?: string;
  anchor?: string;
  targetBlank?: boolean;
}

export interface ProfileCountersResponse {
  unwatchedEpisodes?: number;
  newAchievements?: number;
  newCommentReplies?: number;
}

export interface UserProfileSetting {
  title?: string;
  alias?: string;
  isPro?: boolean;
  value?: string;
  options?: Value[];
}

export interface Value {
  title?: string;
  value?: string;
}

export interface UserComment {
  id?: number;
  showId?: number;
  episodeId?: number;
  user?: User;
  comment?: string;
  image?: string;
  parentId?: number;
  createdAt?: string;
  statusId?: number;
  isNew?: boolean;
  isMyPlus?: boolean;
  isMyMinus?: boolean;
  isMyComment?: boolean;
  rating?: number;
  isBad?: boolean;
  isEditable?: boolean;
  editableTill?: string;
  isDeleted?: boolean;
  language?: string;
  episode?: EpisodeSummary;
  show?: ShowSummary;
}

export interface NewsComment {
  id?: number;
  newsId?: number;
  user?: User;
  comment?: string;
  image?: string;
  parentId?: number;
  createdAt?: string;
  statusId?: number;
  isNew?: boolean;
  isMyPlus?: boolean;
  isMyMinus?: boolean;
  isMyComment?: boolean;
  rating?: number;
  isBad?: boolean;
  isEditable?: boolean;
  editableTill?: string;
  isDeleted?: boolean;
  language?: string;
  news?: NewsSummary;
}

export interface ShowFilter {
  title?: string;
  alias?: string;
  values?: ShowFilterValue[];
}

export interface ShowFilterValue {
  title?: string;
  alias?: string;
  count?: number;
  isActive?: boolean;
}

export interface Network {
  id?: number;
  title?: string;
  country?: string;
}

export interface OnlineLink {
  title?: string;
  description?: string;
  source?: string;
  url?: string;
}

export interface ShowDetail {
  id?: number;
  title?: string;
  titleOriginal?: string;
  description?: string;
  totalSeasons?: number;
  status?: string;
  country?: string;
  countryTitle?: string;
  started?: string;
  ended?: string;
  year?: number;
  kinopoiskId?: number;
  kinopoiskRating?: number;
  kinopoiskVoted?: number;
  kinopoiskUrl?: string;
  tvrageId?: number;
  imdbId?: string;
  imdbRating?: number;
  imdbVoted?: number;
  imdbUrl?: string;
  watching?: number;
  watchingTotal?: number;
  voted?: number;
  rating?: number;
  runtime?: number;
  runtimeTotal?: string;
  images?: string[];
  image?: string;
  genreIds?: number[];
  network?: Network;
  episodes?: EpisodeSummary[];
  onlineLinks?: OnlineLink[];
  onlineLinkExclusive?: OnlineLink;
}

export interface EpisodeRating {
  showId?: number;
  episodeId?: number;
  r1?: number;
  r2?: number;
  r3?: number;
  r4?: number;
  r5?: number;
  votes?: number;
  rating?: number;
}

export interface OnlineEmbed {
  embedDesktop?: string;
  embedMobile?: string;
  sourceName?: string;
  sourceUrl?: string;
}

export interface EpisodeDetail {
  id?: number;
  title?: string;
  showId?: number;
  seasonNumber?: number;
  episodeNumber?: number;
  airDate?: string;
  airDateUTC?: string;
  productionNumber?: string;
  sequenceNumber?: number;
  externalUrl?: string;
  images?: string[];
  image?: string;
  shortName?: string;
  totalWatched?: number;
  totalWatchedPercent?: number;
  rating?: EpisodeRating;
  commentsCount?: number;
  onlineLinks?: OnlineLink[];
  onlineLinkExclusive?: OnlineLink;
  onlineEmbed?: OnlineEmbed;
  isSpecial?: boolean;
}

export interface Genre {
  id?: number;
  title?: string;
}

export interface ShowRank {
  rank?: number;
  voted?: number;
  show?: ShowSummary;
}

export interface EpisodeCommentsResponse {
  isTracking?: boolean;
  count?: number;
  newCount?: number;
  hasSpoilers?: boolean;
  comments?: UserComment[];
}

export interface PostEpisodeCommentResponse {
  id?: number;
  showId?: number;
  episodeId?: number;
  user?: User;
  comment?: string;
  image?: string;
  parentId?: number;
  createdAt?: string;
  statusId?: number;
  isNew?: boolean;
  isMyPlus?: boolean;
  isMyMinus?: boolean;
  isMyComment?: boolean;
  rating?: number;
  isBad?: boolean;
  isEditable?: boolean;
  editableTill?: string;
  isDeleted?: boolean;
  language?: string;
  episode?: EpisodeSummary;
  show?: ShowSummary;
}

export interface EpisodeListItem {
  episode?: EpisodeSummary;
  show?: ShowSummary;
}

export interface NewsTag {
  title?: string;
  alias?: string;
}

export interface NewsCategory {
  title?: string;
  alias?: string;
}

export interface NewsDetail {
  id?: number;
  title?: string;
  alias?: string;
  foreword?: string;
  content?: string;
  publishedAt?: string;
  images?: string[];
  image?: string;
  author?: NewsAuthor;
  video?: string;
  mediaSource?: string;
  tags?: NewsTag[];
  category?: NewsCategory;
  commentsTotal?: number;
  commentsNew?: number;
}

export interface NewsCommentsResponse {
  isTracking?: boolean;
  count?: number;
  newCount?: number;
  hasSpoilers?: boolean;
  comments?: NewsComment[];
}

export interface PostNewsCommentResponse {
  id?: number;
  newsId?: number;
  user?: User;
  comment?: string;
  image?: string;
  parentId?: number;
  createdAt?: string;
  statusId?: number;
  isNew?: boolean;
  isMyPlus?: boolean;
  isMyMinus?: boolean;
  isMyComment?: boolean;
  rating?: number;
  isBad?: boolean;
  isEditable?: boolean;
  editableTill?: string;
  isDeleted?: boolean;
  language?: string;
  news?: NewsSummary;
}

export interface NoteSummary {
  id?: number;
  text?: string;
  createdAt?: string;
  show?: ShowSummary;
  episode?: EpisodeSummary;
}

export type NotesSaveResponse = {
  showId: number;
  text: string;
  episodeId?: number;
};

export interface AuthRegisterResponse {
  access_token?: string;
  expires_in?: number;
  token_type?: string;
  scope?: string;
  refresh_token?: string;
}

export interface AuthLoginByAppleIDResponse {
  access_token?: string;
  expires_in?: number;
  token_type?: string;
  scope?: string;
  refresh_token?: string;
}

export interface MetaOpenGraph {
  site?: string;
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  url?: string;
}

export interface MetaTwitter {
  site?: string;
  title?: string;
  description?: string;
  image?: string;
  card?: string;
}

export interface MetaApps {
  facebook?: string;
  itunes?: string;
}

export interface MetaVerification {
  google?: string;
  yandex?: string;
}

export interface SiteMetaResponse {
  pageTitle?: string;
  metaKeywords?: string;
  metaDescription?: string;
  image?: string;
  openGraph?: MetaOpenGraph;
  twitter?: MetaTwitter;
  apps?: MetaApps;
  verification?: MetaVerification;
  robots?: string;
}

export interface SiteCountersResponse {
  users?: number;
  wasted?: number;
  wastedStr?: string;
  wastedAvg?: number;
  wastedAvgStr?: string;
}

export interface PaymentType {
  title?: string;
  alias?: string;
}

export interface Product {
  title?: string;
  alias?: string;
  currency?: string;
  amount?: number;
  expectedPaidTill?: string;
  oldAmount?: number;
}

export interface ShowRecommendation {
  show?: ShowSummary;
  percent?: number;
  friendsWatching?: number;
}
