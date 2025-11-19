import { render, screen, cleanup } from '@testing-library/react';
import AppRouter from '../AppRouter';

afterEach(cleanup);

describe('App Routing', () => {
  test('renders Home page for / route', () => {
    render(<AppRouter />);
    expect(screen.getByRole('heading', { name: /warehouse/i })).toBeInTheDocument();
  });

  // Note: Not possible to test 404/unknown route with current AppRouter implementation.
  // If in the future AppRouter is refactored to accept initial entries or a memory router, enable such tests here.
});
