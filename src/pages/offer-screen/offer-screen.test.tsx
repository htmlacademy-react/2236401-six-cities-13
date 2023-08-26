import { makeFakeFullOffer } from '../../utils-for-test/mocks';
import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen } from '@testing-library/react';
import { AuthorizationStatus, Status } from '../../const';
import OfferScreen from './offer-screen';

describe('Component: Offer Screen', () => {
  const mockOffer = makeFakeFullOffer();

  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<OfferScreen />, {
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
        fullOffer: {...mockOffer},
        neigbourhoodOffers: null,
        favorites: [],
        isOffersDataLoading: false,
        isFullOfferDataLoading: false,
        isOffersNeighbourhoodLoading: false,
        activeCity: 'Paris',
        hasError: false,
      },
      REVIEW: {
        reviews: [],
        isReviewsDataLoading: false,
        status: Status.Idle
      },
    });

    const expectedText = 'Other places in the neighbourhood';

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    const links = screen.getAllByTestId('preview-image');
    const insideGoods = screen.getAllByTestId('inside-good');

    expect(links.length).toBe(mockOffer.images.length);
    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(insideGoods.length).toBe(mockOffer.goods.length);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
