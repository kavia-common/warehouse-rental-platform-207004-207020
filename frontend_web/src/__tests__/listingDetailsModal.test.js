import { render, screen, fireEvent } from '@testing-library/react';
import ListingDetailsModal from '../components/ListingDetailsModal';

const listing = {
  id: 4,
  title: 'Large Distribution Center',
  location: 'Nagpur',
  area: 40000,
  price: 117000,
  image: '/img/warehouse4.jpg',
  features: ['Dock', '24x7 Security'],
  description: 'Ideal for large scale distribution operations.',
};

describe('ListingDetailsModal', () => {
  it('renders content, features, and ARIA attributes when shown', () => {
    render(
      <ListingDetailsModal listing={listing} onClose={jest.fn()} showContactForm={false} />
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', `Details for ${listing.title}`);
    expect(screen.getByText(listing.title)).toBeInTheDocument();
    expect(screen.getByText(listing.location)).toBeInTheDocument();
    expect(screen.getByText(/117,000/)).toBeInTheDocument();
    expect(screen.getByText('Ideal for large scale distribution operations.')).toBeInTheDocument();
    for (const feat of listing.features) {
      expect(screen.getByText(feat)).toBeInTheDocument();
    }
  });

  it('fires onClose when overlay or close button is clicked', () => {
    const onClose = jest.fn();
    render(<ListingDetailsModal listing={listing} onClose={onClose} />);
    fireEvent.click(screen.getByTestId('modal-close-btn'));
    expect(onClose).toHaveBeenCalledTimes(1);

    // Overlay click
    fireEvent.click(screen.getByTestId('modal-root'));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('renders and triggers Contact Now button when showContactForm is true', () => {
    const onContact = jest.fn();
    render(<ListingDetailsModal listing={listing} onClose={jest.fn()} onContact={onContact} showContactForm />);
    const contactBtn = screen.getByRole('button', { name: /contact about/i });
    expect(contactBtn).toBeInTheDocument();
    fireEvent.click(contactBtn);
    expect(onContact).toHaveBeenCalled();
  });

  it('returns null when no listing is provided', () => {
    // Should render nothing if listing is not passed
    const { container } = render(<ListingDetailsModal onClose={jest.fn()} />);
    expect(container.firstChild).toBeNull();
  });
});
