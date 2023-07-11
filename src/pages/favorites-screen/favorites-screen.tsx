import Header from '../../components/header/header';
import LocationItem from './location-item';
import Footer from '../../components/footer/footer';

function FavoritesScreen(): JSX.Element {
  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <LocationItem />
              <LocationItem />
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default FavoritesScreen;
