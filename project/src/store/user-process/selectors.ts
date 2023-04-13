import { NameSpace, AuthorizationStatus, FetchStatus } from '../../const/const';
import { State } from '../../types/state';
import { UserData } from '../../types/user-data';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[NameSpace.User].authorizationStatus;

export const getInfo = (state: State): UserData | null =>
  state[NameSpace.User].info;

export const getAuthCheckedStatus = (state: State): FetchStatus =>
  state[NameSpace.User].fetchStatus;
