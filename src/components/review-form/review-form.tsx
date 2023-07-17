import { useState, ChangeEvent, Fragment } from 'react';
import { TITLE_RATING, MIN_CHARACTERS_COUNT, MAX_CHARACTERS_COUNT } from '../../const';


function ReviewForm(): JSX.Element {
  const [formData, setFormData] = useState({rating: '0', review: ''});

  function createReview (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const {name, value} = evt.target;
    setFormData({ ...formData, [name]: value});
  }


  const buttonIsDisabled = MIN_CHARACTERS_COUNT > formData.review.length
    || MAX_CHARACTERS_COUNT < formData.review.length
    || !+formData.rating;


  return (
    <form className="reviews__form form" action="#" method="post">
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
                onChange={createReview}
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
        onChange={createReview}
        value={formData.review}
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
