import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Offer, OfferWithHost } from '../types/offer';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import {
  checkAuthInfo,
  fetchFavorites,
  fetchNeigbouhoodOffers,
  fetchOffer,
  fetchOffers,
  loadReviews,
  requireAuthorization,
  setFullOfferDataLoadingStatus,
  setOffersDataLoadingStatus,
  setOffersNeighbouhoodLoading,
  setReviewsDataLoadingStatus, } from './action';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { redirectToRoute } from './action';
import { Review } from '../types/review';


export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(fetchOffers(data));
  },
);

export const fetchOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'OFFER/fetch',
  async (offerId, {dispatch, extra: api}) => {
    try {
      dispatch(setFullOfferDataLoadingStatus(true));
      const {data} = await api.get<OfferWithHost>(`${APIRoute.Offers}/${offerId}`);
      dispatch(setFullOfferDataLoadingStatus(false));
      dispatch(fetchOffer(data));
    } catch {
      dispatch(setFullOfferDataLoadingStatus(true));
      dispatch(redirectToRoute(AppRoute.NotFound));
      dispatch(setFullOfferDataLoadingStatus(false));
    }
  },
);

export const fetchNeigbouhoodOffersAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'NEIGBOUHOOD/fetch',
  async (offerId, {dispatch, extra: api}) => {
    try {
      dispatch(setOffersNeighbouhoodLoading(true));
      const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
      dispatch(setOffersNeighbouhoodLoading(false));
      dispatch(fetchNeigbouhoodOffers(data));
    } catch {
      dispatch(setOffersNeighbouhoodLoading(true));
      dispatch(redirectToRoute(AppRoute.NotFound));
      dispatch(setOffersNeighbouhoodLoading(false));
    }
  },
);

export const fetchReviewsOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'REVIEWS/fetch',
  async (offerId, { dispatch, extra: api }) => {
    try {
      dispatch(setReviewsDataLoadingStatus(true));
      const { data } = await api.get<Review[]>(`${APIRoute.Reviews}/${offerId}`);
      dispatch(setReviewsDataLoadingStatus(false));
      dispatch(loadReviews(data));
    } catch {
      dispatch(setReviewsDataLoadingStatus(true));
      dispatch(redirectToRoute(AppRoute.NotFound));
      dispatch(setReviewsDataLoadingStatus(false));
    }
  }
);

export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'FAVORITES/fetch',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Favorites);
      dispatch(fetchFavorites(data));
    } catch {
      throw new Error();
    }
  });

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'USER/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(checkAuthInfo(data));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);


export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'USER/login',
  async({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(checkAuthInfo(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
    dispatch(fetchFavoritesAction());
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispath: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'USER/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(checkAuthInfo(null));
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
