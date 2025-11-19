import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import SearchFilterBar from '../components/SearchFilterBar';

afterEach(cleanup);

describe('Search and Filter Bar', () => {
  test('renders ARIA and fields and triggers onChange', () => {
    const onChange = jest.fn();
    const { container } = render(
      <SearchFilterBar
        onChange={onChange}
        values={{ searchText: '', location: 'Any', minArea: '', maxPrice: '', resultsText: '2 warehouses found' }}
      />
    );
    const searchEl = screen.getByRole('search');
    expect(searchEl).toBeInTheDocument();
    expect(screen.getByLabelText(/search by title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/filter by location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/minimum area/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/maximum price per month/i)).toBeInTheDocument();
    // Get results text inside this bar only
    expect(container.textContent).toMatch(/warehouses found/i);

    fireEvent.change(screen.getByLabelText(/search by title/i), { target: { value: 'Mumbai' } });
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ searchText: 'Mumbai' }));
  });
});
