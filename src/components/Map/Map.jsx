import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.scss";
import mapIcon from "../../assets/icons/icon-map.svg";

// Configuration Leaflet pour éviter les problèmes de cache
L.Icon.Default.imagePath =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/";

// Correction des icônes par défaut de Leaflet
delete L.Icon.Default.prototype._getIconUrl;

// Créer une icône personnalisée avec notre SVG
const createCustomIcon = () => {
  const size = [40, 48]; // Plus grande taille pour mobile
  const iconWidth = 40;
  const iconHeight = 48;

  return new L.Icon({
    iconUrl: mapIcon,
    iconSize: size,
    iconAnchor: [iconWidth / 2, iconHeight],
    popupAnchor: [0, -iconHeight],
    className: "custom-marker-icon",
    shadowUrl: null,
    shadowSize: null,
  });
};

// Données de géolocalisation pour les adresses
const officeLocations = {
  main: {
    lat: 36.1627, // Tennessee approximation
    lng: -86.7816,
    zoom: 16, // Zoom plus élevé pour vraiment voir la location
  },
  office2: {
    lat: 29.7604, // Texas approximation
    lng: -95.3698,
    zoom: 16, // Zoom plus élevé pour vraiment voir la location
  },
};

// Composant pour capturer l'instance de la carte avec useMap
const MapController = ({ selectedOfficeId, onMapReady, markerRefs }) => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      onMapReady(map);
    }
  }, [map, onMapReady]);

  // Gérer la navigation quand selectedOfficeId change
  useEffect(() => {
    if (!selectedOfficeId || !map) return;

    const location = officeLocations[selectedOfficeId];
    if (!location) {
      return;
    }

    try {
      // Fermer toutes les popups ouvertes
      map.closePopup();

      // Animation plus fluide avec flyTo
      map.flyTo([location.lat, location.lng], location.zoom, {
        animate: true,
        duration: 2.5,
        easeLinearity: 0.5,
      });

      // Ouvrir automatiquement la popup après l'animation
      setTimeout(() => {
        const markerRef = markerRefs.current[selectedOfficeId];
        if (markerRef) {
          markerRef.openPopup();
        }
      }, 2500); // Attendre que l'animation se termine
    } catch (error) {
      console.error("Erreur lors de l'animation de la carte:", error);
    }
  }, [selectedOfficeId, map, markerRefs]);

  return null; // Ce composant ne rend rien
};

