import Layout from '../../components/layout/layout';
import Tabs from '../../components/tabs/tabs';
import { HeaderPage } from '../../const';
import { useAppSelector } from '../../hooks';
import { getActiveCity } from '../../store/offers/offers.selectors';

function MainEmpty(): JSX.Element {

  const currentCity = useAppSelector(getActiveCity);

  return (
    <Layout pageTitle = 'Travelling in Europe'
      classNameContainer = 'page--gray page--main'
      classNameMain = 'page__main--index page__main--index-empty'
      headerPage ={HeaderPage.HasNav}
      hasFooter = {false}
    >
      <h1 className="visually-hidden">Cities</h1>
      <Tabs currentCity={currentCity} />
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      </div>
    </Layout>
  );
}

export default MainEmpty;
