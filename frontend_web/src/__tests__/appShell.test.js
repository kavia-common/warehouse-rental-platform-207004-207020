import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App from '../App';

/**
 * Tests for the application shell (header, main content, footer, theme)
 */
afterEach(cleanup);

describe('App Shell', () => {
  test('renders header and branding elements', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /switch to dark mode|switch to light mode/i })).toBeInTheDocument();
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
    // Don't check for 'current theme:' text (no such UI in header) -- removed as obsolete
    // Removed CRA/boilerplate assertions for "edit app.js" and "learn react"
  });

  test('theme toggle button switches theme', () => {
    render(<App />);
    const btn = screen.getByRole('button', { name: /switch to dark mode|switch to light mode/i });
    // Expect button to toggle theme text
    const initialText = btn.textContent;
    fireEvent.click(btn);
    expect(btn.textContent).not.toBe(initialText);
  });

  test('footer is not rendered (stub for future footer)', () => {
    // Future test - if App.js adds a footer, assert existence here
    render(<App />);
    expect(screen.queryByText(/footer/i)).not.toBeInTheDocument();
  });
});
