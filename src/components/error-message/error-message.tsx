import styles from './error-message.module.css';
import { useAppSelector } from '../../hooks';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector((state) => state.error);

  return (error)
    ? <div className={styles['error-message']}>{error}</div>
    : null;
}

export default ErrorMessage;
