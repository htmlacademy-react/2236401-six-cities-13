// import FavoriteItem from '../../pages/favorites-screen/favorite-item';
import PlaceCard from '../place-card/place-card';
import { Offer } from '../../types/offer';
import { NameOfClasses } from '../../const';

type FavoriteListProps = {
  offers: Offer[];
}

function FavoriteList({offers}: FavoriteListProps): JSX.Element {
  return (
    <div className="favorites__places">
      {offers.map((offer) => <PlaceCard key={offer.id} offer={offer} nameClass={NameOfClasses.Favorites} />)}
    </div>
  );
}

export default FavoriteList;
