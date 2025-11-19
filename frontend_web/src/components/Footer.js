import React from 'react';
import { oceanTheme } from '../theme';

/**
 * Footer for Warehouse Rental Platform.
 * Shows contact info and links.
 */
// PUBLIC_INTERFACE
export default function Footer() {
  return (
    <footer
      aria-label="Footer"
      style={{
        width: '100%',
        background: oceanTheme.primary,
        color: '#fff',
        textAlign: 'center',
        padding: '1.3rem 0 1.1rem 0',
        marginTop: '2.5rem',
        fontSize: '1rem',
        borderTopLeftRadius: oceanTheme.borderRadius,
        borderTopRightRadius: oceanTheme.borderRadius,
        boxShadow: oceanTheme.shadow,
        letterSpacing: 0.05
      }}
    >
      <div style={{maxWidth: 1100, margin: '0 auto'}}>
        <span data-testid="footer-contact">
          &copy; {new Date().getFullYear()} SHAKS Warehouse Rentals &ndash;{' '}
          <a
            href="mailto:info@shaksrentals.com"
            style={{color: oceanTheme.secondary, fontWeight: 600, textDecoration: 'underline'}}
            aria-label="Email SHAKS Shed on Rent contact"
          >Contact Us</a>
        </span>
        <span style={{display: 'inline-block', marginLeft: 24, color: '#cbd5e1', fontWeight: 400, fontSize: '0.93em'}}
          data-testid="footer-copyright"
        >
          Mumbai, Delhi, Pune, Bangalore, Hyderabad
        </span>
      </div>
    </footer>
  );
}
