import { render, screen, fireEvent } from '@testing-library/react';
import SearchFilterBar from '../components/SearchFilterBar';

describe('Search and Filter Bar', () => {
  test('renders ARIA and fields and triggers onChange', () => {
    const onChange = jest.fn();
    render(
      <SearchFilterBar
        onChange={onChange}
        values={{ searchText: '', location: 'Any', minArea: '', maxPrice: '', resultsText: '2 warehouses found' }}
      />
    );
    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByLabelText(/search by title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/filter by location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/minimum area/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/maximum price per month/i)).toBeInTheDocument();
    expect(screen.getByText(/warehouses found/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/search by title/i), { target: { value: 'Mumbai' } });
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ searchText: 'Mumbai' }));
  });
});
