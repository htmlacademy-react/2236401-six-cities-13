import { createReducer } from '@reduxjs/toolkit';
import { TRAVEL_CITIES } from '../const';
import { getOffersByCity } from '../utils';
import { offers } from '../mocks/offers';
import { changeCity, displayOffers } from './action';
import { InitialState } from '../types/state';

const DEFAULT_CITY = TRAVEL_CITIES[0];

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: getOffersByCity(DEFAULT_CITY, offers),
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(displayOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export { reducer };
