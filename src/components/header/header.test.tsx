import { render, screen } from '@testing-library/react';
import MemoHeader from './header';
import { AuthorizationStatus, HeaderPage, Status } from '../../const';
import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { makeFakeOffersList } from '../../utils-for-test/mocks';

describe('Component: Header', () => {
  it('should render correctly when AuthorizationStatus.NoAuth & without User Nav', () => {
    const {withStoreComponent} = withStore(<MemoHeader headerPage={HeaderPage.WithoutNav} />,{
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        setAuthData: null,
        status: Status.Idle
      },
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBe(1);
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
  });

  it('should render correctly when AuthorizationStatus.Auth with Header Nav', () => {
    const mockOffers = makeFakeOffersList();
    const {withStoreComponent} = withStore(<MemoHeader headerPage={HeaderPage.HasNav} />,{
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

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBe(2);
    expect(screen.getByAltText('test avatar')).toBeInTheDocument();
    expect(screen.getByText('test@test.com')).toBeInTheDocument();
    expect(screen.getByText(mockOffers.length)).toBeInTheDocument();
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });
});
