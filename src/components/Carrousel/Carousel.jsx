import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./Carousel.module.scss";

import paramourImg from "../../assets/home/desktop/image-hero-paramour.jpg";
import paramourImgTablet from "../../assets/home/tablet/image-hero-paramour.jpg";
import paramourImgMobile from "../../assets/home/mobile/image-hero-paramour.jpg";
import seraphImg from "../../assets/home/desktop/image-hero-seraph.jpg";
import seraphImgTablet from "../../assets/home/tablet/image-hero-seraph.jpg";
import seraphImgMobile from "../../assets/home/mobile/image-hero-seraph.jpg";
import federalImg from "../../assets/home/desktop/image-hero-federal.jpg";
import federalImgTablet from "../../assets/home/tablet/image-hero-federal.jpg";
import federalImgMobile from "../../assets/home/mobile/image-hero-federal.jpg";
import trinityImg from "../../assets/home/desktop/image-hero-trinity.jpg";
import trinityImgTablet from "../../assets/home/tablet/image-hero-trinity.jpg";
import trinityImgMobile from "../../assets/home/mobile/image-hero-trinity.jpg";
import IconArrow from "../../assets/icons/icon-arrow.svg?react";

// Chaque slide possède désormais un header, un texte descriptif et un CTA
const slides = [
  {
    id: 0,
    img: paramourImg,
    imgTablet: paramourImgTablet,
    imgMobile: paramourImgMobile,
    header: "Project Paramour",
    text: "Project made for an art museum near Southwest London. Project Paramour is a statement of bold, modern architecture.",
    cta: "See Our Portfolio",
  },
  {
    id: 1,
    img: seraphImg,
    imgTablet: seraphImgTablet,
    imgMobile: seraphImgMobile,
    header: "Seraph Station",
    text: "Une station d’observation astronomique construite dans les Alpes suisses pour minimiser la pollution lumineuse.",
    cta: "Découvrir",
  },
  {
    id: 2,
    img: federalImg,
    imgTablet: federalImgTablet,
    imgMobile: federalImgMobile,
    header: "Federal II Tower",
    text: "Un projet de gratte-ciel écologique visant la neutralité carbone grâce à des façades intelligentes.",
    cta: "Détails du projet",
  },
  {
    id: 3,
    img: trinityImg,
    imgTablet: trinityImgTablet,
    imgMobile: trinityImgMobile,
    header: "Project Trinity",
    text: "Rénovation d’un monument historique combinant patrimoine et technologies de construction modernes.",
    cta: "En savoir plus",
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const slideRefs = useRef([]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // === Fonctions d’animation ===
  const animateIn = (index) => {
    gsap.fromTo(
      slideRefs.current[index],
      { autoAlpha: 0, x: 100 },
      { autoAlpha: 1, x: 0, duration: 0.3, ease: "power3.out" }
    );
  };

  const animateOut = (index, onComplete) => {
    gsap.to(slideRefs.current[index], {
      autoAlpha: 0,
      x: -100,
      duration: 0.3,
      ease: "power3.in",
      onComplete,
    });
  };

  // Lance l’animation d’entrée à chaque changement de slide
  useEffect(() => {
    animateIn(current);
  }, [current]);

  // Gestion du changement de slide (désactivé sur mobile)
  const handleChange = (index) => {
    if (windowWidth < 600 || index === current) return;

    // Préparation de la future slide (cachée avant d’être animée)
    gsap.set(slideRefs.current[index], { autoAlpha: 0, x: 100 });

    animateOut(current, () => setCurrent(index));
  };

  return (
    <section className={styles.carousel}>
      <div className={styles.slides}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${
              index === current ? styles.active : ""
            }`}
            ref={(el) => (slideRefs.current[index] = el)}
          >
            <div className={styles.overlay}></div>
            <img
              src={
                windowWidth < 768
                  ? slide.imgMobile
                  : windowWidth < 1440
                  ? slide.imgTablet
                  : slide.img
              }
              alt={slide.header}
            />
            {/* Contenu textuel superposé */}
            <div className={styles.slideContent}>
              <h2 className={styles.slideHeader}>{slide.header}</h2>
              <p className={styles.slideText}>{slide.text}</p>
              <button className={styles.slideButton}>
                {slide.cta} <IconArrow className={styles.icon} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Contrôles de navigation */}
      <ul className={styles.controls}>
        {slides.map((_, index) => (
          <li
            key={index}
            className={
              index === current
                ? styles.controlsItemActive
                : styles.controlsItem
            }
          >
            <button onClick={() => handleChange(index)}>
              {String(index + 1).padStart(2, "0")}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
