import styles from './error-screen.module.css';
import { useAppDispatch } from '../../hooks';
import { fetchOffersAction } from '../../store/api-actions';


function ErrorScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="container">
      <section className={styles.error}>
        <h1 className={styles['error__title']}>Unknown error</h1>
        <p className={styles['error__text']}>Offers not found</p>
        <p className={styles['error__description']}>Failed to fetch offers. Please, try again later</p>
        <button
          onClick={() => {
            dispatch(fetchOffersAction());
          }}
          className={styles['error__button']}
        >Try again
        </button>
      </section>
    </div>
  );
}

export default ErrorScreen;
