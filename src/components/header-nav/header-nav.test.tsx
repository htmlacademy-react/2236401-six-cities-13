import { render, screen } from '@testing-library/react';
import MemoHeaderNav from './header-nav';
import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { APIRoute, AuthorizationStatus, Status } from '../../const';
import { extractActionsTypes, makeFakeOffersList } from '../../utils-for-test/mocks';
import { logoutAction } from '../../store/api-actions';
import userEvent from '@testing-library/user-event';
import { BACKEND_URL } from '../../services/api';

describe('Component: Header Nav', () => {
  const mockOfffers = makeFakeOffersList();

  it('should render correctly with AuthorizationStatus.NoAuth', () => {
    const {withStoreComponent} = withStore(<MemoHeaderNav />, {
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        setAuthData: null,
        status: Status.Idle
      },
      OFFERS: {
        offers: [],
        fullOffer: null,
        neigbourhoodOffers: null,
        favorites: [...mockOfffers],
        isOffersDataLoading: false,
        isFullOfferDataLoading: false,
        isOffersNeighbourhoodLoading: false,
        activeCity: 'Paris',
        hasError: false,
      },
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should render correctly with AuthorizationStatus.Auth', () => {
    const {withStoreComponent} = withStore(<MemoHeaderNav />, {
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
        favorites: [...mockOfffers],
        isOffersDataLoading: false,
        isFullOfferDataLoading: false,
        isOffersNeighbourhoodLoading: false,
        activeCity: 'Paris',
        hasError: false,
      },
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByAltText('test avatar'));
    expect(screen.getByText('test@test.com')).toBeInTheDocument();
    expect(screen.getByText(mockOfffers.length)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should render correctly with action click "Sign out"', async () => {
    const {withStoreComponent, mockAxiosAdapter, mockStore} = withStore(<MemoHeaderNav />, {
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
        favorites: [...mockOfffers],
        isOffersDataLoading: false,
        isFullOfferDataLoading: false,
        isOffersNeighbourhoodLoading: false,
        activeCity: 'Paris',
        hasError: false,
      },
    });

    mockAxiosAdapter
      .onDelete(`${BACKEND_URL + APIRoute.Logout}`)
      .reply(200);
    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    const elemToClick = screen.getByText('Sign out');

    await userEvent.click(elemToClick);

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type,
    ]);
  });
});
