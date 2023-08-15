import { createSlice } from '@reduxjs/toolkit';
import { Reviews } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchReviewsOfferAction, postReviewAction } from '../api-actions';
import { toast } from 'react-toastify';

const initialState: Reviews = {
  reviews: [],
  isReviewsDataLoading: false,
};

export const reviews = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsOfferAction.pending, (state) => {
        state.isReviewsDataLoading = true;
      })
      .addCase(fetchReviewsOfferAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsDataLoading = false;
      })
      .addCase(fetchReviewsOfferAction.rejected, (state) => {
        state.isReviewsDataLoading = false;
        toast.warn('Failed to fetch comment. Please, try again later');
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviews.unshift(action.payload);
      })
      .addCase(postReviewAction.rejected, () => {
        toast.warn('Failed to post comment. Please, try again later');
      });
  }
});

