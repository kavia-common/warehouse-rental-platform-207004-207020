import React, { useEffect, useState } from 'react';
import { getWarehouseListings } from '../mockData';
import SearchFilterBar from '../components/SearchFilterBar';
import ListingsGrid from '../components/ListingsGrid';
import SidebarFilters from '../components/SidebarFilters';
import ListingDetailsModal from '../components/ListingDetailsModal';
import ContactForm from '../components/ContactForm';

// PUBLIC_INTERFACE
/**
 * Home page: warehouse listings with filter and grid results
 */
export default function Home() {
  const [filters, setFilters] = useState({
    searchText: '',
    location: 'Any',
    minArea: '',
    maxPrice: '',
    resultsText: ''
  });
  const [listings, setListings] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    let active = true;
    getWarehouseListings(filters).then(data => {
      if (!active) return;
      setListings(data);
      let text = data.length
        ? `${data.length} warehouse${data.length > 1 ? 's' : ''} found`
        : 'No results';
      setFilters(f => ({ ...f, resultsText: text }));
    });
    return () => { active = false; };
  }, [filters.searchText, filters.location, filters.minArea, filters.maxPrice]);

  function resetModal() {
    setSelected(null);
    setShowContact(false);
  }

  // PUBLIC_INTERFACE
  function handleContact(formData) {
    setShowContact('sent');
    setTimeout(resetModal, 800);
  }

  return (
    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%', maxWidth: 1400, margin: '0 auto', minHeight: 420, gap: '0.3vw'}}>
      <div style={{display: 'none', flex: '0 0 210px'}} id="sidebar-desktop">
        {/* Reserved: sidebar for large screens (future extensions) */}
      </div>
      <div
        style={{width: '100%', flex: 1, minWidth: 0, padding: '1.7rem 1vw 0 1vw'}}
        aria-label="Main content"
      >
        <SearchFilterBar
          onChange={vals => setFilters(f => ({...f, ...vals}))}
          values={filters}
        />
        <ListingsGrid
          listings={listings}
          onCardClick={l => setSelected(l)}
        />
      </div>
      {/* Sidebar for filter */}
      <div style={{minWidth: 220, maxWidth: 280, marginTop: 19, display: window.innerWidth > 990 ? 'block' : 'none'}}>
        <SidebarFilters
          onChange={vals => setFilters(f => ({...f, ...vals}))}
          values={filters}
        />
      </div>
      {selected &&
        <ListingDetailsModal
          listing={selected}
          onClose={resetModal}
          onContact={() => setShowContact(true)}
          showContactForm={!showContact}
        />
      }
      {selected && showContact &&
        <div style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(17,24,39,0.13)',
          zIndex: 150,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <ContactForm
            listing={selected}
            onSubmit={handleContact}
            onCancel={resetModal}
          />
        </div>
      }
    </div>
  );
}
