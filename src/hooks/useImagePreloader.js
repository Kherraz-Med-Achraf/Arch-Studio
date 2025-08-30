import { useState, useEffect } from 'react';

/**
 * Hook pour précharger les images critiques
 * @param {string[]} imageUrls - Array des URLs d'images à précharger
 * @returns {object} { isLoading, loadedImages, progress }
 */
const useImagePreloader = (imageUrls) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);

  useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) {
      setIsLoading(false);
      return;
    }

    let loadedCount = 0;
    const imagePromises = [];

    imageUrls.forEach((url) => {
      const imagePromise = new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          setLoadedImages(loadedCount);
          resolve(img);
        };
        img.onerror = reject;
        img.src = url;
      });
      imagePromises.push(imagePromise);
    });

    // Attendre que toutes les images soient chargées
    Promise.allSettled(imagePromises)
      .then(() => {
        // Délai minimal pour une meilleure UX
        setTimeout(() => {
          setIsLoading(false);
        }, 100);
      })
      .catch((error) => {
        console.warn('Erreur lors du préchargement des images:', error);
        // Continuer même si certaines images échouent
        setTimeout(() => {
          setIsLoading(false);
        }, 100);
      });

  }, [imageUrls]);

  const progress = imageUrls?.length ? (loadedImages / imageUrls.length) * 100 : 100;

  return { isLoading, loadedImages, progress };
};

export default useImagePreloader;
