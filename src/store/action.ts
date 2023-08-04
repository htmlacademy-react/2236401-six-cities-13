import { createAction } from '@reduxjs/toolkit';
import { OfferWithHost } from '../types/offer';
import { AuthorizationStatus } from '../const';


export const loadOffers = createAction<OfferWithHost[]>('OFFERS/fetch');

export const fetchOffers = createAction('DATA/fetchOffers', (fullOffers :OfferWithHost[]) => ({payload: fullOffers}));

export const fetchOffer = createAction<OfferWithHost['id']>('OFFER/fetch');

export const fetchNeigbouhoodOffers = createAction<OfferWithHost['id']>('NEIGBOUHOOD/fetch');

export const loadReviews = createAction<OfferWithHost['id']>('DATA/reviews');

export const dropOffer = createAction('OFFER/drop');

export const setActiveCity = createAction<string>('OFFERS/setActiveCity');

export const fetchFavorites = createAction('FAVORITES/fetch');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('app/setError');
