import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';

// PUBLIC_INTERFACE
/**
 * Application routes.
 * For now, only Home ("/"), can add more pages (details, about etc.)
 */
export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* For future detail pages (currently shown as modal only) */}
        {/* <Route path="/listing/:listingId" element={<ListingDetailsPage />} /> */}
        {/* <Route path="/contact" element={<ContactPage />} /> */}
        <Route path="*" element={<div style={{padding: 80, textAlign: 'center'}}>Page not found.</div>} />
      </Routes>
    </Router>
  );
}
