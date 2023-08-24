import { render, screen } from '@testing-library/react';
import FavoritesButton from './favorites-button';
import userEvent from '@testing-library/user-event';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus, Status } from '../../const';
import { makeFakeFullOffer } from '../../utils-for-test/mocks';
import { withHistory, withStore } from '../../utils-for-test/mock-component';

describe('Component: ButtonBookmark', () => {
  const offer = makeFakeFullOffer();
  const {id, isFavorite} = offer;
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.Login);
  });

  it('should render correct', () => {
    const buttonTestId = 'bookmark-button';

    const {withStoreComponent} = withStore(<FavoritesButton className="favorites" offerId={id} isFavorite={isFavorite} imgWidth={33} imgHeight={44} />, {
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
    });
    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);


    const buttonBookmark = screen.getByTestId(buttonTestId);

    expect(buttonBookmark).toBeInTheDocument();
  });

  it('should riderect to Login page with button click if Authorization.NoAuth', async() => {

    const {withStoreComponent} = withStore(
      <FavoritesButton className="favorites" offerId={id} isFavorite={isFavorite} imgWidth={33} imgHeight={44} />, {
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          setAuthData: null,
          status: Status.Idle
        },
      });
    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    await userEvent.click(screen.getByRole('button'));

    expect(mockHistory.location.pathname).toBe(AppRoute.Login);
  });
});
