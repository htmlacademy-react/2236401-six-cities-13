import { createAction } from '@reduxjs/toolkit';
import { Offer, OfferWithHost } from '../types/offer';
import { AppRoute, AuthorizationStatus } from '../const';
import { UserData } from '../types/user-data';
import { Review } from '../types/review';


export const fetchOffers = createAction('DATA/fetchOffers', (offers: Offer[]) => ({payload: offers}));
export const setOffersDataLoadingStatus = createAction<boolean>('DATA/setOffersDataLoadingStatus');

export const fetchOffer = createAction<OfferWithHost>('OFFER/fetch');
export const setFullOfferDataLoadingStatus = createAction<boolean>('data/setDetailsOfferDataLoadingStatus');

export const fetchNeigbourhoodOffers = createAction('NEIGBOUHOOD/fetch', (neighbourhoodOffers: Offer[] | null) => ({payload: neighbourhoodOffers}));
export const setOffersNeighbourhoodLoading = createAction<boolean>('DATA/setOffersNeighbouhoodError');

export const loadReviews = createAction('REVIEWS/fetch', (reviews: Review[] | null) => ({payload: reviews}));
export const setReviewsDataLoadingStatus = createAction<boolean>('data/setReviewsDataLoadingStatus');

export const dropOffer = createAction('OFFER/drop');

export const setActiveCity = createAction<string>('OFFERS/setActiveCity');

export const fetchFavorites = createAction<Offer[]>('FAVORITES/fetch');

export const requireAuthorization = createAction<AuthorizationStatus>('USER/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('APP/redirectToRoute');

export const setAuthData = createAction('USER/setUserInfo', (userInfo: UserData | null) => ({payload: userInfo}));
