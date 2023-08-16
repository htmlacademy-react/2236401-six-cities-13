import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { userProcess } from './user-process/user-process.slice';
import { offers } from './offers/offers.slice';
import { reviews } from './reviews/reviews.slice';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Offers]: offers.reducer,
  [NameSpace.Review]: reviews.reducer,
});
