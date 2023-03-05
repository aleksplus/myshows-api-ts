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

export enum EMovieStatus {
  finished = 'finished',
  later = 'later',
  remove = 'remove',
}
