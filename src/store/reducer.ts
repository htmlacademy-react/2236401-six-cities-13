import { createReducer } from '@reduxjs/toolkit';
import { Offer, OfferWithHost } from '../types/offer';
import { Review } from '../types/review';
import { UserData } from '../types/user-data';
import { TRAVEL_CITIES, AuthorizationStatus } from '../const';
import {
  fetchOffer,
  fetchNeigbourhoodOffers,
  fetchFavorites,
  dropOffer,
  setActiveCity,
  requireAuthorization,
  fetchOffers,
  setOffersDataLoadingStatus,
  setAuthData,
  loadReviews,
  setFullOfferDataLoadingStatus,
  setOffersNeighbourhoodLoading,
  setReviewsDataLoadingStatus,
} from './action';

const DEFAULT_CITY = TRAVEL_CITIES[0];
export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error'
}

const initialState: {
  offers: Offer[];
  neighbourhoodOffers: Offer[] | null;
  reviews: Review[] | null;
  offer: OfferWithHost | null;
  favorites: Offer[];
  activeCity: string;
  userData: UserData | null;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  isFullOfferDataLoading: boolean;
  isOffersNeighbourhoodLoading: boolean;
  isReviewsDataLoading: boolean;
} = {
  offers: [],
  neighbourhoodOffers: [],
  reviews: [],
  offer: null,
  favorites: [],
  activeCity: DEFAULT_CITY,
  userData: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  isFullOfferDataLoading: false,
  isOffersNeighbourhoodLoading: false,
  isReviewsDataLoading: false,
};


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(fetchOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(fetchNeigbourhoodOffers, (state, action) => {
      state.neighbourhoodOffers = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(dropOffer, (state) => {
      state.offer = null;
      state.neighbourhoodOffers = [];
    })
    .addCase(setActiveCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(fetchFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(setFullOfferDataLoadingStatus, (state, action) => {
      state.isFullOfferDataLoading = action.payload;
    })
    .addCase(setOffersNeighbourhoodLoading, (state, action) => {
      state.isOffersNeighbourhoodLoading = action.payload;
    })
    .addCase(setReviewsDataLoadingStatus, (state, action) => {
      state.isReviewsDataLoading = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setAuthData, (state, action) => {
      state.userData = action.payload;
    });
});

export { reducer };
