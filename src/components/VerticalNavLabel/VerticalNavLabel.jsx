import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import styles from "./VerticalNavLabel.module.scss";

const routeLabels = {
  "/": "HOME",
  "/portfolio": "PORTFOLIO",
  "/projets": "PROJETS",
  "/contact": "CONTACT",
};

export default function VerticalNavLabel() {
  const location = useLocation();
  const lineRef = useRef(null);
  const lettersRef = useRef([]);

  // Réinitialise les refs à chaque rendu
  lettersRef.current = [];

  // Récupère le label selon la route actuelle, sinon "HOME" par défaut
  const label =
    routeLabels[location.pathname] ||
    routeLabels[location.pathname.replace(/\/$/, "")] || // gère le slash final
    "HOME";

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    // Animation de la ligne verticale (de 0 à 104px de hauteur)
    tl.fromTo(lineRef.current, { height: 0 }, { height: 104, duration: 1 })
      // Puis apparition des lettres avec un léger chevauchement
      .fromTo(
        lettersRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05 },
        "-=0.8"
      );
  }, [label]);

  return (
    <div className={styles.verticalNavLabel}>
      {/* Ligne verticale */}
      <div className={styles.line} ref={lineRef} />

      {/* Conteneur des lettres (vertical) */}
      <div className={styles.text}>
        {label.split("").map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              lettersRef.current[i] = el;
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
