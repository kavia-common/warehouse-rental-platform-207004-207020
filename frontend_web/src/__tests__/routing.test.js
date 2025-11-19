import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

/**
 * Skipped test enforcing routing basics. To be enabled/expanded when React Router is integrated.
 */
describe.skip('App Routing', () => {
  test('renders correct page for / route', () => {
    // Replace App with actual routing ancestor when implemented
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
