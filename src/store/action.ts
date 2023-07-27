import { createAction } from '@reduxjs/toolkit';
import { Offer, OfferWithHost } from '../types/offer';

export const changeCity = createAction('offers/changeCity', (city: string) => ({
  payload: city
}));

export const displayOffers = createAction('offers/displayOffers', (offers: Offer[] | OfferWithHost[]) => ({
  payload: offers
}));
