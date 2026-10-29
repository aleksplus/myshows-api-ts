/** Named user lists (`lists.*` `list` param). */
export enum EList {
  FAVORITES = 'favorites',
  IGNORED = 'ignored',
  UNWATCHED = 'unwatched',
  NEXT = 'next',
}

/** User gender (`users.Search` `search.gender`). */
export enum EGender {
  MALE = 'm',
  FEMALE = 'f',
  UNKNOWN = 'x',
}

/** Gender of votes (`shows.Top` `mode` param). */
export enum EGenderVote {
  MALE = 'm',
  FEMALE = 'f',
  ALL = 'all',
}

/** Time-wasted intervals (`users.Search` `search.wasted`). */
export enum ESpentTime {
  NONE = 1,
  HOUR = 2,
  DAY = 3,
  WEEK = 4,
  MONTH = 5,
  YEAR = 6,
}

/** External show id sources (`shows.GetByExternalId` `source`, social `provider`). */
export enum EShowSources {
  TVRAGE = 'tvrage',
  TVMAZE = 'tvmaze',
  THETVDB = 'thetvdb',
  IMDB = 'imdb',
  KINOPOISK = 'kinopoisk',
}

/** Show watch statuses (`manage.SetShowStatus` `status`). */
export enum EShowStatus {
  watching = 'watching',
  later = 'later',
  cancelled = 'cancelled',
  remove = 'remove',
}

/** Movie watch statuses (`manage.SetMovieStatus` `status`, v3 API). */
export enum EMovieStatus {
  finished = 'finished',
  later = 'later',
  remove = 'remove',
}
