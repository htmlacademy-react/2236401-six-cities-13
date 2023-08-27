import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import ScrollToTop from './scroll-to-top';
import HistoryRouter from '../history-route/history-route';


describe('Component: Scroll To Top', () => {
  const mockHistory = createMemoryHistory();
  mockHistory.push('/first');

  it('should work correctly', () => {
    render(
      <HistoryRouter history={mockHistory}>
        <ScrollToTop />
      </HistoryRouter>
    );
    mockHistory.push('/second');

    expect(window.scrollY).toBe(0);
  });
});
