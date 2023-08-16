import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Offers } from '../../types/state';
import { NameSpace, TRAVEL_CITIES } from '../../const';
import { fetchOffersAction,
  fetchFullOfferAction,
  fetchNeigbourhoodOffersAction,
  fetchFavoritesAction,
} from '../api-actions';
import { toast } from 'react-toastify';

const DEFAULT_CITY = TRAVEL_CITIES[0];

const initialState: Offers = {
  offers: [],
  fullOffer: null,
  neigbourhoodOffers: [],
  favorites: [],
  isOffersDataLoading: false,
  isFullOfferDataLoading: false,
  isOffersNeighbourhoodLoading: false,
  activeCity: DEFAULT_CITY,
  hasError: false,
};

export const offers = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    dropOffer: (state) => {
      state.fullOffer = null;
      state.neigbourhoodOffers = [];
    },
    setActiveCity: (state, action: PayloadAction<string>) => {
      state.activeCity = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        toast.warn('Failed to fetch offers. Please, try again later');
      })
      .addCase(fetchFullOfferAction.pending, (state) => {
        state.isFullOfferDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchFullOfferAction.fulfilled, (state, action) => {
        state.fullOffer = action.payload;
        state.isFullOfferDataLoading = false;
      })
      .addCase(fetchFullOfferAction.rejected, (state) => {
        state.isFullOfferDataLoading = false;
        state.hasError = true;
        // toast.warn('Failed to fetch offer. Please, try again later');
      })
      .addCase(fetchNeigbourhoodOffersAction.pending, (state) => {
        state.isOffersNeighbourhoodLoading = true;
      })
      .addCase(fetchNeigbourhoodOffersAction.fulfilled, (state, action) => {
        state.neigbourhoodOffers = action.payload;
        state.isOffersNeighbourhoodLoading = false;
      })
      .addCase(fetchNeigbourhoodOffersAction.rejected, (state) => {
        state.isOffersNeighbourhoodLoading = false;
        // toast.warn('Failed to fetch offers near by. Please, try again later');
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
      });
  }
});

export const { dropOffer, setActiveCity} = offers.actions;
