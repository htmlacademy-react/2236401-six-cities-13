import FavoritesEmptyScreen from './favorites-empty-screen';
import { Offer } from '../../types/offer';
import { Link } from 'react-router-dom';
import { HeaderPage } from '../../const';
import Layout from '../../components/layout/layout';
import OfferList from '../../components/offer-list/offer-list';

type FavoritesScreenProps = {
  offers: Offer[];
}

type OffersByCityGroup = {
  [city: string]: Offer[];
}

const getOffersByCityGroup = (offers: Offer[]) =>
  offers.reduce((cityGroup: OffersByCityGroup, offer) => {
    const city = offer.city.name;

    if (!cityGroup[city]) {
      cityGroup[city] = [];
    }
    cityGroup[city].push(offer);

    return cityGroup;
  }, {});


function FavoritesScreen({offers}: FavoritesScreenProps): JSX.Element {
  const favoriteOffers = offers.filter((item) => item.isFavorite);
  const offersByCity = getOffersByCityGroup(favoriteOffers);

  return (
    <Layout pageTitle = 'Favorites list.'
      classNameMain = 'page__main--favorites'
      headerPage = {HeaderPage.HasNav}
    >

      {favoriteOffers.length ?
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>

            <ul className="favorites__list">
              {Object.entries(offersByCity).map(([city, offersGroup]) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link className="locations__item-link" to="#">
                        <span>{city}</span>
                      </Link>
                    </div>
                  </div>
                  <OfferList className="favorites__places" offers={offersGroup} />
                </li>)
              )}
            </ul>
          </section>
        </div> : <FavoritesEmptyScreen />}
    </Layout>
  );
}

export default FavoritesScreen;
