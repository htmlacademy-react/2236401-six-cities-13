import { MAX_STARS_COUNT, SortOffersType } from './const';
import { OfferWithHost } from './types/offer';
import { Sorting } from './types/sorting';


//Функция для подсчёта процентов от числа

function getPercent (number: number): string {

  return `${(Math.round(number) * 100) / MAX_STARS_COUNT}%`;
}

// Функция для получения предложений размещения по конкретному городу

function getOffersByCity (city: string | undefined, offers: OfferWithHost[]): OfferWithHost[] {
  return offers.filter((offer) => city === offer.city.name);
}

// Функция для сортировки предложений

function sortingOffersByType (offers: OfferWithHost[], type: Sorting): OfferWithHost[] {
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
}


export { getPercent, getOffersByCity, sortingOffersByType };
