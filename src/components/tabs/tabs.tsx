import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { TRAVEL_CITIES, AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setActiveCity } from '../../store/offers/offers.slice';
import React from 'react';

type TabsProps = {
  currentCity: string;
}


function Tabs({currentCity}: TabsProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {TRAVEL_CITIES.map((city) => (
            <li
              className="locations__item"
              key={city}
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(setActiveCity(city));
              }}
              data-testid='tab-citie'
            >
              <Link
                className={classNames({'tabs__item--active': city === currentCity}, 'locations__item-link', 'tabs__item')}
                to={AppRoute.Main}
              >
                <span>{city}</span>
              </Link>
            </li>))}
        </ul>
      </section>
    </div>
  );
}

const MemoTabs = React.memo(Tabs);

export default MemoTabs;
