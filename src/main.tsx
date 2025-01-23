import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App.tsx';
import './index.css';

// Create root
const root = createRoot(document.getElementById('root')!);

// Render app
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((registration) => {
        console.log('ServiceWorker registration successful');
      })
      .catch((err) => {
        console.error('ServiceWorker registration failed:', err);
      });
  });
}
