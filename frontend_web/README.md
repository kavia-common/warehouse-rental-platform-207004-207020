# Warehouse Rental Platform Frontend

This is the modern, responsive React web app for SHAKS Warehouse Rentals.

## Features

- Browse/search/filter warehouse rental listings.
- View listing details (modal).
- Contact form with validation (UI only).
- Responsive grid & accessible controls.
- Themed "Ocean Professional" blue/amber design.
- >80% test coverage (with tests for grid, filter, details modal, contact, theme toggle).

## Getting Started

```sh
npm install
npm start        # Runs locally at http://localhost:3000
npm test         # Run tests (interactive)
npm run test:coverage   # Collects code coverage
```

## Env Vars

No backend/API calls are made; works with mock data. You may set API base URL envs in `.env` as:

```
REACT_APP_API_BASE=http://localhost:4999
REACT_APP_NODE_ENV=development
# (other .env values for API url are ignored by mock)
```

## Structure

- Main code in `src/`
    - Components: `/components`
    - Pages: `/pages`
    - Mock data/service: `mockData.js`
    - Tests: `src/__tests__/*` and `src/__tests__/warehouseApp.e2e.test.js`
- Custom styles/theme: `theme.js`, `App.css`.

## How to use

- Search/filter listings in real-time (title/location/area/price).
- Click a listing card to view details (modal) and contact.
- Use sidebar or search bar to refine results.
- The theme can be toggled (light/dark) with the floating button.

## Testing

- Tests cover UI, filter/search logic, modals, forms, and accessibility basics.
- Run `npm run test:coverage` to see percentage (should be ≥80%).

> This app is client-only and can be extended for actual APIs.
