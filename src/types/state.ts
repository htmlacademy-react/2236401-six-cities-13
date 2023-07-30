import { Offer, OfferWithHost } from './offer';
import { store } from '../store/index';

export type InitialState = {
  city: string;
  offers: Offer[] | OfferWithHost[];
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
