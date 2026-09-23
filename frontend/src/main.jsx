import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Mount React only if the current path matches valid React application routes
const mountReactApp = () => {
  const rawPath = window.location.pathname;
  const pathname = rawPath.length > 1 && rawPath.endsWith('/') ? rawPath.slice(0, -1) : rawPath;

  // Mount React for all application SPA routes
  if (pathname.toLowerCase() !== '/') {
    const rootElement = document.getElementById('root');
    if (rootElement) {
      ReactDOM.createRoot(rootElement).render(<App />);
    }
  }
};

mountReactApp();
