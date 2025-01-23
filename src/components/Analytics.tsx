import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views
    const trackView = () => {
      if (window.umami) {
        window.umami.trackView(location.pathname);
      }
    };

    trackView();
  }, [location]);

  return null;
};
