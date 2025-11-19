import React from 'react';
import { oceanTheme } from '../theme';

// PUBLIC_INTERFACE
/**
 * Header/nav for the Warehouse Rental Platform
 */
export default function Header() {
  return (
    <header
      style={{
        width: '100%',
        background: oceanTheme.gradient,
        borderBottom: `1.5px solid ${oceanTheme.primary}11`,
        boxShadow: oceanTheme.shadow,
        padding: '1.5rem 0 1rem 0',
        marginBottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
      }}
      aria-label="Site Header"
    >
      <div style={{
        width: '94vw',
        maxWidth: 1250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
      }}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
          <span aria-label="Warehouse Rental Platform" style={{
            fontWeight: 700,
            fontSize: 22,
            color: oceanTheme.primary,
            letterSpacing: 0.6,
          }}>SHAKS <span style={{color: oceanTheme.secondary}}>Warehouses</span></span>
          <span
            style={{
              background: oceanTheme.secondary,
              color: '#fff',
              fontWeight: 600,
              fontSize: 13,
              padding: '2.5px 10px',
              borderRadius: 9,
              marginLeft: 8,
              opacity: 0.96
            }}
          >Rentals</span>
        </div>
        <nav>
          {/* In real app: add nav+active, here just Home */}
          <a href="/" style={{
            color: oceanTheme.text,
            fontWeight: 500,
            fontSize: 16,
            textDecoration: 'none',
            padding: '6px 0',
            borderBottom: `2.5px solid ${oceanTheme.primary}`,
            marginRight: 15,
            background: 'none'
          }}>Home</a>
        </nav>
      </div>
    </header>
  );
}
