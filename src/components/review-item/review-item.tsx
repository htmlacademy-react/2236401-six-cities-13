import { Review } from '../../types/review';
import { getPercent } from '../../utils';

type ReviewItemProps = {
  review: Review;
};

function ReviewItem({review}: ReviewItemProps): JSX.Element {
  const {user, comment, rating, date} = review;
  const dateComment = new Date(date).toLocaleString('eng', { month: 'long', year: 'numeric' });
  const dateTime = date.split('T')[0];

  const AVATAR_URL = 'img/tourist.png';
  const imageOnError = (evt: React.SyntheticEvent<HTMLImageElement, Event>) => {
    evt.currentTarget.src = AVATAR_URL;
  };

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
            onError={imageOnError}
          />
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: getPercent(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={dateTime}>{dateComment}</time>
      </div>
    </li>
  );
}

export default ReviewItem;
