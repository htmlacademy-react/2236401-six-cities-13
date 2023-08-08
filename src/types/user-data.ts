import { User } from './review';

export type UserData = {
  id: number | string;
  email: string;
  token: string;
} & User;
