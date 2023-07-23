import { Offer } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type OfferListProps = {
  offers: Offer[];
  className: string;
  // onCardHover?: (offerId: number | null) => void;
}

function OfferList ({offers, className}: OfferListProps): JSX.Element {
  return (
    <div className={className}>
      {offers.map((item) =>
        <PlaceCard key={item.id} offer={item} nameClass={className === 'favorites__places' ? 'favorites' : 'cities'} />)}
    </div>
  );
}

export default OfferList;
