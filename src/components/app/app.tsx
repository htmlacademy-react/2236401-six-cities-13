import MainScreen from '../../pages/main-screen/main-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { useAppDispatch } from '../../hooks';
import { fetchFavorites } from '../../store/action';
import { useEffect } from 'react';


function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <HelmetProvider>
      <BrowserRouter>
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
                authorizationStatus={AuthorizationStatus.Auth}
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
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
