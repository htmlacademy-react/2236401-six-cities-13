import MainIndexScreen from '../../pages/main-index-screen/main-index-screen';

type AppScreenProps = {
  placesCount: number;
}

function App({placesCount}: AppScreenProps): JSX.Element {
  return (
    <MainIndexScreen placesCount={placesCount}/>
  );
}

export default App;
