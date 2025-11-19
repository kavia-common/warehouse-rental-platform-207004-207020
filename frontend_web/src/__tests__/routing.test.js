import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRouter from '../AppRouter';

describe('App Routing', () => {
  test('renders Home page for / route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByText(/warehouse/i)).toBeInTheDocument();
  });

  test('renders 404 page for unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/not-a-real-page']}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
