import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { TRAVEL_CITIES, AppRoute } from '../../const';


function Tabs(): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {TRAVEL_CITIES.map((city) => (
            <li className="locations__item" key={city}>
              <Link
                className={classNames({'tabs__item--active': city === 'Paris'}, 'locations__item-link', 'tabs__item')}
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

export default Tabs;
