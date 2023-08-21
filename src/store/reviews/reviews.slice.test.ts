import { makeFakeReviewList } from '../../mocks-test/mocks-test';
import { fetchReviewsOfferAction, postReviewAction } from '../api-actions';
import { reviews } from './reviews.slice';

describe('Reviews Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      reviews: [],
      isReviewsDataLoading: false,
    };

    const result = reviews.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      reviews: [],
      isReviewsDataLoading: false,
    };

    const result = reviews.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isReviewsDataLoading" to "true" with "fetchReviewsOfferAction.pending"', () => {
    const expectedState = {
      reviews: [],
      isReviewsDataLoading: true,
    };

    const result = reviews.reducer(undefined, fetchReviewsOfferAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "reviews" to array with review, "isReviewsDataLoading" to "false" with "fetchReviewsOfferAction.fulfilled"', () => {
    const mockReviews = makeFakeReviewList();
    const expectedState = {
      reviews: mockReviews,
      isReviewsDataLoading: false,
    };

    const result = reviews.reducer(
      undefined,
      fetchReviewsOfferAction.fulfilled(
        mockReviews, '', '')
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isReviewsDataLoading" to "false" with "fetchReviewsOfferAction.rejected', () => {
    const expectedState = {
      reviews: [],
      isReviewsDataLoading: false,
    };

    const result = reviews.reducer(
      undefined,
      fetchReviewsOfferAction.rejected
    );

    expect(result).toEqual(expectedState);
  });

  it('should post new comment and add it to array with comments, "fetchReviewsOfferAction" to "false" with "postReviewAction.fulfilled"', () => {
    const mockReviews = makeFakeReviewList();
    const postReview = makeFakeReviewList()[0];
    const allReviews = [postReview, ...mockReviews];

    const initialState = {
      reviews: mockReviews,
      isReviewsDataLoading: false,
    };

    const expectedState = {
      reviews: allReviews,
      isReviewsDataLoading: false,
    };

    const result = reviews.reducer(
      initialState,
      { type: postReviewAction.fulfilled.type, payload: postReview}
    );

    expect(result).toEqual(expectedState);
  });
});

