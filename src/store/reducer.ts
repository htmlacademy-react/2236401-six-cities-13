import { createReducer } from '@reduxjs/toolkit';
import { OfferWithHost } from '../types/offer';
import { Review } from '../types/review';
import { TRAVEL_CITIES } from '../const';
import { fullOffers } from '../mocks/offers';
import { reviews } from '../mocks/reviews';
import {
  fetchOffers,
  fetchOffer,
  fetchNeigbouhoodOffers,
  fetchFavorites,
  dropOffer,
  setActiveCity,
  fetchReviews
} from './action';

const DEFAULT_CITY = TRAVEL_CITIES[0];

const initialState: {
  // offers: Offer[];
  fullOffers: OfferWithHost[];
  neighbourhoodOffers: OfferWithHost[];
  reviews: Review[];
  offer: OfferWithHost | null;
  favorites: OfferWithHost[];
  activeCity: string;
} = {
  // offers,
  fullOffers,
  neighbourhoodOffers: [],
  reviews: [],
  offer: null,
  favorites: [],
  activeCity: DEFAULT_CITY
};


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchOffers, (state) => {
      state.fullOffers = fullOffers;
    })
    .addCase(fetchOffer, (state, action) => {
      state.offer = state.fullOffers.find((offer) => offer.id === action.payload) ?? null;
    })
    .addCase(fetchNeigbouhoodOffers, (state, action) => {
      state.neighbourhoodOffers = state.fullOffers.filter((item) => state.activeCity === item.city.name).filter((offer) => offer.id !== action.payload).slice(0,3);
    })
    .addCase(fetchReviews, (state) => {
      state.reviews = reviews;
    })
    .addCase(dropOffer, (state) => {
      state.offer = null;
      state.neighbourhoodOffers = [];
    })
    .addCase(setActiveCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(fetchFavorites, (state) => {
      state.favorites = state.fullOffers.filter((offer) => offer.isFavorite);
    });
});

export { reducer };
