import { render, screen, fireEvent } from '@testing-library/react';
import ListingCard from '../components/ListingCard';

const fakeListing = {
  id: 1,
  title: 'Cold Storage Facility',
  location: 'Pune',
  area: 12000,
  price: 78000,
  image: '/img/warehouse1.jpg',
  features: ['Cold Storage', 'Truck Access'],
};

describe('Listing Card', () => {
  test('renders all expected info and ARIA attributes', () => {
    const handleClick = jest.fn();
    render(<ListingCard listing={fakeListing} onClick={handleClick} index={0} />);
    expect(screen.getByRole('button', { name: /open details/i })).toBeInTheDocument();
    expect(screen.getByText(fakeListing.title)).toBeInTheDocument();
    expect(screen.getByText(/12000 sq ft/i)).toBeInTheDocument();
    expect(screen.getByText(`₹${fakeListing.price.toLocaleString()}/mo`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: `Open details for ${fakeListing.title}` })).toHaveAttribute(
      'data-testid',
      'details-btn-1'
    );
    // Check all features
    for (const feat of fakeListing.features) {
      expect(screen.getByText(feat)).toBeInTheDocument();
    }
  });

  test('calls onClick when card or button is clicked', () => {
    const handleClick = jest.fn();
    render(<ListingCard listing={fakeListing} onClick={handleClick} index={0} />);
    // Card triggers
    fireEvent.click(screen.getByRole('button', { name: `View details for ${fakeListing.title}` }));
    expect(handleClick).toHaveBeenCalledTimes(1);
    // Button triggers
    fireEvent.click(screen.getByTestId('details-btn-1'));
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  test('keyboard navigation: pressing Enter/Space triggers onClick', () => {
    const handleClick = jest.fn();
    render(<ListingCard listing={fakeListing} onClick={handleClick} index={2} />);
    fireEvent.keyDown(screen.getByRole('button', { name: /view details/i }), { key: 'Enter' });
    fireEvent.keyDown(screen.getByRole('button', { name: /view details/i }), { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
