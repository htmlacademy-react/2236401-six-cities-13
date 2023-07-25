import { Offer } from '../../types/offer';
import { HeaderPage} from '../../const';
import Layout from '../../components/layout/layout';
import OfferList from '../../components/offer-list/offer-list';
import Tabs from '../../components/tabs/tabs';
import Map from '../../components/map/map';
import { useState } from 'react';
import SortPlaces from '../../components/sort-places/sort-places';

type MainScreenProps = {
  offers: Offer[];
}


function MainScreen({offers}: MainScreenProps): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);

  const cardHoverHandler = (offerId: string | null): void => {
    setSelectedOffer(offerId);
  };

  return (
    <Layout pageTitle = 'Travelling in Europe'
      classNameContainer = 'page--gray page--main'
      classNameMain = 'page__main--index'
      headerPage ={HeaderPage.HasNav}
      hasFooter = {false}
    >
      <h1 className="visually-hidden">Cities</h1>
      <Tabs />
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} places to stay in {offers[0].city.name}</b>
            <SortPlaces />
            <OfferList
              className="cities__places-list places__list tabs__content"
              offers={offers}
              onCardHover={cardHoverHandler}
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
