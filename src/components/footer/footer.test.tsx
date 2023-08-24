import { render, screen } from '@testing-library/react';
import MemoFooter from './footer';
import { AppRoute } from '../../const';
import { withHistory } from '../../utils-for-test/mock-component';

describe('Componet: Footer', () => {
  it('should render component correctly', () => {
    const preparedComponent = withHistory(<MemoFooter />);

    render(preparedComponent);

    const link: HTMLAnchorElement = screen.getByRole('link');

    expect(link.href).toContain(AppRoute.Main);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });

});
