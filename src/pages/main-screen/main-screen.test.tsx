import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen } from '@testing-library/react';
import MainScreen from './main-screen';
import { AuthorizationStatus, Status } from '../../const';
import { makeFakeOffersList } from '../../utils-for-test/mocks';

describe('Component: Main Screen', () => {
  const mockOffers = makeFakeOffersList();
  const mockFavoritesOffers = [...mockOffers].filter((offer) => offer.isFavorite);
  const mockOffersByCity = mockOffers.filter(
    (offer) => offer.city.name === 'Paris');

  it('should render correctly without offers in city', () => {
    const {withStoreComponent} = withStore(<MainScreen />, {
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

    const expectedText = 'We could not find any property available at the moment in Paris';
    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correctly with offers', () => {
    const {withStoreComponent} = withStore(<MainScreen />, {
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
        offers: [...mockOffers],
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

    const mockOffersByCityCount = mockOffersByCity.length;
    const expectedText = `${mockOffersByCityCount} ${mockOffersByCityCount > 1 ? 'places' : 'place'} to stay in Paris`;

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(/sort by/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('offer-href').length).toBe(mockOffersByCityCount);
  });
});
