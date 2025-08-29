import { useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { gsap } from "gsap";
import styles from "./PageTransition.module.scss";

function PageTransition() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const barsRef = useRef([]);
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const hasMountedRef = useRef(false);
  const lastAnimatedPathRef = useRef(null);

  // Nombre de bandes colorées (modifiable)
  const numBars = 5;
  const bars = useMemo(() => Array.from({ length: numBars }), [numBars]);

  // Nettoyer refs à chaque render
  const setBarRef = (el, index) => {
    if (el) {
      barsRef.current[index] = el;
    }
  };

  useEffect(() => {
    // Ignorer le premier chargement (navigation POP initiale)
    if (navigationType === "POP" && !hasMountedRef.current) {
      hasMountedRef.current = true;
      lastAnimatedPathRef.current = location.pathname; // mémoriser pour éviter double-pass en StrictMode
      return;
    }

    // Éviter les doubles exécutions en StrictMode pour le même pathname
    if (lastAnimatedPathRef.current === location.pathname) {
      return;
    }
    lastAnimatedPathRef.current = location.pathname;
    // Annule une éventuelle anim en cours
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }

    // Rendre le conteneur visible pendant l'anim
    gsap.set(containerRef.current, { visibility: "visible" });
    // Position initiale (style Framer)
    gsap.set(barsRef.current, {
      xPercent: -250,
      skewX: 65,
      transformOrigin: "0% 0%",
    });

    // Slide horizontal avec skew qui revient à 0
    const tl = gsap.timeline({
      onComplete: () => {
        // Cacher le conteneur après anim pour éviter flash
        gsap.set(containerRef.current, { visibility: "hidden" });
      },
    });
    tl.to(barsRef.current, {
      xPercent: 100,
      skewX: 0,
      duration: 2.5,
      ease: "power2.out",
      stagger: 0.1,
    });

    timelineRef.current = tl;

    // Cleanup à l'unmount
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [location.pathname]);

  return (
    <div className={styles.container} aria-hidden="true" ref={containerRef}>
      {bars.map((_, index) => (
        <div
          key={index}
          className={`${styles.bar} ${styles[`bar${index + 1}`]}`}
          ref={(el) => setBarRef(el, index)}
        />
      ))}
    </div>
  );
}

export default PageTransition;
