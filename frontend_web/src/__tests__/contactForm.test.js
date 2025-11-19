import { render, screen, fireEvent, act } from '@testing-library/react';
import ContactForm from '../components/ContactForm';

const listing = {
  id: 4,
  title: 'Large Distribution Center',
};

describe('ContactForm', () => {
  it('renders all fields, header, and buttons', () => {
    render(<ContactForm listing={listing} onSubmit={jest.fn()} />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByTestId('contact-submit-btn')).toBeInTheDocument();
  });

  it('shows error messages when submitting invalid data', async () => {
    render(<ContactForm listing={listing} onSubmit={jest.fn()} />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'bademail' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '12' } });
    fireEvent.submit(screen.getByRole('form'));
    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
    expect(await screen.findByText(/invalid phone/i)).toBeInTheDocument();
    expect(await screen.findByText(/name required/i)).toBeInTheDocument();
    expect(await screen.findByText(/please enter a message/i)).toBeInTheDocument();
  });

  it('successfully submits valid form and calls onSubmit', async () => {
    jest.useFakeTimers();
    const onSubmit = jest.fn();
    render(<ContactForm listing={listing} onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'alice@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hi!' } });
    fireEvent.submit(screen.getByRole('form'));

    // Wait for fake timer to elapse
    await act(async () => {
      jest.advanceTimersByTime(700);
    });
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Alice',
      email: 'alice@example.com',
      phone: '9876543210',
      message: 'Hi!',
    });
    expect(screen.getByText(/thank you for your interest/i)).toBeInTheDocument();
    jest.useRealTimers();
  });

  it('cancel and close buttons work', () => {
    const onCancel = jest.fn();
    render(<ContactForm listing={listing} onCancel={onCancel} />);
    fireEvent.click(screen.getByTestId('contact-cancel-btn'));
    expect(onCancel).toHaveBeenCalled();
  });

  it('shows close button after submit and it closes form', async () => {
    jest.useFakeTimers();
    const onCancel = jest.fn();
    render(<ContactForm listing={listing} onSubmit={() => {}} onCancel={onCancel} />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 't@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '9999999999' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hey' } });
    fireEvent.submit(screen.getByRole('form'));
    await act(async () => {
      jest.advanceTimersByTime(700);
    });
    const closeBtn = screen.getByTestId('contact-close-btn');
    expect(closeBtn).toBeInTheDocument();
    fireEvent.click(closeBtn);
    expect(onCancel).toHaveBeenCalled();
    jest.useRealTimers();
  });
});
