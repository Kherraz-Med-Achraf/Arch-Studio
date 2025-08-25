import React from "react";
import styles from "./Heritage.module.scss";

// Import de l'image heritage pour desktop
import heritageImageDesktop from "../../assets/about/desktop/image-heritage.jpg";

const Heritage = () => {
  return (
    <section className={styles.heritage}>
      <div className={styles.divider}></div>

      <div className={styles.textContent}>
        <h2 className={styles.title}>Our Heritage</h2>
        <p className={styles.paragraph}>
          Founded in 2007, we started as a trio of architects. Our complimentary
          skills and relentless attention to detail turned Arch into one of the
          most sought after boutique firms in the country.
        </p>
        <p className={styles.paragraph}>
          Specializing in Urban Design allowed us to focus on creating
          exceptional structures that live in harmony with their surroundings.
          We consider every detail from every surrounding element to inform our
          designs.
        </p>
        <p className={styles.paragraph}>
          Our small team of world-class professionals provides input on every
          project.
        </p>
      </div>

      <div className={styles.imageWrapper}>
        <img
          src={heritageImageDesktop}
          alt="Architecture moderne avec façade géométrique"
          className={styles.heritageImage}
        />
      </div>
    </section>
  );
};

export default Heritage;
