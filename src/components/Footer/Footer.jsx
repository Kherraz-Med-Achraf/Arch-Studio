import React, { useLayoutEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Footer.module.scss";
import Logo from "../../assets/logo.svg?react";
import IconArrow from "../../assets/icons/icon-arrow.svg?react";

const Footer = () => {
  const rootRef = useRef(null);
  const innerRef = useRef(null);
  const hasAnimated = useRef(false);

  useLayoutEffect(() => {
    if (hasAnimated.current) return; // Empêcher l'animation de se rejouer

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Gestion responsive avec matchMedia
      const mm = gsap.matchMedia();

      // Mobile : animations simplifiées
      mm.add("(max-width: 767px)", () => {
        // État initial plus simple pour mobile
        gsap.set(innerRef.current, {
          autoAlpha: 0,
          y: 30, // Valeur fixe plus petite pour mobile
          scale: 0.98, // Scale moins prononcé
        });

        // Animation simplifiée pour mobile
        gsap.to(innerRef.current, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1, // Durée réduite pour mobile
          ease: "power2.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 90%", // Déclenchement plus tard pour mobile
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
            once: true,
          },
          onComplete: () => {
            hasAnimated.current = true;
          },
        });
      });

      // Tablet : animations intermédiaires
      mm.add("(min-width: 768px) and (max-width: 1439px)", () => {
        // État initial pour tablet
        gsap.set(innerRef.current, {
          autoAlpha: 0,
          y: 40, // Valeur intermédiaire pour tablet
          scale: 0.96,
        });

        // Animation adaptée pour tablet
        gsap.to(innerRef.current, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 87%", // Déclenchement adapté pour tablet
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
            once: true,
          },
          onComplete: () => {
            hasAnimated.current = true;
          },
        });
      });

      // Desktop : animations normales
      mm.add("(min-width: 1440px)", () => {
        // État initial : contenu caché et légèrement décalé
        gsap.set(innerRef.current, {
          autoAlpha: 0,
          yPercent: 10, // Utilisation de yPercent pour éviter les problèmes de viewport
          scale: 0.95,
        });

        // Animation avec un léger zoom
        gsap.to(innerRef.current, {
          autoAlpha: 1,
          yPercent: 0,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
            once: true,
          },
          onComplete: () => {
            hasAnimated.current = true;
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className={styles.footer} ref={rootRef}>
      <div className={styles.inner} ref={innerRef}>
        <div className={styles.logoTile}>
          <Logo />
        </div>

        <nav className={styles.navBar} aria-label="Navigation pied de page">
          <ul className={styles.navList}>
            <li>
              <NavLink
                to="/portfolio"
                end
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                Portfolio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        <NavLink to="/portfolio" className={styles.ctaButton}>
          See Our Portfolio <IconArrow className={styles.icon} />
        </NavLink>
      </div>
    </footer>
  );
};

export default Footer;
