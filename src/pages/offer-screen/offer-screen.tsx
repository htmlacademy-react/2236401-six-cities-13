import ReviewItem from '../../components/review-item/review-item';
import ReviewForm from '../../components/review-form/review-form';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { OfferWithHost } from '../../types/offer';
import { getPercent, getCapitalLetter } from '../../utils';
import { Review } from '../../types/review';
import { HeaderPage } from '../../const';
import classNames from 'classnames';
import Layout from '../../components/layout/layout';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import { useState } from 'react';

type OfferScreenProps = {
  offers: OfferWithHost[];
  reviews: Review[];
}

function OfferScreen({offers, reviews}: OfferScreenProps): JSX.Element {
  // const [comments, setComments] = useState(reviews);
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);

  const onCardHoverHandler = (offerId: string | null): void => {
    setSelectedOffer(offerId);
  };

  const params = useParams();
  const currentOfferId = params.offerId;
  const currentOffer = offers.find((offer) => offer.id === currentOfferId);

  if(!currentOffer) {
    return <Navigate to={'/404'} />;
  }
  const {isPremium, title, rating, price, images, type, bedrooms, maxAdults, goods, host, description, isFavorite} = currentOffer;
  const {isPro, name, avatarUrl} = host;

  const neighbourhoodOffers = offers.filter((offer) =>
    currentOffer.city.name === offer.city.name).filter((offer) =>
    offer.id !== currentOfferId)
    .slice(0, 3);

  //eslint-disable-next-line no-console
  // console.log(reviews);
  return (
    <Layout
      pageTitle = 'Find the latest travel news and offers.'
      classNameMain = 'page__main--offer'
      headerPage = {HeaderPage.HasNav}
      hasFooter = {false}
    >
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {images && images.length && images.map((picture) => (
              <div className="offer__image-wrapper" key={picture} >
                <img className="offer__image"
                  src={picture}
                  alt="title"
                />
              </div>))}
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {isPremium && <div className="offer__mark"><span>Premium</span></div>}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {title}
              </h1>
              <button className={classNames({'offer__bookmark-button--active': isFavorite}, 'offer__bookmark-button', 'button')} type="button">
                <svg className="offer__bookmark-icon" width={31} height={33}>
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{width: getPercent(rating)}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {getCapitalLetter(type)}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {bedrooms} {bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
              </li>
              <li className="offer__feature offer__feature--adults">
                Max {maxAdults} {maxAdults > 1 ? 'adults' : 'adult'}
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {goods && goods.length && goods.map((good) =>
                  <li className="offer__inside-item" key={good}>{good}</li>)}
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className={classNames({'offer__avatar-wrapper--pro': isPro}, 'offer__avatar-wrapper', 'user__avatar-wrapper')}>
                  <img className="offer__avatar user__avatar"
                    src={avatarUrl}
                    width={74}
                    height={74}
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">
                  {name}
                </span>
                {isPro &&
                  <span className="offer__user-status">
                    Pro
                  </span>}
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {description}
                </p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews?.length}</span></h2>
              {reviews.length ?
                <ul className="reviews__list">
                  {reviews.map((review) => <ReviewItem review={review} key={review.id} />)}
                </ul> : <p>Your review will be the first</p>}

              <ReviewForm />
            </section>
          </div>
        </div>
        <Map className='offer' city={neighbourhoodOffers[0].city} offers={neighbourhoodOffers} selectedOffer={selectedOffer} />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <OfferList className="near-places__list places__list" offers={neighbourhoodOffers} onCardHover={onCardHoverHandler} />
        </section>
      </div>
    </Layout>
  );
}

export default OfferScreen;
