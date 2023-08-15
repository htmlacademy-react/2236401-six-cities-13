import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { UserProcess } from '../../types/state';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';

const initialState: UserProcess = {
  autorizationStatus: AuthorizationStatus.Unknown,
  setAuthData: null,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.autorizationStatus = AuthorizationStatus.Auth;
        state.setAuthData = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.autorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.setAuthData = action.payload;
        state.autorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.autorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.setAuthData = null;
        state.autorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
