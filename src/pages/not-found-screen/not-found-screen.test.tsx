import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen } from '@testing-library/react';
import NotFoundScreen from './not-found-screen';
import { AppRoute, AuthorizationStatus, Status } from '../../const';
import { makeFakeOffersList } from '../../utils-for-test/mocks';

describe('Component: Not found screen', () => {
  const mockOffers = makeFakeOffersList();

  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<NotFoundScreen />, {
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
        favorites: [...mockOffers],
        isOffersDataLoading: false,
        isFullOfferDataLoading: false,
        isOffersNeighbourhoodLoading: false,
        activeCity: 'Paris',
        hasError: false,
      },
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    const link: HTMLAnchorElement = screen.getByTestId('back-home');

    expect(link.href).toContain(AppRoute.Main);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});
