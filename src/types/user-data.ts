import { User } from './review';

export type UserData = {
  email: string;
  token: string;
} & User;
