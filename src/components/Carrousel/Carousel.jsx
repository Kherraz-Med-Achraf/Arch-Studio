import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./Carousel.module.scss";
import { useNavigate } from "react-router-dom";

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
    text: "The Seraph Station project challenged us to design a unique station that would transport people through time. The result is a fresh and futuristic model inspired by space stations.",
    cta: "See Our Portfolio",
  },
  {
    id: 2,
    img: federalImg,
    imgTablet: federalImgTablet,
    imgMobile: federalImgMobile,
    header: "Federal II Tower",
    text: "A sequel theme project for a tower originally built in the 1800s. We achieved this with a striking look of brutal minimalism with modern touches.",
    cta: "See Our Portfolio",
  },
  {
    id: 3,
    img: trinityImg,
    imgTablet: trinityImgTablet,
    imgMobile: trinityImgMobile,
    header: "Project Trinity",
    text: "Trinity Bank challenged us to make a concept for a 84 story building located in the middle of a city with a high earthquake frequency. For this project we used curves to blend design and stability to meet our objectives.",
    cta: "See Our Portfolio",
  },
];

export default function Carousel() {
  const slidesWrapperRef = useRef(null);
  const controlsRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const slideRefs = useRef([]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // === Fonctions d’animation ===
  const initialLoad = useRef(true);

  const animateIn = (index) => {
    const currentSlide = slideRefs.current[index];
    if (!currentSlide) return;

    const isMobile = window.innerWidth < 768;

    if (initialLoad.current) {
      // Animation d'entrée globale (une seule fois)
      const content = currentSlide.querySelector(`.${styles.slideContent}`);
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        delay: 0.3,
      });

      // Valeurs réduites pour mobile
      const wrapperX = isMobile ? 50 : 100;
      const contentX = isMobile ? 60 : 120;
      const controlsX = isMobile ? 70 : 140;
      const wrapperDuration = isMobile ? 1.5 : 2;
      const contentDuration = isMobile ? 1.8 : 2.5;
      const controlsDuration = isMobile ? 2.5 : 3.5;

      tl.fromTo(
        slidesWrapperRef.current,
        { autoAlpha: 0, x: wrapperX },
        { autoAlpha: 1, x: 0, duration: wrapperDuration }
      )
        .fromTo(
          content,
          { autoAlpha: 0, x: contentX },
          { autoAlpha: 1, x: 0, duration: contentDuration },
          "<"
        )
        .fromTo(
          controlsRef.current,
          { autoAlpha: 0, x: controlsX },
          { autoAlpha: 1, x: 0, duration: controlsDuration },
          "<"
        );

      initialLoad.current = false;
    } else {
      // Animation simple pour les autres slides avec valeurs adaptées
      const slideX = isMobile ? 50 : 100;
      const duration = isMobile ? 0.3 : 0.4;

      gsap.fromTo(
        currentSlide,
        { autoAlpha: 0, x: slideX },
        { autoAlpha: 1, x: 0, duration, ease: "power3.out" }
      );
    }
  };

  const animateOut = (index, onComplete) => {
    const isMobile = window.innerWidth < 768;
    const slideX = isMobile ? -50 : -100; // Valeur réduite pour mobile
    const duration = isMobile ? 0.25 : 0.3; // Durée réduite pour mobile

    gsap.to(slideRefs.current[index], {
      autoAlpha: 0,
      x: slideX,
      duration,
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
      <div className={styles.slides} ref={slidesWrapperRef}>
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
              <button
                className={styles.slideButton}
                onClick={() => navigate(`/portfolio`)}
              >
                {slide.cta} <IconArrow className={styles.icon} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Contrôles de navigation */}
      <ul className={styles.controls} ref={controlsRef}>
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
