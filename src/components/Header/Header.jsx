import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";
import VerticalNavLabel from "../VerticalNavLabel/VerticalNavLabel";

import styles from "./Header.module.scss";
import Logo from "../../assets/logo.svg?react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const overlayRef = useRef(null);

  // Refs pour l'animation d'entrée
  const logoRef = useRef(null);
  const burgerRef = useRef(null);
  const navItemRefs = useRef([]);
  // Réinitialiser le tableau de refs à chaque rendu
  navItemRefs.current = [];

  // Animation d'ouverture / fermeture du menu + overlay
  useEffect(() => {
    const elem = menuRef.current;
    const overlay = overlayRef.current;
    if (!elem || !overlay) return;

    // Activer / désactiver les interactions sur l'overlay
    overlay.style.pointerEvents = menuOpen ? "auto" : "none";

    if (menuOpen) {
      gsap.to(elem, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power1.out",
      });
      gsap.to(overlay, {
        opacity: 0.5,
        duration: 0.4,
        ease: "power1.out",
      });
    } else {
      gsap.to(elem, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power1.in",
      });
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: "power1.in",
      });
    }
  }, [menuOpen]);

  // Animation d'entrée du header (logo + navigation)
  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      delay: 0.5, // synchronisation avec VerticalNavLabel
    });

    if (logoRef.current) {
      gsap.set(logoRef.current, {
        y: 40,
      });

      // Animation vers l'état final
      tl.to(logoRef.current, {
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    }

    if (burgerRef.current) {
      gsap.set(burgerRef.current, {
        x: 48,
      });

      // Animation fade de gauche vers la droite
      tl.to(
        burgerRef.current,
        {
          x: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "<"
      );
    }

    if (navItemRefs.current.length) {
      gsap.set(navItemRefs.current, { y: 40 });

      tl.to(
        navItemRefs.current,
        {
          y: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.5"
      );
    }
  }, []);

  // Fermer le menu lors d'un clic sur un lien
  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <header className={styles.header}>
        <VerticalNavLabel />
        <div className={styles.logo}>
          <NavLink to="/" onClick={handleNavClick} ref={logoRef}>
            <Logo />
          </NavLink>
        </div>

        {/* Burger */}
        <button
          ref={burgerRef}
          className={`${styles.burger} ${menuOpen ? styles.open : ""}`}
          aria-label="Ouvrir / fermer le menu principal"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation – mobile d'abord */}
        <nav ref={menuRef} className={styles.navMobile}>
          <ul className={styles.navList}>
            <li>
              <NavLink
                ref={(el) => el && navItemRefs.current.push(el)}
                to="/portfolio"
                end
                onClick={handleNavClick}
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                Portfolio
              </NavLink>
            </li>
            <li>
              <NavLink
                ref={(el) => el && navItemRefs.current.push(el)}
                to="/about"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                ref={(el) => el && navItemRefs.current.push(el)}
                to="/contact"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div
        ref={overlayRef}
        className={styles.overlay}
        onClick={() => setMenuOpen(false)}
      ></div>
    </>
  );
};

export default Header;
