import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace, Status } from '../../const';
import { UserProcess } from '../../types/state';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  setAuthData: null,
  status: Status.Idle,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.setAuthData = action.payload;
        state.status = Status.Success;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.status = Status.Error;
      })
      .addCase(loginAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.setAuthData = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.status = Status.Success;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.status = Status.Error;
      })
      .addCase(logoutAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.setAuthData = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.status = Status.Success;
      })
      .addCase(logoutAction.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});
