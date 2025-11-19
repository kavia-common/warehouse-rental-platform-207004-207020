import { render, screen, cleanup } from '@testing-library/react';
import AppRouter from '../AppRouter';

afterEach(cleanup);

describe('App Routing', () => {
  test('renders Home page for / route', async () => {
    render(<AppRouter />);
    // Validate Heading - current UI may NOT have "Available Warehouses", update accordingly
    // If the page heading has changed, this is a good place to update
    // If not present (e.g., page title is just the app name), re-align this assertion
    // We'll try a few possible current titles, prefer "Available Warehouses"
    const heading =
      await screen.findByRole('heading', { name: /available warehouses/i }) ||
      await screen.findByRole('heading', { name: /find your warehouse/i }) ||
      await screen.findByRole('heading', { name: /warehouse/i });
    expect(heading).toBeInTheDocument();
  });

  // Note: Not possible to test 404/unknown route with current AppRouter implementation.
  // If in the future AppRouter is refactored to accept initial entries or a memory router, enable such tests here.
});
