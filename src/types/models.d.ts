import { EMovieStatus } from '../enums';

export type ShowsModelEpisode = {
  id: number;
  title: string;
  showId: number;
  seasonNumber: number;
  episodeNumber: number;
  airDate: string;
  airDateUTC: string;
  images: string[];
  image: string;
  shortName: string;
  commentsCount: number;
  isSpecial: number;
};

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
  episodes: ShowsModelEpisode[] | null;
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

export interface MovieSearch {
  movie: MovieSearchModel;
  audience: number;
  status: EMovieStatus.finished | EMovieStatus.later;
}
