import { SortOffersType } from '../../const';
import React, { useState, KeyboardEvent } from 'react';
import classNames from 'classnames';
import { Sorting } from '../../types/sorting';


type SortPlacesProps = {
  activeSorting: Sorting;
  onChange: (newSorting: Sorting) => void;
}

function SortPlaces({activeSorting, onChange }: SortPlacesProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const iconStyle = {
    transform: `translateY(-50%) ${isOpen ? 'rotate(180deg)' : ''}`
  };

  const handleFormKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape' && isOpen) {
      evt.preventDefault();
      setIsOpen(false);
    }
  };

  const handleSortingTypeClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleSortingItemClick = (type: Sorting) => {
    onChange(type);
    setIsOpen(false);
  };


  return (
    <form className="places__sorting" action="#" method="get" onKeyDown={handleFormKeyDown}>
      <span className="places__sorting-caption">Sort by&nbsp;</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleSortingTypeClick}
      >
        {activeSorting}
        <svg className="places__sorting-arrow" width={7} height={4} style={iconStyle}>
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={classNames({'places__options--opened' : isOpen}, 'places__options', 'places__options--custom')}>
        {Object.values(SortOffersType).map((type) => (
          <li
            key={type}
            className={classNames({'places__option--active': type === activeSorting}, 'places__option')}
            tabIndex={0}
            onClick={() => handleSortingItemClick(type as Sorting)}
            data-testid='sort-type-item'
          >
            {type}
          </li>
        ))}
      </ul>
    </form>
  );
}

const MemoSortPlaces = React.memo(SortPlaces);

export default MemoSortPlaces;
