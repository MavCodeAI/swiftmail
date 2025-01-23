import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Declare Umami types
declare global {
  interface Window {
    umami?: {
      trackView?: (url: string) => void;
    };
  }
}

export const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track with Umami if available
    const trackUmami = () => {
      try {
        if (typeof window.umami?.trackView === 'function') {
          window.umami.trackView(location.pathname);
        }
      } catch (error) {
        console.debug('Umami analytics not available');
      }
    };

    trackUmami();
  }, [location]);

  return null;
};
