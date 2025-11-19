import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRouter from './AppRouter';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App" data-testid="app">
      <Header />
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        style={{
          position: 'fixed',
          top: 19,
          right: 24,
          zIndex: 110,
        }}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <main style={{
        minHeight: 'calc(100vh - 161px)',
        background: 'linear-gradient(120deg, rgba(37,99,235,0.04) 0%, #f9fafb 100%)',
        padding: '0 0 0 0'
      }}>
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}

export default App;
