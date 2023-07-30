import { createReducer } from '@reduxjs/toolkit';
import { TRAVEL_CITIES, SortOffersType } from '../const';
import { getOffersByCity } from '../utils';
import { offers } from '../mocks/offers';
import { changeCity, displayOffersByCity, changeSortType, displayOffersBySortType } from './action';
import { InitialState } from '../types/state';

const DEFAULT_CITY = TRAVEL_CITIES[0];
const DEFAULT_SORT_TYPE = SortOffersType.popular;

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: getOffersByCity(DEFAULT_CITY, offers),
  sortType: DEFAULT_SORT_TYPE,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(displayOffersByCity, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(displayOffersBySortType, (state, action) => {
      state.offers = action.payload;
    });
});

export { reducer };
