import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./PageHero.module.scss";

const PageHero = ({ images, altText, bigLabel, title, description }) => {
  const rootRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);
  const bigLabelRef = useRef(null);
  const dividerRef = useRef(null);
  const textContentRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // État initial des éléments
      gsap.set(imageWrapperRef.current, {
        autoAlpha: 0,
        scale: 1.1,
        y: 50,
      });

      gsap.set([titleRef.current, descriptionRef.current], {
        autoAlpha: 0,
        y: 80,
      });

      gsap.set(dividerRef.current, {
        autoAlpha: 0,
        scaleX: 0,
        transformOrigin: "left center",
      });

      // Animation d'entrée principale
      const masterTl = gsap.timeline({
        delay: 0.2,
      });

      // 1. Animation de l'image avec effet zoom out
      masterTl
        .to(imageWrapperRef.current, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
        })
        // 2. Animation du titre
        .to(
          titleRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.4,
            ease: "power2.out",
          },
          "-=1"
        )
        // 3. Animation de la description
        .to(
          descriptionRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.6,
            ease: "power2.out",
          },
          "<"
        )
        // 4. Animation du divider
        .to(
          dividerRef.current,
          {
            autoAlpha: 1,
            scaleX: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        );

      // Gestion responsive des animations et parallaxe
      const mm = gsap.matchMedia();

      // Mobile et Tablet : animations simplifiées sans parallaxe
      mm.add("(max-width: 1439px)", () => {
        // Pas de parallaxe sur mobile et tablet pour optimiser les performances
        // Pas d'effets parallaxe
      });

      // Desktop uniquement : Animation du bigLabel + parallaxe
      mm.add("(min-width: 1440px)", () => {
        if (!bigLabelRef.current) return undefined;

        // État initial du bigLabel
        gsap.set(bigLabelRef.current, {
          autoAlpha: 0,
          y: 100,
          rotation: 2,
        });

        // Animation d'entrée du bigLabel
        gsap.to(bigLabelRef.current, {
          autoAlpha: 1,
          y: 0,
          rotation: 0,
          duration: 1.4,
          ease: "power2.out",
          delay: 0.4,
        });

        // Parallaxe du bigLabel au scroll - Desktop uniquement
        const bigLabelParallax = gsap.to(bigLabelRef.current, {
          yPercent: 30,
          rotation: 1,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        });

        // Parallaxe de l'image au scroll - Desktop uniquement
        const imageParallax = gsap.to(imageWrapperRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
            invalidateOnRefresh: true,
          },
        });

        // Parallaxe du contenu textuel (mouvement inverse) - Desktop uniquement
        const textParallax = gsap.to(textContentRef.current, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.8,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          bigLabelParallax?.scrollTrigger?.kill();
          bigLabelParallax?.kill();
          imageParallax?.scrollTrigger?.kill();
          imageParallax?.kill();
          textParallax?.scrollTrigger?.kill();
          textParallax?.kill();
        };
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} ref={rootRef}>
      <div className={styles.imageWrapper} ref={imageWrapperRef}>
        <picture>
          <source media="(min-width: 1440px)" srcSet={images.desktop} />
          <source media="(min-width: 768px)" srcSet={images.tablet} />
          <img src={images.mobile} alt={altText} ref={imageRef} />
        </picture>
      </div>
      <div className={styles.bigLabel} ref={bigLabelRef} aria-hidden>
        {bigLabel}
      </div>
      <div className={styles.divider} ref={dividerRef}></div>
      <div className={styles.textContent} ref={textContentRef}>
        <h1 className={styles.title} ref={titleRef}>
          {title}
        </h1>
        <p className={styles.description} ref={descriptionRef}>
          {description}
        </p>
      </div>
    </section>
  );
};

export default PageHero;
