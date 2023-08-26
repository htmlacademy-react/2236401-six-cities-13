import dayjs from 'dayjs';
import { MAX_STARS_COUNT, SortOffersType } from './const';
import { Offer, OffersByCityGroup } from './types/offer';
import { Review } from './types/review';
import { Sorting } from './types/sorting';


//Функция для подсчёта процентов от числа

export const getPercent = (number: number): string =>
  `${(Math.round(number) * 100) / MAX_STARS_COUNT}%`;


// Функция для группировки предложений по городам

export const getOffersByCityGroup = (offers: Offer[]) =>
  offers.reduce((cityGroup: OffersByCityGroup, offer) => {
    const city = offer.city.name;
    if (!cityGroup[city]) {
      cityGroup[city] = [];
    }
    cityGroup[city].push(offer);
    return cityGroup;
  }, {});


// Функция для сортировки предложений

export const sortOffersByType = (offers: Offer[], type: Sorting): Offer[] => {
  switch (type) {
    case SortOffersType.PriceToHigh:
      return offers.sort((a, b) => a.price - b.price);
    case SortOffersType.PriceToLow:
      return offers.sort((a, b) => b.price - a.price);
    case SortOffersType.TopRated:
      return offers.sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
};

// Функция для сортировки комментариев по дате

export const sortByTimeReviews = (reviews: Review[]): Review[] =>
  reviews.sort((a, b) => dayjs(b.date).diff(dayjs(a.date)));

// Функция для получения случайного элемента массива

export const getRandomArrayElement = (array: string[]): string => array[Math.floor(Math.random() * array.length)];
