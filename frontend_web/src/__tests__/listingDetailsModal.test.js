import { render, screen, fireEvent, cleanup, within } from '@testing-library/react';
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

afterEach(cleanup);

describe('ListingDetailsModal', () => {
  it('renders content, features, and ARIA attributes when shown', async () => {
    render(
      <ListingDetailsModal listing={listing} onClose={jest.fn()} showContactForm={false} />
    );
    // Wait for dialog
    const dialog = await screen.findByRole('dialog');
    expect(dialog).toHaveAttribute('aria-label', `Details for ${listing.title}`);
    expect(within(dialog).getByText(listing.title)).toBeInTheDocument();
    expect(within(dialog).getByText(listing.location)).toBeInTheDocument();
    // Price: use regex to tolerate formatting (possible comma, possible /mo or /month)
    expect(within(dialog).getByText(/117[ ,]?000/i)).toBeInTheDocument();
    expect(within(dialog).getByText('Ideal for large scale distribution operations.')).toBeInTheDocument();
    for (const feat of listing.features) {
      expect(within(dialog).getByText(feat)).toBeInTheDocument();
    }
  });

  it('fires onClose when overlay or close button is clicked', async () => {
    const onClose = jest.fn();
    render(<ListingDetailsModal listing={listing} onClose={onClose} />);
    const dialog = await screen.findByRole('dialog');
    fireEvent.click(within(dialog).getByTestId('modal-close-btn'));
    expect(onClose).toHaveBeenCalledTimes(1);

    // Overlay click
    // Modal root, using data-testid
    fireEvent.click(within(dialog).getByTestId('modal-root'));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('renders and triggers Contact Now button when showContactForm is true', async () => {
    const onContact = jest.fn();
    render(<ListingDetailsModal listing={listing} onClose={jest.fn()} onContact={onContact} showContactForm />);
    const dialog = await screen.findByRole('dialog');
    // Use role and name for button, in dialog
    const contactBtn = within(dialog).getByRole('button', { name: /contact now/i });
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
