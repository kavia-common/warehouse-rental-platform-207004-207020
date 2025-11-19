import React from 'react';
import { oceanTheme } from '../theme';

// PUBLIC_INTERFACE
/**
 * Modal for displaying detailed info about a warehouse listing.
 * Props:
 *   listing: object (required)
 *   onClose: function() (required)
 *   onContact: function() (optional)
 *   showContactForm: boolean (default: true)
 */
export default function ListingDetailsModal({ listing, onClose, onContact, showContactForm = true }) {
  if (!listing) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${listing.title}`}
      tabIndex={-1}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        background: 'rgba(17,24,39,0.21)', zIndex: 120,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}
      onClick={onClose}
    >
      <div
        tabIndex={0}
        style={{
          width: '96vw',
          maxWidth: 420,
          background: oceanTheme.surface,
          borderRadius: oceanTheme.cardRadius,
          boxShadow: oceanTheme.shadow,
          padding: '2.1rem 1.7rem 1.3rem 1.7rem',
          outline: 'none',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 0
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close details modal"
          style={{
            position: 'absolute', right: 16, top: 16, background: 'none',
            border: 'none', color: oceanTheme.primary, fontSize: 23, fontWeight: 700, cursor: 'pointer'
          }}
        >&times;</button>
        <img
          src={listing.image}
          alt={listing.title}
          style={{
            width: '100%', height: 170, objectFit: 'cover',
            borderRadius: 8, marginBottom: 13
          }}
        />
        <h2 style={{margin: 0, fontSize: 23, fontWeight: 700, color: oceanTheme.primary}}>{listing.title}</h2>
        <div style={{color: '#6B7280', fontWeight: 500, marginTop: 5}}>
          {listing.location} &bull; {listing.area.toLocaleString()} sq ft
        </div>
        <div style={{margin: '10px 0 8px 0', color: oceanTheme.secondary, fontWeight: 600, fontSize: 17}}>
          ₹{listing.price.toLocaleString()}/month
        </div>
        <div style={{marginBottom: 7, color: oceanTheme.text, fontWeight: 500, fontSize: 15.3}}>
          {listing.description}
        </div>
        <ul style={{
          display: 'flex', gap: 9, listStyle: 'none', padding: 0, margin: 0, flexWrap: 'wrap', marginBottom: 12
        }}>
          {listing.features.map(f => (
            <li key={f} style={{background: oceanTheme.primary+'13',
              color: oceanTheme.primary, borderRadius: 7, padding: '3px 10px', fontWeight: 600, fontSize: 13}}>
              {f}
            </li>
          ))}
        </ul>
        {showContactForm &&
          <button
            onClick={onContact}
            aria-label="Contact about this warehouse"
            style={{
              marginTop: 6,
              background: oceanTheme.secondary,
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 0',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              letterSpacing: 0.05,
              transition: oceanTheme.transition
            }}
          >Contact Now</button>
        }
      </div>
    </div>
  );
}
