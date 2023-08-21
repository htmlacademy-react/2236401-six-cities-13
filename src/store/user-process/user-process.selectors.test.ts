import { AuthorizationStatus, NameSpace, Status } from '../../const';
import { getAuthCheckedStatus, getAuthorizationStatus, getUserData, getUserStatus } from './user-process.selectors';
import { UserData } from '../../types/user-data';
import { internet } from 'faker';

describe('UserProcess selectors', () => {

  const setAuthData: UserData = {
    email: internet.email(),
    token: internet.userName(),
    name: internet.userName(),
    avatarUrl: internet.avatar(),
    isPro: false,
  };
  const status = Status.Idle;

  it('must return authorization status from state', () => {
    const authorizationStatus = AuthorizationStatus.Auth;
    const state = { authorizationStatus, setAuthData, status };

    const result = getAuthorizationStatus({ [NameSpace.User]: state });

    expect(result).toBe(authorizationStatus);
  });

  it('must return "true" in case of authStatus is "Auth"', () => {
    const authorizationStatus = AuthorizationStatus.Auth;
    const state = { authorizationStatus, setAuthData, status };

    const result = getAuthCheckedStatus({ [NameSpace.User]: state});

    expect(result).toBe(true);
  });

  it('must reurn "false" in case of authStatus is "Uknown"', () => {

    const authorizationStatus = AuthorizationStatus.Unknown;
    const state = { authorizationStatus, setAuthData, status };

    const result = getAuthCheckedStatus({ [NameSpace.User]: state });

    expect(result).toBe(false);
  });


  it('must return set auth data', () => {
    const authorizationStatus = AuthorizationStatus.Auth;
    const state = { authorizationStatus, setAuthData, status };

    const result = getUserData({ [NameSpace.User]: state });

    expect(result).toEqual(setAuthData);
  });

  it('must return status of async action with User/Auth data', () => {
    const authorizationStatus = AuthorizationStatus.Auth;
    const state = { authorizationStatus, setAuthData, status };

    const result = getUserStatus({ [NameSpace.User]: state });

    expect(result).toBe(status);
  });
});
