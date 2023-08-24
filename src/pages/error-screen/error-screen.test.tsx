import { APIRoute } from '../../const';
import { fetchOffersAction } from '../../store/api-actions';
import { withStore } from '../../utils-for-test/mock-component';
import { extractActionsTypes } from '../../utils-for-test/mocks';
import ErrorScreen from './error-screen';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Component: ErrorScreen', () => {
  it('should render correctly', () => {
    const firstExpectedText = 'Unknown error';
    const { withStoreComponent } = withStore(<ErrorScreen />, {});

    render(withStoreComponent);

    expect(screen.getByText(firstExpectedText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should dispatch "fetchOffersAction" when user clicked replay button', async () => {
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(<ErrorScreen />, {});
    mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, []);

    render(withStoreComponent);
    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type,
    ]);

  });
});
