import React from 'react';
import { oceanTheme } from '../theme';
import { locations } from '../mockData';

// PUBLIC_INTERFACE
/**
 * Sidebar filtering component (future extensible)
 * Props:
 *   onChange: function({location})
 *   values: current filter state
 */
export default function SidebarFilters({ onChange, values }) {
  return (
    <aside
      aria-label="Filters Sidebar"
      style={{
        background: '#fff',
        borderRadius: oceanTheme.cardRadius,
        boxShadow: oceanTheme.shadow,
        padding: '1.2rem',
        minWidth: 200,
        marginBottom: '2.4rem',
        marginRight: '2.4rem',
        fontSize: 15,
        color: oceanTheme.text,
      }}
    >
      <div style={{ fontWeight: 600, color: oceanTheme.primary, marginBottom: 10, fontSize: 16 }}>
        Filter by Location
      </div>
      <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
        <li>
          <label style={{cursor: 'pointer', fontWeight: values.location === 'Any' ? 700 : 400}}>
            <input
              type="radio"
              name="location"
              checked={values.location === 'Any'}
              onChange={() => onChange({...values, location: 'Any'})}
              style={{marginRight: 5}}
            />
            Any Location
          </label>
        </li>
        {locations.map(loc => (
          <li key={loc}>
            <label style={{cursor: 'pointer', fontWeight: values.location === loc ? 700 : 400}}>
              <input
                type="radio"
                name="location"
                checked={values.location === loc}
                onChange={() => onChange({...values, location: loc})}
                style={{marginRight: 5}}
              />
              {loc}
            </label>
          </li>
        ))}
      </ul>
    </aside>
  );
}
