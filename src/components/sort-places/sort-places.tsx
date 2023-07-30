import { useAppDispatch } from '../../hooks';
import { SortOffersType } from '../../const';
import { changeSortType } from '../../store/action';
import { useRef, useState } from 'react';
import classNames from 'classnames';


type SortPlacesProps = {
  currentSortType: SortOffersType;
}

function SortPlaces({currentSortType}: SortPlacesProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const sortRef = useRef(null);
  const dispatch = useAppDispatch();

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        ref={sortRef}
      >
        {currentSortType}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={classNames({'places__options--opened' : isOpen}, 'places__options', 'places__options--custom')}>
        {Object.values(SortOffersType).map((type) => (
          <li
            key={type}
            className={classNames({'places__option--active': type === currentSortType}, 'places__option')}
            tabIndex={0}
            onClick={(evt) => {
              evt.preventDefault();
              dispatch(changeSortType(type));
              setIsOpen(false);
            }}
          >
            {type}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortPlaces;
