import ReviewItem from './review-item';
import { render, screen } from '@testing-library/react';

describe('Component: Review Item', () => {
  const mockReview = {
    'id': '123-4567-dklfhj',
    'date': new Date().toISOString(),
    'user': {
      'name': 'Alisha',
      'avatarUrl': 'scr/fakePath',
      'isPro': true,
    },
    'comment': 'Everything is Perfect!',
    'rating': 4.2,
    'offerId': '123-34567-123454',
  };

  const dateComment = new Date(mockReview.date).toLocaleString('eng', { month: 'long', year: 'numeric' });

  it('should render correctly', () => {
    render(
      <ReviewItem review={mockReview}/>
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByAltText(/Reviews avatar/i)).toBeInTheDocument();
    expect(screen.getByTestId('userName')).toBeInTheDocument();
    expect(screen.getByTestId('rating')).toBeInTheDocument();
    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
    expect(screen.getByText(dateComment)).toBeInTheDocument();
  });
});
