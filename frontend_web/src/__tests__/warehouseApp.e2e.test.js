import { render, screen, fireEvent, act, within, cleanup } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

// PUBLIC_INTERFACE
describe('Warehouse Rental Platform Integration', () => {
  it('renders the core layout (Header, search bar, grid, Footer)', async () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /available warehouses/i })).toBeInTheDocument(); // Header
    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText(/contact us/i)).toBeInTheDocument(); // Footer
  });

  it('filters listings via search bar', async () => {
    render(<App />);
    // Use testid for search input if available for disambiguation
    // Use the generic input field for search (by aria-label)
    const searchInput = screen.getByLabelText(/search by title|search by title or location/i);
    act(() => {
      fireEvent.change(searchInput, { target: { value: 'Cold' } });
    });
    expect(await screen.findByText(/Cold Storage Facility/)).toBeInTheDocument();
    expect(screen.queryByText(/Modern Logistics Warehouse/)).not.toBeInTheDocument();
  });

  it('shows warehouse details on card click, and closes when clicking close', async () => {
    render(<App />);
    // Wait and click view details button
    const cardBtns = await screen.findAllByRole('button', { name: /view details/i });
    expect(cardBtns.length).toBeGreaterThan(0);
    fireEvent.click(cardBtns[0]);
    // Await dialog and ensure accessible
    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText(/contact now/i)).toBeInTheDocument();
    // Close via close button with testid
    const closeBtn = within(dialog).getByTestId('modal-close-btn');
    fireEvent.click(closeBtn);
    // Wait for modal to disappear if there is animation/delay
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('can open contact form and submit', async () => {
    render(<App />);
    // Open modal
    const cardBtn = (await screen.findAllByRole('button', { name: /view details/i }))[0];
    fireEvent.click(cardBtn);
    // Only search within dialog for Contact Now
    const dialog = await screen.findByRole('dialog');
    const contactBtn = within(dialog).getByRole('button', { name: /contact now/i });
    fireEvent.click(contactBtn);
    expect(within(dialog).getByText(/contact about/i)).toBeInTheDocument();
    // Fill the form (within dialog scope, if it is modal-based)
    fireEvent.change(within(dialog).getByLabelText(/name/i), { target: { value: 'Alice' } });
    fireEvent.change(within(dialog).getByLabelText(/email/i), { target: { value: 'alice@example.com' } });
    fireEvent.change(within(dialog).getByLabelText(/phone/i), { target: { value: '9876543210' } });
    fireEvent.change(within(dialog).getByLabelText(/message/i), { target: { value: 'Enquiry' } });
    fireEvent.submit(within(dialog).getByRole('form'));
    expect(await within(dialog).findByText(/thank you for your interest/i)).toBeInTheDocument();
    // Close form using testid (unique inside contact form content)
    const closeBtn = within(dialog).getByTestId('contact-close-btn');
    fireEvent.click(closeBtn);
    // Await that the thank-you message is gone (form is closed)
    expect(await screen.queryByText(/thank you for your interest/i)).not.toBeInTheDocument();
  });

  it('shows error on invalid contact form', async () => {
    render(<App />);
    const cardBtn = (await screen.findAllByRole('button', { name: /view details/i }))[0];
    fireEvent.click(cardBtn);
    const dialog = await screen.findByRole('dialog');
    const contactNowBtn = within(dialog).getByRole('button', { name: /contact now/i });
    fireEvent.click(contactNowBtn);
    fireEvent.change(within(dialog).getByLabelText(/email/i), { target: { value: 'not-an-email' } });
    fireEvent.change(within(dialog).getByLabelText(/name/i), { target: { value: '' } });
    fireEvent.change(within(dialog).getByLabelText(/phone/i), { target: { value: '12' } });
    fireEvent.change(within(dialog).getByLabelText(/message/i), { target: { value: '' } });
    fireEvent.submit(within(dialog).getByRole('form'));
    expect(await within(dialog).findByText(/required/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/invalid email/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/invalid phone/i)).toBeInTheDocument();
  });

  it('theme toggler switches between light/dark modes', () => {
    render(<App />);
    const btn = screen.getByRole('button', { name: /switch to/i });
    const initial = btn.innerHTML;
    fireEvent.click(btn);
    expect(btn.innerHTML).not.toBe(initial);
  });

  it('sidebar filter changes location', () => {
    render(<App />);
    // If there are multiple location radios/buttons, get by unique testid or name for stability
    const radios = screen.getAllByLabelText(/pune/i);
    // If multiple radios, pick the one inside the sidebar/filters container
    const radio = radios[0];
    fireEvent.click(radio);
    expect(radio).toBeChecked();
  });
});
