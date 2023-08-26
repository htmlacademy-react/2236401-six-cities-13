import styles from './not-found-screen.module.css';
import { Link } from 'react-router-dom';
import { AppRoute, HeaderPage } from '../../const';
import MemoLayout from '../../components/layout/layout';


function NotFoundScreen(): JSX.Element {

  return (
    <MemoLayout pageTitle = 'Page not found'
      classNameContainer = {styles['not-found']}
      classNameMain = {styles['not-found__main']}
      headerPage = {HeaderPage.HasNav}
    >
      <div className="container">
        <section className={styles['not-found__text-container']}>
          <h1 className={styles['not-found__title']}>404</h1>
          <p className={styles['not-found__text']}>Page not found</p>
          <p className={styles['not-found__description']}>Sorry but the page you are looking for does not exist</p>
          <Link to={AppRoute.Main} className={styles['not-found__button']} data-testid='back-home'>Back to home</Link>
        </section>
      </div>
    </MemoLayout>
  );
}

export default NotFoundScreen;
