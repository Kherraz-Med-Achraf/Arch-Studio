import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./SmallTeamBanner.module.scss";

import imgDesktop from "../../assets/home/desktop/image-small-team.jpg";
import imgTablet from "../../assets/home/tablet/image-small-team.jpg";
import imgMobile from "../../assets/home/mobile/image-small-team.jpg";
import IconArrow from "../../assets/icons/icon-arrow.svg?react";

const SmallTeamBanner = () => {
  const rootRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const ctaRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Gestion responsive avec matchMedia
      const mm = gsap.matchMedia();

      // Mobile : animations simplifiées
      mm.add("(max-width: 767px)", () => {
        // État initial simplifié pour mobile
        gsap.set([imageRef.current, overlayRef.current], {
          autoAlpha: 0,
          y: 30, // Valeur réduite pour mobile
        });

        gsap.set([titleRef.current, ctaRef.current], {
          autoAlpha: 0,
          y: 20, // Valeur réduite pour mobile
        });

        // Animation d'entrée simplifiée pour mobile
        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "20% 85%", // Déclenchement légèrement plus tard
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        });

        // Animation de l'image et de l'overlay
        mobileTl
          .to([imageRef.current, overlayRef.current], {
            y: 0,
            autoAlpha: 1,
            duration: 0.6, // Durée réduite
            ease: "power2.out",
          })
          // Animation du titre
          .to(
            titleRef.current,
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.3"
          )
          // Animation du bouton CTA
          .to(
            ctaRef.current,
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.5,
              ease: "power2.out",
            },
            "<"
          );
      });

      // Tablet et Desktop : animations normales
      mm.add("(min-width: 768px)", () => {
        // État initial des éléments à animer
        gsap.set([imageRef.current, overlayRef.current], {
          autoAlpha: 0,
          y: 60,
        });

        gsap.set([titleRef.current, ctaRef.current], {
          autoAlpha: 0,
          y: 40,
        });

        // Animation d'entrée avec fade et mouvement de bas en haut
        const desktopTl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "20% 80%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        });

        // Animation de l'image et de l'overlay en premier
        desktopTl
          .to([imageRef.current, overlayRef.current], {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power2.out",
          })
          // Animation du titre
          .to(
            titleRef.current,
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.4"
          )
          // Animation du bouton CTA
          .to(
            ctaRef.current,
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.6,
              ease: "power2.out",
            },
            "<"
          );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.banner} ref={rootRef}>
      <picture className={styles.imageWrapper} ref={imageRef}>
        <source media="(min-width: 1440px)" srcSet={imgDesktop} />
        <source media="(min-width: 768px)" srcSet={imgTablet} />
        <img src={imgMobile} alt="Architecture moderne au bord de l'eau" />
      </picture>

      <div className={styles.overlay} ref={overlayRef} aria-hidden />

      <div className={styles.content} ref={contentRef}>
        <h2 className={styles.title} ref={titleRef}>
          Small team, big ideas
        </h2>
        <button className={styles.cta} type="button" ref={ctaRef}>
          About Us <IconArrow className={styles.icon} />
        </button>
      </div>
    </section>
  );
};

export default SmallTeamBanner;
