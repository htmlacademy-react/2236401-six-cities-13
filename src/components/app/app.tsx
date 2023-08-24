import MainScreen from '../../pages/main-screen/main-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import MemoLoginScreen from '../../pages/login-screen/login-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import { getAuthCheckedStatus, getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import { getErrorStatus, isOffersStatusLoading } from '../../store/offers/offers.selectors';
import Spinner from '../spinner/spinner';
import ErrorScreen from '../../pages/error-screen/error-screen';


function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersDataLoading = useAppSelector(isOffersStatusLoading);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const hasError = useAppSelector(getErrorStatus);


  if (!isAuthChecked || isOffersDataLoading) {
    return (
      <Spinner />
    );
  }

  if (hasError) {
    return (
      <ErrorScreen />
    );
  }

  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainScreen />
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <FavoritesScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<MemoLoginScreen />}
        />
        <Route
          path={`${AppRoute.Offer}/:offerId`}
          element={
            <OfferScreen />
          }
        />
        <Route
          path="*"
          element={
            <NotFoundScreen/>
          }
        />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
