import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";

import styles from "./Header.module.scss";
import logo from "../assets/logo.svg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Animation d'ouverture / fermeture du menu
  useEffect(() => {
    const elem = menuRef.current;
    if (!elem) return;

    if (menuOpen) {
      gsap.to(elem, {
        height: "auto",
        opacity: 1,
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
    }
  }, [menuOpen]);

  // Fermer le menu lors d'un clic sur un lien
  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="Arch Studio logo" />
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
              to="/"
              end
              onClick={handleNavClick}
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Accueil
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
              Projets
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
  );
};

export default Header;
