import Header from '../../components/header/header';
import FavoriteList from '../../components/favorites-list/favorites-list';
import Footer from '../../components/footer/footer';
import FavoritesEmptyScreen from './favorites-empty-screen';
import { Offer } from '../../types/offer';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { HeaderPage } from '../../const';

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
    <div className="page">
      <Helmet>
        <title>Six cities. Favorites list.</title>
      </Helmet>
      <Header headerPage={HeaderPage.HasNav} />
      {favoriteOffers.length ?
        <main className="page__main page__main--favorites">
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
                    <FavoriteList offers={offersGroup} />
                  </li>)
                )}
              </ul>
            </section>
          </div>
        </main> : <FavoritesEmptyScreen />}

      <Footer />
    </div>
  );
}

export default FavoritesScreen;
