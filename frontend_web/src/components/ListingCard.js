import React from 'react';
import { oceanTheme } from '../theme';

/**
 * Warehouse listing summary card.
 * Props:
 *  listing: object, required
 *  onClick: function/listing (open details)
 */
// PUBLIC_INTERFACE
export default function ListingCard({ listing, onClick, index }) {
  return (
    <article
      className="warehouse-listing-card"
      tabIndex={0}
      role="button"
      aria-label={`View details for ${listing.title}`}
      onClick={() => onClick(listing)}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { onClick(listing); }}}
      style={{
        background: oceanTheme.surface,
        border: `1.3px solid ${oceanTheme.primary}11`,
        borderRadius: oceanTheme.cardRadius,
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 272,
        maxWidth: 385,
        boxShadow: oceanTheme.cardShadow,
        cursor: 'pointer',
        transition: oceanTheme.transition
      }}
    >
      <div style={{
        width: '100%',
        height: 155,
        background: '#e5eafe',
        overflow: 'hidden'
      }}>
        <img
          src={listing.image}
          alt={`${listing.title} - warehouse`}
          style={{ height: '100%', width: '100%', objectFit: 'cover', borderBottom: `1px solid ${oceanTheme.primary}16` }}
        />
      </div>
      <div style={{ padding: '1.13rem 1.05rem 0.78rem 1.11rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontWeight: 700, fontSize: 18, color: oceanTheme.primary, marginBottom: 2 }}>{listing.title}</div>
        <div style={{
          color: '#64748B', fontSize: 14, margin: '3px 0 2px 0'
        }}>
          {listing.location} &bull; {listing.area.toLocaleString()} sq ft
        </div>
        <div style={{
          color: oceanTheme.text, fontWeight: 600, fontSize: 15,
          margin: '4px 0 9px 0'
        }}>
          ₹{listing.price.toLocaleString()}/mo
        </div>
        <div style={{ flex: 1, minHeight: 32 }}>
          <ul style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap'
          }}>
            {listing.features.map(f => (
              <li key={f} style={{
                background: oceanTheme.secondary+'17',
                color: oceanTheme.secondary,
                fontWeight: 600,
                fontSize: 12.7,
                borderRadius: 7,
                padding: '2.5px 9px'
              }}>{f}</li>
            ))}
          </ul>
        </div>
        <button
          tabIndex={0}
          style={{
            background: oceanTheme.primary,
            color: '#fff',
            border: 'none',
            borderRadius: 9,
            padding: '7px 0 7px 0',
            fontWeight: 600,
            fontSize: 14,
            marginTop: 10,
            transition: oceanTheme.transition,
            boxShadow: '0 1.5px 5px rgba(37,99,235,0.05)'
          }}
          aria-label={`Open details for ${listing.title}`}
          data-testid={`details-btn-${listing?.id ?? index ?? 'unknown'}`}
        >View Details</button>
      </div>
    </article>
  );
}
