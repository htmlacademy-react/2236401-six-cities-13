import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen } from '@testing-library/react';
import FavoritesScreen from './favorites-screen';
import { AuthorizationStatus, Status } from '../../const';
import { makeFakeOffersList } from '../../utils-for-test/mocks';

describe('Component: Favorites Screen', () => {
  const mockOffers = makeFakeOffersList();
  const mockFavoritesOffers = [...mockOffers].filter((offer) => offer.isFavorite);

  it('should render correctly with AuthorizationStatus.Auth & favorites', () => {
    const {withStoreComponent} = withStore(<FavoritesScreen />, {
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        setAuthData: {
          token: '123321',
          email: 'test@test.com',
          name: 'Amir',
          avatarUrl: 'fakePath/234',
          isPro: true
        },
        status: Status.Idle
      },
      OFFERS: {
        offers: [],
        fullOffer: null,
        neigbourhoodOffers: null,
        favorites: [...mockFavoritesOffers],
        isOffersDataLoading: false,
        isFullOfferDataLoading: false,
        isOffersNeighbourhoodLoading: false,
        activeCity: 'Paris',
        hasError: false,
      },
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    const expectedText = 'Saved listing';
    const links = screen.getAllByTestId('offer-href');

    expect(links.length).toBe(mockFavoritesOffers.length);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
