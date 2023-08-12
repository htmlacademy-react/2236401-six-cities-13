import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { reducer } from '../reducer';
import browserHistory from '../../browser-history';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'APP/redirectToRoute') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
