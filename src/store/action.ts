import { createAction } from '@reduxjs/toolkit';
import { OfferWithHost } from '../types/offer';


export const fetchOffers = createAction('OFFERS/fetch');

// export const fetchFullOffers = createAction('FULLOFFERS/fetch');

export const fetchOffer = createAction<OfferWithHost['id']>('OFFER/fetch');

export const fetchNeigbouhoodOffers = createAction<OfferWithHost['id']>('NEIGBOUHOOD/fetch');

export const fetchReviews = createAction<OfferWithHost['id']>('REVIEWS/fetch');

export const dropOffer = createAction('OFFER/drop');

export const setActiveCity = createAction<string>('OFFERS/setActiveCity');

export const fetchFavorites = createAction('FAVORITES/fetch');
