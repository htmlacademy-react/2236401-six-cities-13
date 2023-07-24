import { Review } from '../../types/review';
import ReviewForm from '../review-form/review-form';
import ReviewItem from '../review-item/review-item';

type ReviewsProps = {
  reviews: Review[];
}

function Reviews({reviews}: ReviewsProps): JSX.Element {
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
