import React from "react";
import styles from "./PageHero.module.scss";

const PageHero = ({ images, altText, bigLabel, title, description }) => {
  return (
    <section className={styles.hero}>
      <div className={styles.imageWrapper}>
        <picture>
          <source media="(min-width: 1440px)" srcSet={images.desktop} />
          <source media="(min-width: 768px)" srcSet={images.tablet} />
          <img src={images.mobile} alt={altText} />
        </picture>
      </div>
      <div className={styles.bigLabel} aria-hidden>
        {bigLabel}
      </div>
      <div className={styles.divider}></div>
      <div className={styles.textContent}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
    </section>
  );
};

export default PageHero;
