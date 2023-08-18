import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { Offer, OfferWithHost } from './offer';
import { Review } from './review';
import { UserData } from './user-data';

export type UserProcess = {
  autorizationStatus: AuthorizationStatus;
  setAuthData: UserData | null;
  status: string;
}

export type Reviews = {
  reviews: Review[];
  isReviewsDataLoading: boolean;
}

export type Offers = {
  offers: Offer[];
  fullOffer: OfferWithHost | null;
  neigbourhoodOffers: Offer[] | null;
  favorites: Offer[];
  isOffersDataLoading: boolean;
  isFullOfferDataLoading: boolean;
  isOffersNeighbourhoodLoading: boolean;
  activeCity: string;
  hasError: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
