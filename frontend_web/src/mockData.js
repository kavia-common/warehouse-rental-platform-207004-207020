//
// Mock warehouse listings data and API for the UI
//

// PUBLIC_INTERFACE
export const listings = [
  {
    id: 1,
    title: 'Modern Logistics Warehouse',
    location: 'Mumbai',
    area: 12000,
    price: 65000,
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
    description: 'Spacious logistics warehouse with 24/7 security and loading bays, ideal for FMCG and manufacturing.',
    features: ['CCTV', 'Dock', 'Fire Safety', 'Parking']
  },
  {
    id: 2,
    title: 'Cold Storage Facility',
    location: 'Delhi',
    area: 8000,
    price: 54000,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    description: 'Temperature-controlled cold storage ready for food and pharma, with backup generators.',
    features: ['Cold Storage', 'Generator', 'Easy Highway Access']
  },
  {
    id: 3,
    title: 'Small Industrial Shed',
    location: 'Pune',
    area: 4000,
    price: 30000,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    description: 'Affordable shed ideal for startups or light manufacturing.',
    features: ['Flexible Lease', 'Power', 'Near City']
  },
  {
    id: 4,
    title: 'High-Ceiling Warehouse',
    location: 'Bangalore',
    area: 15000,
    price: 78000,
    image: 'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?auto=format&fit=crop&w=800&q=80',
    description: 'Premium warehouse with high ceiling and loading docks; excellent for large goods or automation.',
    features: ['High Ceiling', 'Dock', 'Automation Ready', 'Security']
  },
  {
    id: 5,
    title: 'Central City Mini Storage',
    location: 'Hyderabad',
    area: 2500,
    price: 17500,
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80',
    description: 'Short-term mini storage in central Hyderabad for last-mile or ecommerce.',
    features: ['Short-term', 'Central', 'Easy Access']
  }
];

// Basic category and filter sample
export const locations = ['Mumbai', 'Delhi', 'Pune', 'Bangalore', 'Hyderabad'];

//
// "fetch" methods to simulate async API
//
export function getWarehouseListings(filters = {}) {
  // filters: {searchText, location, minArea, maxPrice}
  let data = listings;
  if (filters.searchText) {
    const q = filters.searchText.toLowerCase();
    data = data.filter(l =>
      l.title.toLowerCase().includes(q) ||
      l.location.toLowerCase().includes(q)
    );
  }
  if (filters.location && filters.location !== 'Any') {
    data = data.filter(l => l.location === filters.location);
  }
  if (filters.minArea) {
    data = data.filter(l => l.area >= Number(filters.minArea));
  }
  if (filters.maxPrice) {
    data = data.filter(l => l.price <= Number(filters.maxPrice));
  }
  return new Promise(resolve => setTimeout(() => resolve(data), 275));
}

// PUBLIC_INTERFACE
export function getWarehouseById(id) {
  return new Promise(resolve =>
    setTimeout(() => resolve(listings.find(l => l.id === Number(id)) || null), 180)
  );
}