const Map = ({ offices, selectedOfficeId, onMarkerClick }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const markerRefs = useRef({}); // Références pour tous les markers
  const [currentPosition] = useState({
    lat: 33.0, // Centre entre TN (36°) et TX (29°)
    lng: -91.0, // Centre entre TN (-86°) et TX (-95°)
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [zoom] = useState(isMobile ? 5 : 5.5); // Zoom pour voir les deux états

  // Animation GSAP d'entrée
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Gestion responsive avec matchMedia
      const mm = gsap.matchMedia();

      // Mobile : animations simplifiées
      mm.add("(max-width: 767px)", () => {
        // État initial simplifié pour mobile
        gsap.set(mapContainerRef.current, {
          autoAlpha: 0,
          y: 30,
          scale: 0.98,
        });

        // Animation d'entrée simplifiée pour mobile
        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: mapContainerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        });

        mobileTl.to(mapContainerRef.current, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => {
            handleMapAnimationComplete();
          },
        });
      });

      // Tablet et Desktop : animations normales
      mm.add("(min-width: 768px)", () => {
        // État initial de la carte
        gsap.set(mapContainerRef.current, {
          autoAlpha: 0,
          scale: 0.95,
          y: 60,
          rotationX: 5,
        });

        // Animation d'entrée de la carte avec timeline
        const desktopTl = gsap.timeline({
          scrollTrigger: {
            trigger: mapContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        });

        // Animation principale de la carte
        desktopTl.to(mapContainerRef.current, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          ease: "power2.out",
          onComplete: () => {
            handleMapAnimationComplete();
          },
        });
      });

      // Fonction commune pour gérer la fin d'animation
      const handleMapAnimationComplete = () => {
        // Une fois l'animation terminée, invalider la taille de la carte
        if (mapInstance) {
          setTimeout(() => {
            invalidateMapSize(mapInstance);
          }, 150);
        }

        // Animer les markers après l'apparition de la carte avec délai
        setTimeout(() => {
          animateMarkers();
        }, 200);
      };
    }, mapContainerRef);

    return () => ctx.revert();
  }, [mapInstance]);

  // Fonction pour cacher initialement tous les markers
  const hideMarkersInitially = () => {
    const markers = document.querySelectorAll(".custom-marker-icon");
    if (markers.length > 0) {
      gsap.set(markers, {
        scale: 0,
        rotation: 180,
        autoAlpha: 0, // Complètement cachés
      });
    }
  };

  // Observer pour cacher les markers dès leur apparition
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          // Chercher les nouveaux markers ajoutés
          const newMarkers = Array.from(mutation.addedNodes).filter(
            (node) =>
              node.nodeType === Node.ELEMENT_NODE &&
              (node.classList?.contains("custom-marker-icon") ||
                node.querySelector?.(".custom-marker-icon"))
          );

          if (newMarkers.length > 0) {
            // Cacher immédiatement les nouveaux markers
            setTimeout(() => hideMarkersInitially(), 10);
          }
        }
      });
    });

    // Observer le conteneur de la carte pour détecter l'ajout de markers
    if (mapContainerRef.current) {
      observer.observe(mapContainerRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => observer.disconnect();
  }, []);

  // Fonction pour animer les markers
  const animateMarkers = () => {
    const markers = document.querySelectorAll(".custom-marker-icon");
    if (markers.length === 0) {
      // Si les markers ne sont pas encore disponibles, réessayer
      setTimeout(animateMarkers, 100);
      return;
    }

    // S'assurer que les markers sont cachés avant l'animation
    gsap.set(markers, {
      scale: 0,
      rotation: 180,
      autoAlpha: 0,
    });

    // Animation stagger des markers avec révélation
    const isMobile = window.innerWidth <= 767;

    gsap.to(markers, {
      scale: 1,
      rotation: 0,
      autoAlpha: 1, // Les révéler
      duration: isMobile ? 0.4 : 0.6, // Plus rapide sur mobile
      ease: isMobile ? "power2.out" : "back.out(1.4)", // Ease plus simple sur mobile
      stagger: {
        amount: isMobile ? 0.2 : 0.3, // Stagger réduit sur mobile
        from: "start",
      },
    });
  };

  // Fonction pour invalider la taille de la carte avec retry pour mobile
  const invalidateMapSize = (map, retries = 3) => {
    if (!map) return;

    const attemptInvalidate = (attempt = 0) => {
      try {
        map.invalidateSize();

        // Vérifier si la carte s'affiche correctement après invalidation
        setTimeout(() => {
          if (attempt < retries) {
            const container = map.getContainer();
            if (
              container &&
              (container.clientWidth === 0 || container.clientHeight === 0)
            ) {
              attemptInvalidate(attempt + 1);
            }
          }
        }, 100 * (attempt + 1)); // Délai croissant
      } catch (error) {
        console.warn("Erreur lors de l'invalidation de la carte:", error);
      }
    };

    attemptInvalidate();
  };

  // Force le recalcul de la taille de la carte après montage + resize/orientation
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    // Premier invalidation avec délai pour laisser le layout se stabiliser
    setTimeout(() => {
      invalidateMapSize(map);
    }, 150);

    const reflow = () => invalidateMapSize(map);

    window.addEventListener("resize", reflow);
    window.addEventListener("orientationchange", reflow);

    // Correction supplémentaire pour mobile : détecter quand la carte devient visible
    const handleVisibilityChange = () => {
      if (!document.hidden && mapRef.current) {
        setTimeout(() => invalidateMapSize(mapRef.current), 100);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("resize", reflow);
      window.removeEventListener("orientationchange", reflow);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Callback pour recevoir l'instance de la carte depuis MapController
  const handleMapReady = (map) => {
    mapRef.current = map;
    setMapInstance(map);

    // Invalider la taille pour les problèmes mobile
    setTimeout(() => {
      invalidateMapSize(map);
    }, 150);

    // Cacher les markers existants dès que la carte est prête
    setTimeout(() => {
      hideMarkersInitially();
    }, 200);
  };

  return (
    <div className={styles.mapContainer} ref={mapContainerRef}>
      <MapContainer
        center={[currentPosition.lat, currentPosition.lng]}
        zoom={zoom}
        className={styles.leafletMap}
        zoomControl={true}
        touchZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        tap={true}
      >
        {/* Composant pour gérer l'instance de la carte et la navigation */}
        <MapController
          selectedOfficeId={selectedOfficeId}
          onMapReady={handleMapReady}
          markerRefs={markerRefs}
        />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {offices.map((office) => {
          const location = officeLocations[office.id];
          if (!location) return null;

          return (
            <Marker
              key={office.id}
              position={[location.lat, location.lng]}
              icon={createCustomIcon()}
              eventHandlers={{
                click: () => onMarkerClick && onMarkerClick(office.id),
              }}
              ref={(markerRef) => {
                if (markerRef) {
                  markerRefs.current[office.id] = markerRef;
                }
              }}
            >
              <Popup className={styles.customPopup} closeOnClick={false}>
                <div className={styles.popupContent}>
                  <h3 className={styles.popupTitle}>{office.title}</h3>
                  <div className={styles.popupDetails}>
                    <p>
                      <strong>Adresse:</strong> {office.address}
                    </p>
                    <p>
                      <strong>Email:</strong> {office.email}
                    </p>
                    <p>
                      <strong>Téléphone:</strong> {office.phone}
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
