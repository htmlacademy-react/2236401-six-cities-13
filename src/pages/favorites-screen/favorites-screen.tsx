import FavoritesEmptySection from './favorites-empty-section';
import { OfferWithHost } from '../../types/offer';
import { Link } from 'react-router-dom';
import { HeaderPage } from '../../const';
import Layout from '../../components/layout/layout';
import OfferList from '../../components/offer-list/offer-list';
import { useAppSelector } from '../../hooks';


type OffersByCityGroup = {
  [city: string]: OfferWithHost[];
}

const getOffersByCityGroup = (offers: OfferWithHost[]) =>
  offers.reduce((cityGroup: OffersByCityGroup, offer) => {
    const city = offer.city.name;

    if (!cityGroup[city]) {
      cityGroup[city] = [];
    }
    cityGroup[city].push(offer);

    return cityGroup;
  }, {});


function FavoritesScreen(): JSX.Element {
  const favoriteOffers = useAppSelector((state) => state.favorites);
  const favoriteOffersByCity = getOffersByCityGroup(favoriteOffers);

  return (
    <Layout pageTitle = 'Favorites list'
      classNameMain = 'page__main--favorites'
      headerPage = {HeaderPage.HasNav}
    >

      {favoriteOffers.length ?
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>

            <ul className="favorites__list">
              {Object.entries(favoriteOffersByCity).map(([city, offersGroup]) => (
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
        </div> : <FavoritesEmptySection />}
    </Layout>
  );
}

export default FavoritesScreen;
