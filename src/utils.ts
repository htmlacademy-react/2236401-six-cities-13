import { MAX_STARS_COUNT, SortOffersType } from './const';
import { Offer, OfferWithHost } from './types/offer';


//Функция для подсчёта процентов от числа

function getPercent (number: number): string {

  const percent = Math.round(number * 100 / MAX_STARS_COUNT);
  if (percent < 30) {
    return `${20}%`;
  }

  if (percent >= 30 && percent < 50) {
    return `${40}%`;
  }

  if (percent >= 50 && percent < 70) {
    return `${60}%`;
  }

  if (percent >= 70 && percent < 90) {
    return `${80}%`;
  }

  return `${100}%`;
}

// Функция для получения предложений размещения по конкретному городу

function getOffersByCity (city: string | undefined, offers: Offer[] | OfferWithHost[]): Offer[] | OfferWithHost[] {
  return offers.filter((offer) => city === offer.city.name);
}

// Функция для сортировки предложений

function sortingOffersByType (offers: Offer[], type: SortOffersType): Offer[] {
  switch (type) {
    case SortOffersType.priceToHigh:
      return offers.sort((a, b) => a.price - b.price);
    case SortOffersType.priceToLow:
      return offers.sort((a, b) => b.price - a.price);
    case SortOffersType.topRated:
      return offers.sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
}


export { getPercent, getOffersByCity, sortingOffersByType };
