import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils-for-test/mock-component';
import ReviewForm from './review-form';
import { AuthorizationStatus, Status } from '../../const';

describe('Component: Reviews', () => {

  it('should render correctly with Authorization.Auth', () => {
    const {withStoreComponent} = withStore(<ReviewForm />, {
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
      REVIEW: {
        reviews: [],
        isReviewsDataLoading: false,
        status: Status.Idle
      },
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByText('50 characters')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });
});
