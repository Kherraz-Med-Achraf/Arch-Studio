import React from "react";
import styles from "./SmallTeamBanner.module.scss";

import imgDesktop from "../../assets/home/desktop/image-small-team.jpg";
import imgTablet from "../../assets/home/tablet/image-small-team.jpg";
import imgMobile from "../../assets/home/mobile/image-small-team.jpg";
import IconArrow from "../../assets/icons/icon-arrow.svg?react";

const SmallTeamBanner = () => {
  return (
    <section className={styles.banner}>
      <picture className={styles.imageWrapper}>
        <source media="(min-width: 1440px)" srcSet={imgDesktop} />
        <source media="(min-width: 768px)" srcSet={imgTablet} />
        <img src={imgMobile} alt="Architecture moderne au bord de l'eau" />
      </picture>

      <div className={styles.overlay} aria-hidden />

      <div className={styles.content}>
        <h2 className={styles.title}>Small team, big ideas</h2>
        <button className={styles.cta} type="button">
          About Us <IconArrow className={styles.icon} />
        </button>
      </div>
    </section>
  );
};

export default SmallTeamBanner;
