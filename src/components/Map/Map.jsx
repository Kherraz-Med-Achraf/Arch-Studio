import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
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
  const [mapInstance, setMapInstance] = useState(null);
  const markerRefs = useRef({}); // Références pour tous les markers
  const [currentPosition] = useState({
    lat: 33.0, // Centre entre TN (36°) et TX (29°)
    lng: -91.0, // Centre entre TN (-86°) et TX (-95°)
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [zoom] = useState(isMobile ? 5 : 5.5); // Zoom pour voir les deux états

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
  };

  return (
    <div className={styles.mapContainer}>
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
