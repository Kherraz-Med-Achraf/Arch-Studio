import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";

import styles from "./Header.module.scss";
import logo from "../assets/logo.svg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const overlayRef = useRef(null);

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

  // Fermer le menu lors d'un clic sur un lien
  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <NavLink to="/" onClick={handleNavClick}>
            <img src={logo} alt="Arch Studio logo" />
          </NavLink>
        </div>

        {/* Burger */}
        <button
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
                to="/projets"
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
