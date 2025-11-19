import { render, screen, fireEvent, act } from '@testing-library/react';
import App from '../App';

// PUBLIC_INTERFACE
describe('Warehouse Rental Platform Integration', () => {
  it('renders the core layout (Header, search bar, grid, Footer)', async () => {
    render(<App />);
    expect(screen.getByText(/warehouses/i)).toBeInTheDocument(); // Header
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText(/contact us/i)).toBeInTheDocument(); // Footer
  });

  it('filters listings via search bar', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/search title/i);
    act(() => {
      fireEvent.change(searchInput, { target: { value: 'Cold' } });
    });
    expect(await screen.findByText(/Cold Storage Facility/)).toBeInTheDocument();
    expect(screen.queryByText(/Modern Logistics Warehouse/)).not.toBeInTheDocument();
  });

  it('shows warehouse details on card click, and closes when clicking close', async () => {
    render(<App />);
    // Click first visible warehouse card
    const cardBtn = await screen.findByRole('button', { name: /details/i });
    fireEvent.click(cardBtn);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/contact now/i)).toBeInTheDocument();
    const closeBtn = screen.getByRole('button', { name: /close details/i });
    fireEvent.click(closeBtn);
    // Modal should be gone
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('can open contact form and submit', async () => {
    render(<App />);
    // Open modal
    const cardBtn = await screen.findByRole('button', { name: /details/i });
    fireEvent.click(cardBtn);
    // Click "Contact Now"
    const contactBtn = screen.getByRole('button', { name: /contact about/i });
    fireEvent.click(contactBtn);
    expect(screen.getByText(/contact about/i)).toBeInTheDocument();
    // Fill the form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'alice@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Enquiry' } });
    fireEvent.submit(screen.getByRole('form'));
    expect(await screen.findByText(/thank you for your interest/i)).toBeInTheDocument();
    // Close form
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByText(/thank you for your interest/i)).not.toBeInTheDocument();
  });

  it('shows error on invalid contact form', async () => {
    render(<App />);
    const cardBtn = await screen.findByRole('button', { name: /details/i });
    fireEvent.click(cardBtn);
    fireEvent.click(screen.getByRole('button', { name: /contact now/i }));
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'not-an-email' } });
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '12' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: '' } });
    fireEvent.submit(screen.getByRole('form'));
    expect(await screen.findByText(/required/)).toBeInTheDocument();
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    expect(screen.getByText(/invalid phone/i)).toBeInTheDocument();
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
    const radio = screen.getByLabelText(/pune/i);
    fireEvent.click(radio);
    expect(radio).toBeChecked();
  });
});
