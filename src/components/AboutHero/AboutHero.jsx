import React from "react";
import styles from "./AboutHero.module.scss";

// Import des images responsive
import heroImageDesktop from "../../assets/about/desktop/image-hero.jpg";
import heroImageTablet from "../../assets/about/tablet/image-hero.jpg";
import heroImageMobile from "../../assets/about/mobile/image-hero.jpg";

const AboutHero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.imageWrapper}>
        <picture>
          <source media="(min-width: 1440px)" srcSet={heroImageDesktop} />
          <source media="(min-width: 768px)" srcSet={heroImageTablet} />
          <img
            src={heroImageMobile}
            alt="Équipe de travail avec ordinateur portable"
          />
        </picture>
      </div>
      <div className={styles.bigLabel} aria-hidden>
        About
      </div>
      <div className={styles.divider}></div>
      <div className={styles.textContent}>
        <h1 className={styles.title}>Your team of professionals</h1>
        <p className={styles.description}>
          Our small team of world-class professionals will work with you every
          step of the way. Strong relationships are at the core of everything we
          do. This extends to the relationship our projects have with their
          surroundings.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
