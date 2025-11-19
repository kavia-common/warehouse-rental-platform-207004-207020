import { render, screen, fireEvent, act, cleanup, within } from '@testing-library/react';
import ContactForm from '../components/ContactForm';

const listing = {
  id: 4,
  title: 'Large Distribution Center',
};

afterEach(cleanup);

describe('ContactForm', () => {
  it('renders all fields, header, and buttons', () => {
    const { container } = render(<ContactForm listing={listing} onSubmit={jest.fn()} />);
    const form = within(container).getByRole('form');
    expect(within(form).getByLabelText(/name/i)).toBeInTheDocument();
    expect(within(form).getByLabelText(/email/i)).toBeInTheDocument();
    expect(within(form).getByLabelText(/phone/i)).toBeInTheDocument();
    expect(within(form).getByLabelText(/message/i)).toBeInTheDocument();
    expect(within(form).getByTestId('contact-submit-btn')).toBeInTheDocument();
  });

  it('shows error messages when submitting invalid data', async () => {
    const { container } = render(<ContactForm listing={listing} onSubmit={jest.fn()} />);
    const form = within(container).getByRole('form');
    fireEvent.change(within(form).getByLabelText(/email/i), { target: { value: 'bademail' } });
    fireEvent.change(within(form).getByLabelText(/phone/i), { target: { value: '12' } });
    fireEvent.submit(form);
    expect(await within(form).findByText(/invalid email/i)).toBeInTheDocument();
    expect(await within(form).findByText(/invalid phone/i)).toBeInTheDocument();
    expect(await within(form).findByText(/name required/i)).toBeInTheDocument();
    expect(await within(form).findByText(/please enter a message/i)).toBeInTheDocument();
  });

  it('successfully submits valid form and calls onSubmit', async () => {
    jest.useFakeTimers();
    const onSubmit = jest.fn();
    const { container } = render(<ContactForm listing={listing} onSubmit={onSubmit} />);
    const form = within(container).getByRole('form');
    fireEvent.change(within(form).getByLabelText(/name/i), { target: { value: 'Alice' } });
    fireEvent.change(within(form).getByLabelText(/email/i), { target: { value: 'alice@example.com' } });
    fireEvent.change(within(form).getByLabelText(/phone/i), { target: { value: '9876543210' } });
    fireEvent.change(within(form).getByLabelText(/message/i), { target: { value: 'Hi!' } });
    fireEvent.submit(form);
    await act(async () => { jest.advanceTimersByTime(700); });
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Alice',
      email: 'alice@example.com',
      phone: '9876543210',
      message: 'Hi!',
    });
    expect(within(container).getByText(/thank you for your interest/i)).toBeInTheDocument();
    jest.useRealTimers();
  });

  it('cancel and close buttons work', () => {
    const onCancel = jest.fn();
    const { container } = render(<ContactForm listing={listing} onCancel={onCancel} />);
    // If cancel is inside form, use within(form)
    const form = within(container).getByRole('form');
    fireEvent.click(within(form).getByTestId('contact-cancel-btn'));
    expect(onCancel).toHaveBeenCalled();
  });

  it('shows close button after submit and it closes form', async () => {
    jest.useFakeTimers();
    const onCancel = jest.fn();
    const { container } = render(<ContactForm listing={listing} onSubmit={() => {}} onCancel={onCancel} />);
    const form = within(container).getByRole('form');
    fireEvent.change(within(form).getByLabelText(/name/i), { target: { value: 'Test User' } });
    fireEvent.change(within(form).getByLabelText(/email/i), { target: { value: 't@example.com' } });
    fireEvent.change(within(form).getByLabelText(/phone/i), { target: { value: '9999999999' } });
    fireEvent.change(within(form).getByLabelText(/message/i), { target: { value: 'Hey' } });
    fireEvent.submit(form);
    await act(async () => { jest.advanceTimersByTime(700); });
    const closeBtn = within(container).getByTestId('contact-close-btn');
    expect(closeBtn).toBeInTheDocument();
    fireEvent.click(closeBtn);
    expect(onCancel).toHaveBeenCalled();
    jest.useRealTimers();
  });
});
