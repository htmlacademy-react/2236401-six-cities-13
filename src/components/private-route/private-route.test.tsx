import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus } from '../../const';
import { withHistory } from '../../utils-for-test/mock-component';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';
import { render, screen } from '@testing-library/react';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push('/private');
  });

  it('should render component for public route, when user not authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';
    const preparedComponent = withHistory(
      <Routes>
        <Route
          path={AppRoute.Login}
          element={<h1>{expectedText}</h1>}
        />
        <Route
          path='/private'
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <h1>{notExpectedText}</h1>
            </PrivateRoute>
          }
        />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const expectedText = 'private route';
    const notExpectedText = 'public route';
    const preparedComponent = withHistory(
      <Routes>
        <Route
          path={AppRoute.Login}
          element={<h1>{notExpectedText}</h1>}
        />
        <Route
          path='/private'
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <h1>{expectedText}</h1>
            </PrivateRoute>
          }
        />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
