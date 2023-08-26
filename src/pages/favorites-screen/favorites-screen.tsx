import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import { Link } from 'react-router-dom';
import { HeaderPage } from '../../const';
import MemoLayout from '../../components/layout/layout';
import OfferList from '../../components/offer-list/offer-list';
import { useAppSelector } from '../../hooks';
import { getFavoriteOffers } from '../../store/offers/offers.selectors';
import { getOffersByCityGroup } from '../../utils';


function FavoritesScreen(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const favoriteOffersByCity = getOffersByCityGroup(favoriteOffers);

  return (
    <MemoLayout pageTitle = 'Favorites list'
      classNameContainer = {favoriteOffers.length > 0 ? '' : 'page--favorites-empty'}
      classNameMain = {'page__main--favorites'}
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
                  <OfferList classNameContainer="favorites__places" classNameCard={'favorites'} offers={offersGroup} />
                </li>)
              )}
            </ul>
          </section>
        </div> : <FavoritesEmpty />}
    </MemoLayout>
  );
}

export default FavoritesScreen;
