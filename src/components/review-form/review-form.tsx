import { useState, ChangeEvent, Fragment, FormEvent } from 'react';
import { TITLE_RATING, MIN_CHARACTERS_COUNT, MAX_CHARACTERS_COUNT } from '../../const';
import { useAppDispatch } from '../../hooks';
import {
  // fetchReviewsOfferAction,
  postReviewAction } from '../../store/api-actions';
import { useParams } from 'react-router-dom';


function ReviewForm(): JSX.Element {
  const {offerId} = useParams();
  const [formData, setFormData] = useState({rating: '0', review: ''});

  function onChangeFormHandler (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const {name, value} = evt.target;
    setFormData({ ...formData, [name]: value});
  }

  const buttonIsDisabled =
    formData.review.length < MIN_CHARACTERS_COUNT
    || !+formData.rating;

  const dispatch = useAppDispatch();


  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if(offerId){
      dispatch(postReviewAction({
        comment: formData.review,
        rating: +formData.rating,
        offerId: offerId
      }));
      setFormData({...formData, review: '', rating: '0'});
      // dispatch(fetchReviewsOfferAction(offerId));
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={submitHandler}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {TITLE_RATING.map((title, i) => {
          const index = TITLE_RATING.length - i;

          return (
            <Fragment key={title}>
              <input className="form__rating-input visually-hidden"
                name="rating"
                value={index}
                id={`${index}-stars`}
                type="radio"
                checked={+formData.rating === index}
                onChange={onChangeFormHandler}
              />
              <label htmlFor={`${index}-stars`} className="reviews__rating-label form__rating-label" title={title}>
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
        onChange={onChangeFormHandler}
        value={formData.review}
        maxLength={MAX_CHARACTERS_COUNT}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button"
          type="submit"
          disabled={buttonIsDisabled}
        >Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
