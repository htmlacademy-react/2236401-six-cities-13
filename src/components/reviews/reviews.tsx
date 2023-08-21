import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { Review } from '../../types/review';
import ReviewForm from '../review-form/review-form';
import ReviewItem from '../review-item/review-item';
import { sortByTimeReviews } from '../../utils';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';

type ReviewsProps = {
  reviews: Review[] | null;
}

function Reviews({reviews}: ReviewsProps): JSX.Element {

  const hasAuthorization = useAppSelector(getAuthorizationStatus) === AuthorizationStatus.Auth;
  const lastReviews = reviews && sortByTimeReviews([...reviews]).slice(0, 10);

  return (
    <section className="offer__reviews reviews">
      {reviews?.length ?
        <>
          <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews?.length}</span></h2>
          <ul className="reviews__list">
            {lastReviews?.map((review) => <ReviewItem review={review} key={review.id} />)}
          </ul>
        </> :
        <>
          <p>Your review will be the first</p>
          {!hasAuthorization && <p>You must be logged in to post a comment.</p>}
        </>}
      {hasAuthorization && <ReviewForm />}
    </section>
  );

}

export default Reviews;
