import { createReducer } from '@reduxjs/toolkit';
import { OfferWithHost } from '../types/offer';
import { Review } from '../types/review';
import { TRAVEL_CITIES, AuthorizationStatus } from '../const';
import {
  loadOffers,
  fetchOffer,
  fetchNeigbouhoodOffers,
  fetchFavorites,
  dropOffer,
  setActiveCity,
  requireAuthorization,
  fetchOffers,
  setError,
  setOffersDataLoadingStatus,
  // loadReviews,
} from './action';

const DEFAULT_CITY = TRAVEL_CITIES[0];

const initialState: {
  fullOffers: OfferWithHost[];
  neighbourhoodOffers: OfferWithHost[];
  reviews: Review[];
  offer: OfferWithHost | null;
  favorites: OfferWithHost[];
  activeCity: string;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  error: string | null;
} = {
  fullOffers: [],
  neighbourhoodOffers: [],
  reviews: [],
  offer: null,
  favorites: [],
  activeCity: DEFAULT_CITY,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  error: null,
};


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchOffers, (state, action) => {
      state.fullOffers = action.payload;
    })
    .addCase(fetchOffer, (state, action) => {
      state.offer = state.fullOffers.find((offer) => offer.id === action.payload) ?? null;
    })
    .addCase(fetchNeigbouhoodOffers, (state, action) => {
      state.neighbourhoodOffers = state.fullOffers.filter((item) => state.activeCity === item.city.name).filter((offer) => offer.id !== action.payload).slice(0,3);
    })
    // .addCase(loadReviews, (state, action) => {
    //   state.reviews = action.payload;
    // })
    .addCase(dropOffer, (state) => {
      state.offer = null;
      state.neighbourhoodOffers = [];
    })
    .addCase(setActiveCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(fetchFavorites, (state) => {
      state.favorites = state.fullOffers.filter((offer) => offer.isFavorite);
    })
    .addCase(loadOffers, (state, action) => {
      state.fullOffers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };
