import { AuthorizationStatus, NameSpace } from '../../const';
import { State } from '../../types/state';
import { UserData } from '../../types/user-data';


export const getAutorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].autorizationStatus;

export const getAuthCheckedStatus = (state: State): boolean => state[NameSpace.User].autorizationStatus !== AuthorizationStatus.Unknown;

export const getUserData = (state: State): UserData | null => state[NameSpace.User].setAuthData;

export const getUserStatus = (state: State): string => state[NameSpace.User].status;
