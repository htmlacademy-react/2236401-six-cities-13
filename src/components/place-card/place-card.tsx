import { AppRoute, NameOfClasses, PageImageProperties } from '../../const';
import { Offer } from '../../types/offer';
import { getCapitalLetter, getPercent } from '../../utils';
import { Link } from 'react-router-dom';
import classNames from 'classnames';


type PlaceCardProps = {
  offer: Offer;
  nameClass: string;
}

function PlaceCard(props: PlaceCardProps): JSX.Element {
  const {offer, nameClass} = props;
  const {id, isPremium, previewImage, price, rating, title, type, isFavorite} = offer;

  const typeCapital = getCapitalLetter(type);
  const routeOfferId = `${AppRoute.Offer}/${id}`;
  const ratingWidth = getPercent(rating);

  const imgWidth = nameClass
    === NameOfClasses.AllPages
    ? PageImageProperties.CitiesWidth
    : PageImageProperties.FavoritesWidth;
  const imgHeight = nameClass
    === NameOfClasses.AllPages
    ? PageImageProperties.CitiesHeight
    : PageImageProperties.FavoritesHeight;


  return (
    <article className={`${nameClass}__card place-card`}>
      {isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className={`${nameClass}__image-wrapper place-card__image-wrapper`}>
        <Link to={routeOfferId}>
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
          <button className={classNames({'place-card__bookmark-button--active': isFavorite}, 'place-card__bookmark-button', 'button')} type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
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
        <p className="place-card__type">{typeCapital}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
