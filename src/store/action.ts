import { createAction } from '@reduxjs/toolkit';
import { Offer, OfferWithHost } from '../types/offer';
import { SortOffersType } from '../const';

export const changeCity = createAction('offers/changeCity', (city: string) => ({
  payload: city
}));

export const displayOffersByCity = createAction('offers/displayOffersByCity', (offers: Offer[] | OfferWithHost[]) => ({
  payload: offers
}));

export const changeSortType = createAction('offers/changeSortType', (sortType: SortOffersType) => ({
  payload: sortType
}));

export const displayOffersBySortType = createAction('offers/displayOffersBySotType', (offers: Offer[]) => ({
  payload: offers
}));
