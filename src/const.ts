export const MAX_STARS_COUNT = 5;
export const MIN_CHARACTERS_COUNT = 50;
export const MAX_CHARACTERS_COUNT = 300;

export const TITLE_RATING = [
  'perfect',
  'good',
  'not bad',
  'badly',
  'terribly'
] as const;


export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  NotFound = '/404',
  Error = '/error',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum NameOfClasses {
  AllPages = 'cities',
  Favorites = 'favorites'
}

export enum PageImageProperties {
  CitiesWidth = '260',
  FavoritesWidth = '150',
  CitiesHeight = '200',
  FavoritesHeight = '110'
}

export enum HeaderPage {
  HasNav = 'HAS_NAV',
  WithoutNav = 'WITHOUT_NAV'
}

export const TRAVEL_CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

export enum TypeOfAllocation {
  apartment = 'Apartment',
  room = 'Private Room',
  house = 'House',
  hotel = 'Hotel'
}

export const SortOffersType = {
  Popular : 'Popular',
  PriceToHigh : 'Price: low to high',
  PriceToLow : 'Price: high to low',
  TopRated : 'Top rated first',
};

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Favorites = '/favorite',
  NotFound = '/404',
  Reviews = '/comments'
}

export enum NameSpace {
  User = 'USER',
  Review = 'REVIEW',
  Offers = 'OFFERS'
}
