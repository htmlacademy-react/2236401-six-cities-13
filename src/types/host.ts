import { UserData } from './review';

export type Host = {
  id: string;
  description: string;
  bedrooms: number;
  goods: string[];
  host: UserData;
  images: string[];
  maxAdults: number;
}
