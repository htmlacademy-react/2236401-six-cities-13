import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Offer } from '../../types/offer';
import ReviewForm from '../review-form/review-form';
import ReviewItem from '../review-item/review-item';
import { fetchReviews } from '../../store/action';

type ReviewsProps = {
  offerId: Offer['id'];
}

function Reviews({offerId}: ReviewsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviews(offerId));
  }, [offerId, dispatch]);

  return (
    <section className="offer__reviews reviews">
      {reviews.length ?
        <>
          <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews?.length}</span></h2>
          <ul className="reviews__list">
            {reviews.map((review) => <ReviewItem review={review} key={review.id} />)}
          </ul>
        </> : <p>Your review will be the first</p>}

      <ReviewForm />
    </section>
  );

}

export default Reviews;
