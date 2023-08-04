// import Reviews from '../../components/reviews/reviews';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { getPercent } from '../../utils';
import { HeaderPage, TypeOfAllocation } from '../../const';
import classNames from 'classnames';
import Layout from '../../components/layout/layout';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import HostSection from '../../components/host-section/host-section';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { dropOffer, fetchNeigbouhoodOffers, fetchOffer } from '../../store/action';


function OfferScreen(): JSX.Element {

  const {offerId} = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (offerId) {
      dispatch(fetchOffer(offerId));
      dispatch(fetchNeigbouhoodOffers(offerId));
    }

    return () => {
      dispatch(dropOffer());
    };
  }, [offerId, dispatch]);


  // const currentOffer = useAppSelector((state) => state.offer);
  const offers = useAppSelector((state) => state.fullOffers);
  const currentOffer = offers.find((offer) => offer.id === offerId);

  // const neighbourhoodOffers = useAppSelector((state) => state.neighbourhoodOffers);
  const neighbourhoodOffers = offers.filter((offer) =>
    currentOffer?.city.name === offer.city.name).filter((offer) => offer.id !== offerId).slice(0,3);


  // console.log(currentOffer, neighbourhoodOffers)

  if(!currentOffer) {
    return <Navigate to='/404' />;
  }

  const mapOffers = [...neighbourhoodOffers, currentOffer];
  const {isPremium, title, rating, price, images, type, bedrooms, maxAdults, goods, isFavorite} = currentOffer;


  return (
    <Layout
      pageTitle = 'Find the latest travel news and offers'
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
                  alt={title}
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
                {goods && goods.length && goods.map((good) =>
                  <li className="offer__inside-item" key={good}>{good}</li>)}
              </ul>
            </div>
            <HostSection hostInfo={currentOffer} />
            {/* {offerId && <Reviews offerId={offerId} />} */}
          </div>
        </div>
        <Map
          className='offer'
          city={neighbourhoodOffers[0]?.city}
          offers={mapOffers}
          currentOffer={currentOffer}
        />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <OfferList className="near-places__list places__list" offers={neighbourhoodOffers} />
        </section>
      </div>
    </Layout>
  );
}

export default OfferScreen;
