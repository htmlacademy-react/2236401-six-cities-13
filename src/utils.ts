import { MAX_STARS_COUNT } from './const';

// Функция для получения первой буквы заглавной

function getCapitalLetter(str: string): string {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
}

//Функция для подсчёта процентов от числа

function getPercent(number: number): string {

  const percent = Math.ceil(number * 100 / MAX_STARS_COUNT);
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


export {getCapitalLetter, getPercent};
