import MainScreen from '../../pages/main-screen/main-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { useAppSelector } from '../../hooks';
import Loading from '../loading/loading';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';


function App(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);


  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <Loading />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <ScrollToTop />
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
            element={<LoginScreen />}
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
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
