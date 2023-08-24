import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { extractActionsTypes } from '../../utils-for-test/mocks';
import { TRAVEL_CITIES } from '../../const';
import Tabs from './tabs';
import userEvent from '@testing-library/user-event';
import { setActiveCity } from '../../store/offers/offers.slice';

describe('Component: Tabs', () => {
  const tabsLength = TRAVEL_CITIES.length;

  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<Tabs currentCity='Paris' />);

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getAllByTestId('tab-citie').length).toBe(tabsLength);
    expect(screen.getByText(TRAVEL_CITIES[0])).toBeInTheDocument();
  });

  it('should dispath active city with click on link', async () => {
    const {withStoreComponent, mockStore} = withStore(<Tabs currentCity='Paris' />);

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);
    const allButtons = screen.getAllByTestId('tab-citie');

    await userEvent.click(allButtons[0]);

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      setActiveCity.type,
    ]);

  });
});
