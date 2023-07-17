import Header from '../../components/header/header';
import PlaceCard from '../../components/place-card/place-card';
import { Offer } from '../../types/offer';
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';
import { AppRoute, HeaderPage, NameOfClasses } from '../../const';

type MainScreenProps = {
  offers: Offer[];
}

const TRAVEL_CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

function MainScreen({offers}: MainScreenProps): JSX.Element {


  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Six cities. Travelling in Europe.</title>
      </Helmet>
      <Header headerPage={HeaderPage.HasNav} />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {TRAVEL_CITIES.map((city) => (
                <li className="locations__item" key={city}>
                  <NavLink className={`${city === 'Paris' ? 'tabs__item--active' : ''} locations__item-link tabs__item`} to={AppRoute.Main}>
                    <span>{city}</span>
                  </NavLink>
                </li>))}

            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                {offers.map((item) => <PlaceCard key={item.id} offer={item} nameClass={NameOfClasses.AllPages} />)}
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
