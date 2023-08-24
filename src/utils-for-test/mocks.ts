import { Offer, OfferWithHost } from '../types/offer';
import { AuthorizationStatus, Status, TRAVEL_CITIES, TypeOfAllocation } from '../const';
import { faker } from '@faker-js/faker';
import { Review, Comment } from '../types/review';
import { State } from '../types/state';
import { Action } from 'redux';

const typeOfAllocation = ['apartment', 'room', 'house', 'hotel'];

export const makeFakeOffersList = (): Offer[] => (
  new Array(20).fill(null).map(() => ({
    'id': faker.string.uuid(),
    'title': faker.lorem.text(),
    'type': faker.helpers.arrayElement(typeOfAllocation) as keyof typeof TypeOfAllocation,
    'price': faker.helpers.rangeToNumber({min: 50, max: 1000}),
    'previewImage': faker.system.filePath(),
    'city': {
      'name': faker.helpers.arrayElement(TRAVEL_CITIES),
      'location': {
        'latitude': faker.location.latitude(),
        'longitude': faker.location.latitude(),
        'zoom': 13
      }
    },
    'location': {
      'latitude': faker.location.latitude(),
      'longitude': faker.location.latitude(),
      'zoom': 16
    },
    'isFavorite': faker.datatype.boolean(),
    'isPremium': faker.datatype.boolean(),
    'rating': faker.helpers.rangeToNumber({min: 0, max: 5}),
  }))
);

export const makeFakeFullOffer = (): OfferWithHost => ({
  'id': faker.string.uuid(),
  'title': faker.lorem.text(),
  'type': faker.helpers.arrayElement(typeOfAllocation) as keyof typeof TypeOfAllocation,
  'price': faker.helpers.rangeToNumber({min: 50, max: 1000}),
  'previewImage': faker.system.filePath(),
  'city': {
    'name': faker.helpers.arrayElement(TRAVEL_CITIES),
    'location': {
      'latitude': faker.location.latitude(),
      'longitude': faker.location.latitude(),
      'zoom': 13
    }
  },
  'location': {
    'latitude': faker.location.latitude(),
    'longitude': faker.location.latitude(),
    'zoom': 16
  },
  'isFavorite': faker.datatype.boolean(),
  'isPremium': faker.datatype.boolean(),
  'rating': faker.helpers.rangeToNumber({min: 1, max: 5}),
  'description': faker.lorem.text(),
  'bedrooms': faker.helpers.rangeToNumber({min: 1, max: 10}),
  'goods': new Array(4).fill(null).map(() => (faker.string.alpha({ length: { min: 5, max: 10 } }))),
  'host': {
    'name': faker.person.firstName(),
    'avatarUrl': faker.image.avatar(),
    'isPro': faker.datatype.boolean(),
  },
  'images': new Array(6).fill(null).map(() => (faker.image.urlLoremFlickr({ category: 'hotels' }))),
  'maxAdults': faker.helpers.rangeToNumber({min: 1, max: 10}),
});

export const makeFakeReviewList = (): Review[] =>
  new Array(faker.helpers.rangeToNumber({min: 1, max: 10}),).fill(null).map(() => ({
    'id': faker.string.uuid(),
    'date': new Date().toISOString(),
    'user': {
      'name': faker.person.firstName(),
      'avatarUrl': faker.internet.avatar(),
      'isPro': faker.datatype.boolean(),
    },
    'comment': faker.lorem.text(),
    'rating': faker.helpers.rangeToNumber({min: 1, max: 5}),
    'offerId': '123-34567-123454',
  }));

export const makeFakePostReview = (): Comment => ({
  'comment': faker.lorem.text(),
  'rating': faker.helpers.rangeToNumber({min: 1, max: 5}),
  'offerId': faker.string.uuid(),
});

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    setAuthData: null,
    status: Status.Idle
  },
  OFFERS: {
    offers: [],
    fullOffer: null,
    neigbourhoodOffers: null,
    favorites: [],
    isOffersDataLoading: false,
    isFullOfferDataLoading: false,
    isOffersNeighbourhoodLoading: false,
    activeCity: 'Paris',
    hasError: false
  },
  REVIEW: {
    reviews: [],
    isReviewsDataLoading: false
  },
  ...initialState ?? {},
});


export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
