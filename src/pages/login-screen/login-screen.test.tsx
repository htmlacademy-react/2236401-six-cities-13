import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen } from '@testing-library/react';
import { AppRoute, AuthorizationStatus, Status } from '../../const';
import MemoLoginScreen from './login-screen';
import userEvent from '@testing-library/user-event';

describe('Component: Offer Screen', () => {

  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<MemoLoginScreen />, {
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        setAuthData: null,
        status: Status.Idle
      },
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    const link: HTMLAnchorElement = screen.getByTestId('random-city-link');

    expect(screen.getByTestId('titleElement')).toBeInTheDocument();
    expect(screen.getByTestId('loginElement')).toBeInTheDocument();
    expect(screen.getByTestId('passwordElement')).toBeInTheDocument();
    expect(link.href).toContain(AppRoute.Main);
  });

  it('Проверяем правильность отработки действий пользователя', async () => {
    const expectedLoginValue = 'test@test.com';
    const expectedPasswordValue = '1e';
    const { withStoreComponent } = withStore(<MemoLoginScreen />, {
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        setAuthData: null,
        status: Status.Idle
      },
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId('loginElement'),
      expectedLoginValue
    );
    await userEvent.type(
      screen.getByTestId('passwordElement'),
      expectedPasswordValue
    );

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});
