import { render, screen } from '@testing-library/react';
import MemoSortPlaces from './sort-places';
import { SortOffersType } from '../../const';
import { Sorting } from '../../types/sorting';

describe('Component: Sort Places', () => {
  it('should render correctly', () => {
    const handleSortTypeChange: (type: Sorting) => void = vi.fn();

    render(
      <MemoSortPlaces
        activeSorting='Popular'
        onChange={handleSortTypeChange}
      />);

    const sortTypesCount = Object.values(SortOffersType).length;

    expect(screen.getByText(/sort by/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('sort-type-item').length).toBe(sortTypesCount);
  });
});
