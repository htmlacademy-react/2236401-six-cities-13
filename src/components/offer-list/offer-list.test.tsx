import { render, screen } from '@testing-library/react';
import { AuthorizationStatus, Status } from '../../const';
import MemoOfferList from './offer-list';
import { withHistory, withStore } from '../../utils-for-test/mock-component';


describe('Component: Offer List', () => {
  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<MemoOfferList className='favorites__places' />, {
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        setAuthData: null,
        status: Status.Idle
      },
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId('offer-list')).toBeInTheDocument();
  });
});
