import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Reviews } from '../../types/state';
import { NameSpace, Status } from '../../const';
import { fetchReviewsOfferAction, postReviewAction } from '../api-actions';
import { toast } from 'react-toastify';

const initialState: Reviews = {
  reviews: [],
  isReviewsDataLoading: false,
  status: Status.Idle,
};

export const reviews = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {
    setReviewStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
  },
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
      })
      .addCase(postReviewAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.status = Status.Success;
        state.reviews.unshift(action.payload);
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.status = Status.Error;
        toast.warn('Failed to post comment. Please, try again later');
      });
  }
});

export const { setReviewStatus } = reviews.actions;
