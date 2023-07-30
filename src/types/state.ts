import { Offer, OfferWithHost } from './offer';
import { store } from '../store/index';
import { SortOffersType } from '../const';

export type InitialState = {
  city: string;
  offers: Offer[] | OfferWithHost[];
  sortType: SortOffersType;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
