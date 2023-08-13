import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Offer, OfferWithHost } from '../types/offer';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import {
  setAuthData,
  fetchFavorites,
  fetchNeigbourhoodOffers,
  fetchOffer,
  fetchOffers,
  loadReviews,
  postReview,
  requireAuthorization,
  setFullOfferDataLoadingStatus,
  setOffersDataLoadingStatus,
  setOffersNeighbourhoodLoading,
  setReviewsDataLoadingStatus,
  redirectToRoute} from './action';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { Review, Comment } from '../types/review';
import { toast } from 'react-toastify';


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

export const fetchNeigbourhoodOffersAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'NEIGBOURHOOD/fetch',
  async (offerId, {dispatch, extra: api}) => {
    try {
      dispatch(setOffersNeighbourhoodLoading(true));
      const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
      dispatch(setOffersNeighbourhoodLoading(false));
      dispatch(fetchNeigbourhoodOffers(data));
    } catch {
      dispatch(setOffersNeighbourhoodLoading(true));
      dispatch(redirectToRoute(AppRoute.NotFound));
      dispatch(setOffersNeighbourhoodLoading(false));
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
  },
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
  },
);

export const postReviewsOfferAction = createAsyncThunk<void, Comment, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'REVIEWS/post',
  async ({comment, rating, offerId}, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<Comment>(`${APIRoute.Reviews}/${offerId}`, {comment, rating});
      dispatch(postReview(data));
    } catch {
      toast.warn('Failed to post comment. Please try later');
    }

  },
);

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
      dispatch(setAuthData(data));
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
    dispatch(setAuthData(data));
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
    dispatch(setAuthData(null));
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
