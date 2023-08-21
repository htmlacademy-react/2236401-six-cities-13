import classNames from 'classnames';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import { useNavigate } from 'react-router-dom';
import { SyntheticEvent, useState } from 'react';
import { updateFavoriteOffer } from '../../store/offers/offers.slice';
import { changeFavoritesStatusAction } from '../../store/api-actions';


type FavoritesButtonProps = {
  offerId: string;
  isFavorite: boolean;
  className: string;
  imgWidth: number;
  imgHeight: number;
}

function FavoritesButton({offerId, isFavorite, className, imgWidth, imgHeight}: FavoritesButtonProps): JSX.Element {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const [isOfferFavorite, setIsOfferFavorite] = useState<boolean>(isFavorite);

  const handleFavoriteClick = (evt: SyntheticEvent) => {
    evt.preventDefault();

    if (authorizationStatus === AuthorizationStatus.NoAuth || authorizationStatus === AuthorizationStatus.Unknown) {
      navigate(AppRoute.Login);
      return;
    }

    setIsOfferFavorite((prevIsOfferFavotire) => !prevIsOfferFavotire);

    const favoriteInfo = {
      offerId: offerId,
      isFavorite: !isOfferFavorite,
    };

    dispatch(changeFavoritesStatusAction(favoriteInfo));
    dispatch(updateFavoriteOffer(favoriteInfo));
  };


  return (
    <button
      className={classNames(`${className}__bookmark-button`, 'button', isOfferFavorite && `${className}__bookmark-button--active`)}
      type="button"
      onClick={handleFavoriteClick}
    >
      <svg className={classNames(`${className}__bookmark-icon`)} width={imgWidth} height={imgHeight}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default FavoritesButton;
