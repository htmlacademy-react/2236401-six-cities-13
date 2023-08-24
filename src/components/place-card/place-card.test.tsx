import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { AuthorizationStatus, Status } from '../../const';
import MemoPlaceCard from './place-card';
import { makeFakeFullOffer } from '../../utils-for-test/mocks';
import { TypeOfAllocation } from '../../const';

describe('Component: Place Card', () => {
  const mockOffer = makeFakeFullOffer();
  const {type} = mockOffer;
  const offerType = TypeOfAllocation[type];
  const offer = {...mockOffer, price: 823, title: 'The Castle for your mother'};

  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<MemoPlaceCard offer={offer} nameClass='cities' />, {
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        setAuthData: null,
        status: Status.Idle
      },
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    const link: HTMLAnchorElement = screen.getByTestId('offer-href');

    expect(link.href).toContain(offer.id);
    expect(screen.getByTestId('place-card')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(`€${offer.price}`)).toBeInTheDocument();
    expect(screen.getByTestId('bookmark-button')).toBeInTheDocument();
    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(offerType)).toBeInTheDocument();
  });
});
