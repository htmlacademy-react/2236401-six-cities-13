import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils-for-test/mock-component';
import Reviews from './reviews';
import { makeFakeReviewList } from '../../utils-for-test/mocks';
import { AuthorizationStatus, Status } from '../../const';

describe('Component: Reviews', () => {
  const mockReviews = makeFakeReviewList();
  const review = mockReviews[0];

  it('should render correctly with Authorization.Auth', () => {
    const {withStoreComponent} = withStore(<Reviews reviews={mockReviews}/>, {
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

    expect(screen.getByText(/reviews/i)).toBeInTheDocument();
    expect(screen.getByText(mockReviews.length)).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBe(mockReviews.length);
    expect(screen.getByText(review.user.name)).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('should render correctly with Authorization.NoAuth', () => {
    const {withStoreComponent} = withStore(<Reviews reviews={mockReviews}/>, {
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        setAuthData: null,
        status: Status.Idle
      },
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByText(/reviews/i)).toBeInTheDocument();
    expect(screen.getByText(mockReviews.length)).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBe(mockReviews.length);
    expect(screen.getByText(review.user.name)).toBeInTheDocument();
    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
  });
});
