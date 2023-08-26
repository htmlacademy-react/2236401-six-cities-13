import { render, screen } from '@testing-library/react';
import Map from './map';
import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { makeFakeFullOffer } from '../../utils-for-test/mocks';


describe('Component: Map', () => {
  const mapTestId = 'map-element';
  const mockOffers = [makeFakeFullOffer(), makeFakeFullOffer()];
  const mockCity = mockOffers[0].city;

  it('should render correctly on the main page', () => {
    const withHistoryComponent = withHistory(
      <Map
        city={mockCity}
        offers={mockOffers}
        className='main'
      />);
    const { withStoreComponent } = withStore(withHistoryComponent);


    render(withStoreComponent);

    expect(screen.getByTestId(mapTestId)).toBeInTheDocument();
  });

  it('should render correctly on the offer page', () => {
    const mockOffer = makeFakeFullOffer();
    const withHistoryComponent = withHistory(
      <Map
        city={mockCity}
        offers={mockOffers}
        currentOffer={mockOffer}
        className='offer'
      />);
    const { withStoreComponent } = withStore(withHistoryComponent);

    render(withStoreComponent);

    expect(screen.getByTestId(mapTestId)).toBeInTheDocument();
  });
});
