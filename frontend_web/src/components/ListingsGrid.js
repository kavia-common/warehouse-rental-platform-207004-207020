import React from 'react';
import ListingCard from './ListingCard';

// PUBLIC_INTERFACE
/**
 * Responsive grid for warehouse listing cards.
 * Props:
 *   listings: list of listing objects (required)
 *   onCardClick: function (listing) (required)
 */
export default function ListingsGrid({ listings, onCardClick }) {
  if (!listings.length) {
    return (<div style={{color: '#aaa', textAlign: 'center', margin: 64, fontSize: 21, fontWeight: 600}}>
      No warehouses found.&nbsp;<span role="img" aria-label="Empty">📦</span>
    </div>);
  }
  return (
    <section
      aria-label="Listing Cards"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(288px, 1fr))',
        gap: '2rem',
        width: '100%',
        margin: 0,
        transition: 'all .2s cubic-bezier(0.4,0,0.2,1)'
      }}
    >
      {listings.map(listing => (
        <ListingCard key={listing.id} listing={listing} onClick={onCardClick} />
      ))}
    </section>
  );
}
