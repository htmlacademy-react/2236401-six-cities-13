import { OfferWithHost } from '../../types/offer';
import { Sorting } from '../../types/sorting';
import { sortingOffersByType } from '../../utils';
import PlaceCard from '../place-card/place-card';

type OfferListProps = {
  offers: OfferWithHost[];
  className: string;
  onCardHover?: (offerId: string | null) => void;
  currentSortType?: Sorting;
}

function OfferList ({offers, className, onCardHover, currentSortType}: OfferListProps): JSX.Element {
  if (!currentSortType) {
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
  return (
    <div className={className}>
      {sortingOffersByType(offers, currentSortType).map((item) =>
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
