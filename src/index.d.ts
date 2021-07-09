import { AxiosInstance } from 'axios';
import {
  Credentials,
  DefaultParams,
  EGenderVote,
  EList,
  EShowSources,
  EShowStatus,
  Method,
  RpcError,
  RpcResponse
} from './types';

export interface IMyShowsList {
  listsShows<T>(
    list: EList,
  ): Promise<RpcResponse<T> & { list: EList }>;

  listsAddShow<T>(id: number): Promise<RpcResponse<T>>;

  listsRemoveShow<T>(id: number): Promise<RpcResponse<T>>;

  listsEpisodes<T>(
    list: EList,
  ): Promise<RpcResponse<T>>;

  listsAddEpisode<T>(id: number, list: EList): Promise<RpcResponse<T>>;

  listsRemoveEpisode<T>(
    id: number,
    list: EList.FAVORITES | EList.IGNORED,
  ): Promise<RpcResponse<T>>;
}

export interface IMyShowsManage {
  manageSetShowStatus<T>(
    id: number,
    status: EShowStatus,
  ): Promise<RpcResponse<T>>;

  manageRateShow<T>(
    id: number,
    rating: number,
  ): Promise<RpcResponse<T>>;

  manageCheckEpisode<T>(
    id: number,
    rating: number,
  ): Promise<RpcResponse<T>>;

  manageUnCheckEpisode<T>(id: number): Promise<RpcResponse<T>>;

  manageRateEpisode<T>(
    id: number,
    rating: number,
  ): Promise<RpcResponse<T>>;

  manageRateEpisodesBulk<T>(
    r1: number[],
    r2: number[],
    r3: number[],
    r4: number[],
    r5: number[],
  ): Promise<RpcResponse<T>>;

  manageSyncEpisodes<T>(
    id: number,
    episodeIds: number[],
  ): Promise<RpcResponse<T>>;

  manageSyncEpisodesDelta<T>(
    id: number,
    checkedIds: number[],
    unCheckedIds: number[],
  ): Promise<RpcResponse<T>>;
}

export interface IMyShowsProfile {
  profileGet<T>(login: string): Promise<RpcResponse<T>>;

  profileFeed<T>(login: string): Promise<RpcResponse<T>>;

  profileFriends<T>(login: string): Promise<RpcResponse<T>>;

  profileFollowers<T>(login: string): Promise<RpcResponse<T>>;

  profileFriendsFeed<T>(): Promise<RpcResponse<T>>;

  profileShows<T>(login: string): Promise<RpcResponse<T>>;

  profileEpisodes<T>(showId: number): Promise<RpcResponse<T>>;

  profileAchievements<T>(): Promise<RpcResponse<T>>;

  profileNewComments<T>(): Promise<RpcResponse<T>>;

}

export interface IMyShowsShows {
  showsGetById<T>(
    id: number,
    withEpisodes: boolean,
  ): Promise<RpcResponse<T>>;

  showsGetByExternalId<T>(
    id: number,
    source: EShowSources,
  ): Promise<RpcResponse<T>>;

  showsSearch<T>(query: string): Promise<RpcResponse<T>>;

  showsSearchByFile<T>(file: string): Promise<RpcResponse<T>>;

  showsIds<T>(fromId: number, count: number): Promise<RpcResponse<T>>;

  showsEpisode<T>(id: number): Promise<RpcResponse<T>>;

  showsGenres<T>(): Promise<RpcResponse<T>>;

  showsTop<T>(
    mode: EGenderVote.ALL,
    count: number,
  ): Promise<RpcResponse<T>>;

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

  usersCount<T>(
    search: Record<string, unknown>,
  ): Promise<RpcResponse<T>>;

  usersFiltersCounters<T>(query: string): Promise<RpcResponse<T, {
    query: string
  }>>;
}

export interface IMyShowsBase {

  credentials: Credentials;
  axios: AxiosInstance;
  defaultParams: DefaultParams;

  constructor(credentials: Credentials): any;

  login(): Promise<RpcError | void>;

  generic<T>(
    method: Method,
    params: Record<string, unknown>,
  ): Promise<RpcResponse<T>>;
}

export interface IMyShows extends IMyShowsBase, IMyShowsUsers, IMyShowsProfile, IMyShowsList, IMyShowsManage, IMyShowsShows {
}
