import { NameSpace } from '../../const';
import { Offer, OfferWithHost } from '../../types/offer';
import { State } from '../../types/state';

export const getOffers = (state: State): Offer[] => state[NameSpace.Offers].offers;
export const isOffersStatusLoading = (state: State): boolean => state[NameSpace.Offers].isOffersDataLoading;

export const getfFullOffer = (state: State): OfferWithHost | null => state[NameSpace.Offers].fullOffer;
export const isFullOfferStatusLoading = (state: State): boolean => state[NameSpace.Offers].isFullOfferDataLoading;

export const getNeigborhoodOffers = (state: State): Offer[] | null => state[NameSpace.Offers].neigbourhoodOffers;
export const isNeigbourhoodOffersStatusLoading = (state: State): boolean => state[NameSpace.Offers].isOffersNeighbourhoodLoading;

export const getActiveCity = (state: State): string => state[NameSpace.Offers].activeCity;

export const getFavoriteOffers = (state: State): Offer[] => state[NameSpace.Offers].favorites;

export const getErrorStatus = (state: State): boolean => state[NameSpace.Offers].hasError;
