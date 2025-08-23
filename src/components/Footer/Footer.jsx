import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Footer.module.scss";
import Logo from "../../assets/logo.svg?react";
import IconArrow from "../../assets/icons/icon-arrow.svg?react";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
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
                to="/projets"
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
