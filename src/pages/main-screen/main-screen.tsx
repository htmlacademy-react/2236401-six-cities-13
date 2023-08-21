import { useState } from 'react';
import { HeaderPage } from '../../const';
import Layout from '../../components/layout/layout';
import OfferList from '../../components/offer-list/offer-list';
import Tabs from '../../components/tabs/tabs';
import Map from '../../components/map/map';
import SortPlaces from '../../components/sort-places/sort-places';
import { useAppSelector } from '../../hooks';
import { Sorting } from '../../types/sorting';
import { sortingOffersByType } from '../../utils';
import { getActiveCity, getOffers } from '../../store/offers/offers.selectors';
import MainEmpty from './main-empty';


function MainScreen(): JSX.Element {

  const currentCity = useAppSelector(getActiveCity);
  const offers = useAppSelector(getOffers);
  const offersByCity = offers.filter(
    (offer) => offer.city.name === currentCity);

  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);

  const [activeSorting, setActiveSorting] = useState<Sorting>('Popular');

  const cardHoverHandler = (offerId: string | null): void => setSelectedOffer(offerId);

  const className: string = offers.length === 0 ? 'page__main--index-empty page__main--index' : 'page__main--index';

  return (
    <Layout pageTitle = 'Travelling in Europe'
      classNameContainer = 'page--gray page--main'
      classNameMain = {className}
      headerPage ={HeaderPage.HasNav}
      hasFooter = {false}
    >
      <h1 className="visually-hidden">Cities</h1>
      <Tabs currentCity={currentCity} />
      <div className="cities">
        {offers.length === 0 ? <MainEmpty /> :
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersByCity.length} {offersByCity.length > 1 ? 'places' : 'place'} to stay in {currentCity}</b>
              <SortPlaces activeSorting={activeSorting} onChange={(newSorting) => setActiveSorting(newSorting)} />
              <OfferList
                className="cities__places-list places__list tabs__content"
                offers={sortingOffersByType(offersByCity, activeSorting)}
                onCardHover={cardHoverHandler}
              />
            </section>
            <div className="cities__right-section">
              <Map className='cities' city={offersByCity[0].city} offers={offersByCity} selectedOffer={selectedOffer}/>
            </div>
          </div>}
      </div>
    </Layout>
  );
}

export default MainScreen;
