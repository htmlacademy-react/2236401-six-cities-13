import { OfferWithHost } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type OfferListProps = {
  offers: OfferWithHost[];
  className: string;
  onCardHover?: (offerId: string | null) => void;
}

function OfferList ({offers, className, onCardHover}: OfferListProps): JSX.Element {
  return (
    <div className={className}>
      {offers.map((item) =>
        (
          <PlaceCard
            key={item.id} offer={item}
            nameClass={className === 'favorites__places' ? 'favorites' : 'cities'}
            onCardHover={onCardHover}
          />
        ))}
    </div>
  );
}

export default OfferList;
