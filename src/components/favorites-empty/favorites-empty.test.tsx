import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen } from '@testing-library/react';
import FavoritesEmpty from './favorites-empty';
import { AuthorizationStatus, Status } from '../../const';

describe('Component: Favorites Empty', () => {

  it('should render correctly without favorites', () => {
    const {withStoreComponent} = withStore(<FavoritesEmpty />, {
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

    const expectedText1 = 'Nothing yet saved.';
    const expectedText2 = 'Save properties to narrow down search or plan your future trips.';
    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByText(expectedText1)).toBeInTheDocument();
    expect(screen.getByText(expectedText2)).toBeInTheDocument();
  });
});
