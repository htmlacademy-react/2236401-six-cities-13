import Reviews from '../../components/reviews/reviews';
import { useParams } from 'react-router-dom';
import { getPercent } from '../../utils';
import { HeaderPage, NEIGBOURHOOD_OFFERS_COUNT, TypeOfAllocation } from '../../const';
import MemoLayout from '../../components/layout/layout';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import HostSection from '../../components/host-section/host-section';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { dropOffer } from '../../store/offers/offers.slice';
import { fetchNeigbourhoodOffersAction, fetchFullOfferAction, fetchReviewsOfferAction } from '../../store/api-actions';
import { getNeigborhoodOffers, getfFullOffer, isFullOfferStatusLoading, isNeigbourhoodOffersStatusLoading } from '../../store/offers/offers.selectors';
import { getReviews, isReviewsStatusLoading } from '../../store/reviews/reviews.selectors';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Spinner from '../../components/spinner/spinner';
import FavoritesButton from '../../components/favorites-button/favorites-button';


function OfferScreen(): JSX.Element {

  const {offerId} = useParams();
  const dispatch = useAppDispatch();

  const currentOffer = useAppSelector(getfFullOffer);
  const isFullOfferDataLoading = useAppSelector(isFullOfferStatusLoading);

  const neighbourhoodOffersList = useAppSelector(getNeigborhoodOffers);
  const isOfferNeighbourhoodLoading = useAppSelector(isNeigbourhoodOffersStatusLoading);

  const reviews = useAppSelector(getReviews);
  const isReviewsDataLoading = useAppSelector(isReviewsStatusLoading);

  const neighbourhoodOffers = neighbourhoodOffersList?.slice(0, NEIGBOURHOOD_OFFERS_COUNT);

  useEffect(() => {
    if (offerId) {
      dispatch(fetchFullOfferAction(offerId));
      dispatch(fetchNeigbourhoodOffersAction(offerId));
      dispatch(fetchReviewsOfferAction(offerId));
    }

    return () => {
      dispatch(dropOffer());
    };

  }, [offerId, dispatch]);

  if (isFullOfferDataLoading || isOfferNeighbourhoodLoading || isReviewsDataLoading) {
    return (
      <Spinner/>
    );
  }

  if(!currentOffer) {
    return <NotFoundScreen />;
  }

  const {id, isPremium, title, rating, price, images, type, bedrooms, maxAdults, goods, isFavorite, host, description} = currentOffer;
  const hostInfo = { id, description, bedrooms, goods, host, images, maxAdults };

  const mapOffers = neighbourhoodOffers && [...neighbourhoodOffers, currentOffer];

  return (
    <MemoLayout
      pageTitle = 'Find the latest travel news and offers'
      classNameMain = 'page__main--offer'
      headerPage = {HeaderPage.HasNav}
      hasFooter = {false}
    >
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {images && images.length && images.map((picture) => (
              <div className="offer__image-wrapper" key={picture}>
                <img className="offer__image"
                  src={picture}
                  alt={title}
                  data-testid='preview-image'
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
              <FavoritesButton offerId={id} isFavorite={isFavorite} imgHeight={33} imgWidth={31} className='offer' />
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: getPercent(rating) }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {TypeOfAllocation[type]}
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
                {goods && goods.length && goods.map((good) => <li className="offer__inside-item" key={good} data-testid='inside-good'>{good}</li>)}
              </ul>
            </div>
            <HostSection hostInfo={hostInfo} />
            {offerId && <Reviews reviews={reviews} />}
          </div>
        </div>
        {neighbourhoodOffers &&
          <Map
            className='offer'
            city={neighbourhoodOffers[0]?.city}
            offers={mapOffers}
            currentOffer={currentOffer}
          />}
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          {neighbourhoodOffersList &&
            <OfferList classNameContainer="near-places__list places__list" classNameCard='near-places' offers={neighbourhoodOffers} />}
        </section>
      </div>
    </MemoLayout>
  );
}

export default OfferScreen;
