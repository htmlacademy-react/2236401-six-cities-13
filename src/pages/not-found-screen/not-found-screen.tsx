import styles from './not-found-screen.module.css';
import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

function NotFoundScreen(): JSX.Element {
  return (
    <div className={styles.pageNotFound}>
      <div className={styles.pageNotFoundContainer}>
        <Header />

        <main className={styles.pageMainNotFound}>
          <div className="page__not-found-main-container container">
            <section className={styles.notFound}>
              <h1 className={styles.notFoundTitle}>404</h1>
              <p className={styles.notFoundText}>Page not found</p>
              <p className={styles.notFoundDescription}>Sorry but the page you are looking for does not exist</p>
              <Link to="/" className={styles.notFoundButton}>Back to home</Link>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default NotFoundScreen;
