import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useSimplePageTransition = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Scroll vers le haut au montage initial
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      // Démarrer l'animation de sortie
      setIsExiting(true);

      // Attendre 600ms puis changer la page
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setIsExiting(false);
        // Scroll vers le haut de la page
        window.scrollTo(0, 0);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, displayLocation.pathname]);

  return {
    displayLocation,
    isExiting
  };
};

export default useSimplePageTransition;
