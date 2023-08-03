import { useEffect, useState } from 'react';
import { HeaderPage } from '../../const';
import Layout from '../../components/layout/layout';
import OfferList from '../../components/offer-list/offer-list';
import Tabs from '../../components/tabs/tabs';
import Map from '../../components/map/map';
import SortPlaces from '../../components/sort-places/sort-places';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOffers } from '../../store/action';
import { Sorting } from '../../types/sorting';


function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.activeCity);
  const offers = useAppSelector((state) => state.fullOffers);
  const offersByCity = offers.filter(
    (offer) => offer.city.name === currentCity);

  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);

  const [activeSorting, setActiveSorting] = useState<Sorting>('Popular');

  const cardHoverHandler = (offerId: string | null): void => {
    setSelectedOffer(offerId);
  };

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);


  return (
    <Layout pageTitle = 'Travelling in Europe'
      classNameContainer = 'page--gray page--main'
      classNameMain = 'page__main--index'
      headerPage ={HeaderPage.HasNav}
      hasFooter = {false}
    >
      <h1 className="visually-hidden">Cities</h1>
      <Tabs currentCity={currentCity} />
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offersByCity.length} places to stay in {currentCity}</b>
            <SortPlaces activeSorting={activeSorting} onChange={(newSorting) => setActiveSorting(newSorting)} />
            <OfferList
              className="cities__places-list places__list tabs__content"
              offers={offersByCity}
              onCardHover={cardHoverHandler}
              currentSortType={activeSorting}
            />
          </section>
          <div className="cities__right-section">
            <Map className='cities' city={offersByCity[0].city} offers={offersByCity} selectedOffer={selectedOffer}/>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MainScreen;
