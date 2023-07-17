import styles from './not-found-screen.module.css';
import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Helmet } from 'react-helmet-async';
import { HeaderPage } from '../../const';


function NotFoundScreen(): JSX.Element {

  return (
    <div className={styles['not-found']}>
      <Helmet>
        <title>Six cities. Page not found.</title>
      </Helmet>
      <div className={styles['not-found__container']}>
        <Header headerPage={HeaderPage.HasNav} />

        <main className={styles['not-found__main']}>
          <div className="container">
            <section className={styles['not-found__text-container']}>
              <h1 className={styles['not-found__title']}>404</h1>
              <p className={styles['not-found__text']}>Page not found</p>
              <p className={styles['not-found__description']}>Sorry but the page you are looking for does not exist</p>
              <Link to="/" className={styles['not-found__button']}>Back to home</Link>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default NotFoundScreen;
