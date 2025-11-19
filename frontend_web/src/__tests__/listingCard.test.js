import { render, screen, fireEvent, cleanup, within } from '@testing-library/react';
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

afterEach(cleanup);

describe('Listing Card', () => {
  test('renders all expected info and ARIA attributes', () => {
    const handleClick = jest.fn();
    const { container } = render(<ListingCard listing={fakeListing} onClick={handleClick} index={0} />);
    // Get all buttons in the specific card scope
    const buttons = within(container).getAllByRole('button');
    // At least one should match details button
    expect(buttons.some(btn => btn.getAttribute('data-testid') === 'details-btn-1')).toBe(true);

    // Title, location, area, price etc. inside card area only
    expect(within(container).getByText(fakeListing.title)).toBeInTheDocument();
    expect(within(container).getByText(/12000 sq ft/i)).toBeInTheDocument();
    expect(within(container).getByText(`₹${fakeListing.price.toLocaleString()}/mo`)).toBeInTheDocument();

    // Check all features (in each card, not across document)
    for (const feat of fakeListing.features) {
      expect(within(container).getByText(feat)).toBeInTheDocument();
    }
  });

  test('calls onClick when card or button is clicked', () => {
    const handleClick = jest.fn();
    const { container } = render(<ListingCard listing={fakeListing} onClick={handleClick} index={0} />);
    // Prefer data-testid for consistency
    fireEvent.click(within(container).getByTestId('details-btn-1'));
    expect(handleClick).toHaveBeenCalledTimes(1);
    // If there's a main card button, trigger it if not same as details-btn
    const cardButtons = within(container).getAllByRole('button');
    const otherButton = cardButtons.find(
      btn => btn.getAttribute('data-testid') !== 'details-btn-1'
    );
    if (otherButton) {
      fireEvent.click(otherButton);
      expect(handleClick).toHaveBeenCalledTimes(2);
    }
  });

  test('keyboard navigation: pressing Enter/Space triggers onClick', () => {
    const handleClick = jest.fn();
    const { container } = render(<ListingCard listing={fakeListing} onClick={handleClick} index={2} />);
    // Get the relevant view details button by accessible name (scope to this card)
    const viewBtn = within(container).getByRole('button', { name: /view details/i });
    fireEvent.keyDown(viewBtn, { key: 'Enter' });
    fireEvent.keyDown(viewBtn, { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
