import React, { useState } from 'react';
import { oceanTheme } from '../theme';
import { locations } from '../mockData';

// PUBLIC_INTERFACE
/**
 * Search and filter bar for warehouse listings.
 * Props:
 *   onChange: function({searchText, location, minArea, maxPrice})
 *   values: current filter values
 */
export default function SearchFilterBar({ onChange, values }) {
  const [local, setLocal] = useState(values);

  // PUBLIC_INTERFACE
  const handleInput = (e) => {
    const { name, value } = e.target;
    const next = { ...local, [name]: value };
    setLocal(next);
    onChange(next);
  };

  return (
    <form
      aria-label="Search and Filter Bar"
      style={{
        background: '#ffffffcc',
        boxShadow: oceanTheme.shadow,
        borderRadius: oceanTheme.cardRadius,
        padding: '1.4rem 2rem 1.1rem 2rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 24,
        transition: oceanTheme.transition,
      }}
      role="search"
      onSubmit={e => e.preventDefault()}
    >
      <input
        name="searchText"
        type="search"
        placeholder="Search title or location"
        aria-label="Search by title or location"
        value={local.searchText}
        onChange={handleInput}
        style={{
          flex: 1,
          minWidth: 130,
          fontSize: 16,
          padding: '10px 14px',
          border: `1.5px solid ${oceanTheme.primary}44`,
          borderRadius: 8,
          marginRight: 3,
          outline: 'none',
          transition: oceanTheme.transition,
        }}
      />
      <select
        name="location"
        value={local.location}
        onChange={handleInput}
        aria-label="Filter by location"
        style={{
          fontSize: 15,
          padding: '10px 20px 10px 11px',
          border: `1.5px solid ${oceanTheme.primary}44`,
          borderRadius: 8,
          minWidth: 110,
          background: '#f0f2fa',
          color: oceanTheme.text,
        }}
      >
        <option value="Any">Any Location</option>
        {locations.map(l => (
          <option key={l} value={l}>{l}</option>
        ))}
      </select>
      <input
        name="minArea"
        type="number"
        min={0}
        step={100}
        placeholder="Min area (sq ft)"
        aria-label="Minimum area"
        value={local.minArea}
        onChange={handleInput}
        style={{
          width: 110,
          fontSize: 15,
          padding: '10px 8px',
          border: `1.5px solid ${oceanTheme.primary}44`,
          borderRadius: 8,
        }}
      />
      <input
        name="maxPrice"
        type="number"
        min={0}
        step={100}
        placeholder="Max price (₹/mo)"
        aria-label="Maximum price per month"
        value={local.maxPrice}
        onChange={handleInput}
        style={{
          width: 130,
          fontSize: 15,
          padding: '10px 8px',
          border: `1.5px solid ${oceanTheme.primary}44`,
          borderRadius: 8,
        }}
      />
      <span aria-label="Results Description" style={{
        marginLeft: '2rem',
        color: oceanTheme.secondary,
        fontWeight: 600,
        fontSize: 15
      }}>
        {values.resultsText}
      </span>
    </form>
  );
}
