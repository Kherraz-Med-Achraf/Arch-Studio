import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useSimplePageTransition = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      // Démarrer l'animation de sortie
      setIsExiting(true);

      // Attendre 600ms puis changer la page
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setIsExiting(false);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, displayLocation.pathname]);

  return {
    displayLocation,
    isExiting
  };
};

export default useSimplePageTransition;
