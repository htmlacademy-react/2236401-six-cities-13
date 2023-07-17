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

  const percent = number * 100 / MAX_STARS_COUNT;
  return `${percent.toFixed(2)}%`;
}


export {getCapitalLetter, getPercent};
