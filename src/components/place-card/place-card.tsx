import { AppRoute, NameOfClasses, PageImageProperties, TypeOfAllocation } from '../../const';
import { Offer, OfferWithHost } from '../../types/offer';
import { getPercent } from '../../utils';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import FavoritesButton from '../favorites-button/favorites-button';
import React from 'react';


type PlaceCardProps = {
  offer: Offer | OfferWithHost;
  nameClass: string;
  onCardHover?: (offerId: string | null) => void;
}

function PlaceCard(props: PlaceCardProps): JSX.Element {
  const {offer, nameClass, onCardHover} = props;

  const {id, isPremium, previewImage, price, rating, title, type, isFavorite} = offer;

  const routeOfferId = `${AppRoute.Offer}/${id}`;
  const ratingWidth = getPercent(rating);

  const imgWidth = nameClass
    !== NameOfClasses.MainPage && nameClass !== NameOfClasses.NearPlaces
    ? PageImageProperties.FavoritesWidth
    : PageImageProperties.CitiesWidth;
  const imgHeight = nameClass
    !== NameOfClasses.MainPage && nameClass !== NameOfClasses.NearPlaces
    ? PageImageProperties.FavoritesHeight
    : PageImageProperties.CitiesHeight;


  return (
    <article
      className={`${nameClass}__card place-card`}
      onMouseEnter={() => onCardHover?.(offer.id)}
      onMouseLeave={() => onCardHover?.(null)}
      data-testid="place-card"
    >
      {isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className={`${nameClass}__image-wrapper place-card__image-wrapper`}>
        <Link to={routeOfferId} data-testid='offer-href'>
          <img className="place-card__image"
            src={previewImage}
            width={imgWidth}
            height={imgHeight}
            alt={title}
          />
        </Link>
      </div>
      <div className={classNames({'favorites__card-info': nameClass === NameOfClasses.Favorites}, 'place-card__info')}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoritesButton offerId ={id} isFavorite={isFavorite} imgHeight={19} imgWidth={18} className='place-card' />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: ratingWidth}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={routeOfferId}>{title}</Link>
        </h2>
        <p className="place-card__type">{TypeOfAllocation[type]}</p>
      </div>
    </article>
  );
}

const MemoPlaceCard = React.memo(PlaceCard);

export default MemoPlaceCard;
