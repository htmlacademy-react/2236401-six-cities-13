import { Offer } from '../../types/offer';
import { NavLink } from 'react-router-dom';
import { AppRoute, HeaderPage, TRAVEL_CITIES } from '../../const';
import classNames from 'classnames';
import Layout from '../../components/layout/layout';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import { useState } from 'react';

type MainScreenProps = {
  offers: Offer[];
}


function MainScreen({offers}: MainScreenProps): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);

  const onCardHoverHandler = (offerId: string | null): void => {
    setSelectedOffer(offerId);
  };

  return (
    <Layout pageTitle = 'Travelling in Europe.'
      classNameContainer = 'page--gray page--main'
      classNameMain = 'page__main--index'
      headerPage ={HeaderPage.HasNav}
      hasFooter = {false}
    >
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {TRAVEL_CITIES.map((city) => (
              <li className="locations__item" key={city}>
                <NavLink className={classNames({'tabs__item--active': city === 'Paris'}, 'locations__item-link', 'tabs__item')} to={AppRoute.Main}>
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
            <b className="places__found">{offers.length} places to stay in {offers[0].city.name}</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width={7} height={4}>
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
            <OfferList
              className="cities__places-list places__list tabs__content"
              offers={offers}
              onCardHover={onCardHoverHandler}
            />
          </section>
          <div className="cities__right-section">
            <Map className='cities' city={offers[0].city} offers={offers} selectedOffer={selectedOffer}/>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MainScreen;
