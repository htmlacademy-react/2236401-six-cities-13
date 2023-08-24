import React from 'react';
import { Offer } from '../../types/offer';
import MemoPlaceCard from '../place-card/place-card';

type OfferListProps = {
  offers?: Offer[];
  className: string;
  onCardHover?: (offerId: string | null) => void;
}

function OfferList ({offers, className, onCardHover}: OfferListProps): JSX.Element {
  return (
    <div className={className} data-testid="offer-list">
      {offers?.map((item) =>
        (
          <MemoPlaceCard
            key={item.id} offer={item}
            nameClass={className === 'favorites__places' ? 'favorites' : 'cities'}
            onCardHover={onCardHover}
          />
        ))}
    </div>
  );
}
const MemoOfferList = React.memo(OfferList);

export default MemoOfferList;
