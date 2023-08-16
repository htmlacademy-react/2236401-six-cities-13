import { InfinitySpin } from 'react-loader-spinner';
import styles from './spinner.module.css';


function Spinner(): JSX.Element {
  return (
    <div className={styles['wrapper-spinner']}>
      <InfinitySpin
        width = '500'
        color = '#4481c3'
      />
    </div>

  );
}

export default Spinner;
