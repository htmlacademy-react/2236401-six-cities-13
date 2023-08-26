import { withHistory, withStore } from '../../utils-for-test/mock-component';
import { render, screen } from '@testing-library/react';
import MainEmpty from './main-empty';

describe('Component: Main Screen', () => {

  it('should render correctly without offers in city', () => {
    const {withStoreComponent} = withStore(<MainEmpty currentCity='Paris' />, {});

    const expectedText = 'We could not find any property available at the moment in Paris';
    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
