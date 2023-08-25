import { useState, ChangeEvent, Fragment, FormEvent, useCallback, useEffect } from 'react';
import { TITLE_RATING, MIN_CHARACTERS_COUNT, MAX_CHARACTERS_COUNT, Status, STAR_RATING } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postReviewAction } from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import { getReviewStatus } from '../../store/reviews/reviews.selectors';
import { setReviewStatus } from '../../store/reviews/reviews.slice';


function ReviewForm(): JSX.Element {
  const {offerId} = useParams();
  const [formData, setFormData] = useState({rating: '0', review: ''});

  const postReviewStatus = useAppSelector(getReviewStatus);

  const handleFormChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const {name, value} = evt.target;
      setFormData({ ...formData, [name]: value});
    }, [formData]);

  const buttonIsDisabled =
    formData.review.length < MIN_CHARACTERS_COUNT
    || formData.review.length > MAX_CHARACTERS_COUNT
    || !+formData.rating
    || postReviewStatus === Status.Loading;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (postReviewStatus === Status.Success) {
      dispatch(setReviewStatus(Status.Idle));
      setFormData({...formData, review: '', rating: '0'});
    }
  }, [dispatch, formData, postReviewStatus]);

  const handleFormSubmit = useCallback((evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if(offerId){
      dispatch(postReviewAction({
        comment: formData.review,
        rating: +formData.rating,
        offerId: offerId
      }));
    }
  }, [offerId, dispatch, formData]);

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {STAR_RATING.map((title, i) => {
          const index = TITLE_RATING.length - i;

          return (
            <Fragment key={title}>
              <input className="form__rating-input visually-hidden"
                name="rating"
                value={index}
                id={`${index}-stars`}
                type="radio"
                checked={+formData.rating === index}
                onChange={handleFormChange}
                disabled={postReviewStatus === Status.Loading}
              />
              <label htmlFor={`${index}-stars`} className="reviews__rating-label form__rating-label" title={TITLE_RATING[i]}>
                <svg className="form__star-image" width={37} height={33}>
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>);
        })}
      </div>
      <textarea className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleFormChange}
        value={formData.review}
        disabled={postReviewStatus === Status.Loading}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button"
          type="submit"
          disabled={buttonIsDisabled}
        >{postReviewStatus === Status.Loading ? 'In process...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
