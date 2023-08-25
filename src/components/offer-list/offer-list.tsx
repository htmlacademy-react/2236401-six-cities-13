import React from 'react';
import { Offer } from '../../types/offer';
import MemoPlaceCard from '../place-card/place-card';

type OfferListProps = {
  offers?: Offer[];
  classNameContainer: string;
  classNameCard: string;
  onCardHover?: (offerId: string | null) => void;
}

function OfferList ({offers, classNameContainer, classNameCard, onCardHover}: OfferListProps): JSX.Element {

  return (
    <div className={classNameContainer} data-testid="offer-list">
      {offers?.map((item) =>
        (
          <MemoPlaceCard
            key={item.id} offer={item}
            nameClass={classNameCard}
            onCardHover={onCardHover}
          />
        ))}
    </div>
  );
}
const MemoOfferList = React.memo(OfferList);

export default MemoOfferList;
