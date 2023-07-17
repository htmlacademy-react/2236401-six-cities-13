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
  if (percent <= 20) {
    return `${20}%`;
  }

  if (21 > percent && percent <= 40) {
    return `${40}%`;
  }

  if (41 > percent && percent <= 60) {
    return `${60}%`;
  }

  if (61 > percent && percent <= 80) {
    return `${80}%`;
  }

  return `${100}%`;
}


export {getCapitalLetter, getPercent};
