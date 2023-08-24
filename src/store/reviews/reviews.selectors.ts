import { NameSpace, Status } from '../../const';
import { Review } from '../../types/review';
import { State } from '../../types/state';

export const getReviews = (state: State): Review[] => state[NameSpace.Review].reviews;
export const isReviewsStatusLoading = (state: State): boolean => state[NameSpace.Review].isReviewsDataLoading;

export const getReviewStatus = (state: State): Status => state[NameSpace.Review].status;
