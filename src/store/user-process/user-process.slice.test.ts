import { AuthorizationStatus, Status } from '../../const';
import { UserData } from '../../types/user-data';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userProcess } from './user-process.slice';
import { internet } from 'faker';


describe('UserProcess Slice', () => {
  const setAuthData: UserData = {
    email: internet.email(),
    token: internet.userName(),
    name: internet.userName(),
    avatarUrl: internet.avatar(),
    isPro: false,
  };
  const status = Status.Idle;

  it('must return initial state with empty action', () => {
    const emptyAction = { type: ''};
    const expectedState = {authorizationStatus: AuthorizationStatus.Auth, setAuthData, status};

    const result = userProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('must return default initial state with empty action', () => {
    const emptyAction = { type: ''};
    const expectedState = {authorizationStatus: AuthorizationStatus.Unknown, setAuthData: null, status};

    const result = userProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('must set "Auth" & status "Success" with "checkAuthAction.fulfilled" action', () => {
    const expectedState = { authorizationStatus: AuthorizationStatus.Auth, setAuthData, status: Status.Success };

    const result = userProcess.reducer(undefined, checkAuthAction.fulfilled(setAuthData, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('must set "NoAuth" & status "Error" with "checkAuthAction.rejected" action', () => {
    const initialState = { authorizationStatus: AuthorizationStatus.Unknown, setAuthData, status };
    const expectedState = { authorizationStatus: AuthorizationStatus.NoAuth, setAuthData, status: Status.Error };

    const result = userProcess.reducer(initialState, checkAuthAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('must have status "Loading" with "loginAction.pending" action', () => {
    const initialState = { authorizationStatus: AuthorizationStatus.Unknown, setAuthData, status };
    const expectedState = { authorizationStatus: AuthorizationStatus.Unknown, setAuthData, status: Status.Loading };

    const result = userProcess.reducer(initialState, loginAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('must set "Auth", status "Success" & fill UserData with "loginAction.fulfilled" action', () => {
    const expectedState = { authorizationStatus: AuthorizationStatus.Auth, setAuthData, status: Status.Success };

    const result = userProcess.reducer(undefined, loginAction.fulfilled(setAuthData, '', { login: setAuthData.email, password: 'h7' }));

    expect(result).toEqual(expectedState);
  });

  it('must set "NoAuth" & status "Error" with "loginAction.rejected" action', () => {
    const initialState = { authorizationStatus: AuthorizationStatus.Unknown, setAuthData, status };
    const expectedState = { authorizationStatus: AuthorizationStatus.NoAuth, setAuthData, status: Status.Error };

    const result = userProcess.reducer(initialState, loginAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('must set "NoAuth", status "Success" & empty UserData, with "logoutAction.fulfilled" action', () => {
    const initialState = { authorizationStatus: AuthorizationStatus.Unknown, setAuthData, status };
    const expectedState = { authorizationStatus: AuthorizationStatus.NoAuth, setAuthData: null, status: Status.Success };

    const result = userProcess.reducer(initialState, logoutAction.fulfilled);

    expect(result).toEqual(expectedState);
  });

});
