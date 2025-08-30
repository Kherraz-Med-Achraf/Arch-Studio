import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Heritage.module.scss";

// Import de l'image heritage pour desktop
import heritageImageDesktop from "../../assets/about/desktop/image-heritage.jpg";

const Heritage = () => {
  const rootRef = useRef(null);
  const dividerRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphsRef = useRef([]);
  const imageWrapperRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // État initial des éléments
      gsap.set(dividerRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(titleRef.current, {
        autoAlpha: 0,
        y: 60,
      });

      gsap.set(paragraphsRef.current, {
        autoAlpha: 0,
        y: 40,
      });

      // Animation d'entrée avec ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          invalidateOnRefresh: true,
        },
      });

      // 1. Animation du divider (trait qui se dessine)
      tl.to(dividerRef.current, {
        scaleX: 1,
        duration: 0.8,
        ease: "power2.out",
      })
        // 2. Animation du titre
        .to(
          titleRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          "0"
        )
        // 3. Animation stagger des paragraphes
        .to(
          paragraphsRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: {
              amount: 0.4,
              from: "start",
            },
          },
          "0.3"
        );

      // Gestion responsive pour l'image
      if (imageWrapperRef.current) {
        const mm = gsap.matchMedia();

        // Mobile : animation simple sans parallaxe
        mm.add("(max-width: 767px)", () => {
          gsap.set(imageWrapperRef.current, {
            autoAlpha: 0,
            y: 20, // Valeur réduite pour mobile
            scale: 1.02, // Scale minimal
          });

          tl.to(
            imageWrapperRef.current,
            {
              autoAlpha: 1,
              scale: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
            },
            "0.3"
          );

          // Pas de parallaxe sur mobile pour éviter les problèmes de performance
        });

        // Tablet et Desktop : animation complète avec parallaxe
        mm.add("(min-width: 768px)", () => {
          gsap.set(imageWrapperRef.current, {
            autoAlpha: 0,
            scale: 1.05,
            y: 30,
          });

          tl.to(
            imageWrapperRef.current,
            {
              autoAlpha: 1,
              scale: 1,
              y: 0,
              duration: 1.2,
              ease: "power2.out",
            },
            "0.3"
          );

          // Parallaxe subtile de l'image au scroll - Desktop uniquement
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

          return () => {
            imageParallax?.scrollTrigger?.kill();
            imageParallax?.kill();
          };
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.heritage} ref={rootRef}>
      <div className={styles.divider} ref={dividerRef}></div>

      <div className={styles.textContent}>
        <h2 className={styles.title} ref={titleRef}>
          Our Heritage
        </h2>
        <p
          className={styles.paragraph}
          ref={(el) => (paragraphsRef.current[0] = el)}
        >
          Founded in 2007, we started as a trio of architects. Our complimentary
          skills and relentless attention to detail turned Arch into one of the
          most sought after boutique firms in the country.
        </p>
        <p
          className={styles.paragraph}
          ref={(el) => (paragraphsRef.current[1] = el)}
        >
          Specializing in Urban Design allowed us to focus on creating
          exceptional structures that live in harmony with their surroundings.
          We consider every detail from every surrounding element to inform our
          designs.
        </p>
        <p
          className={styles.paragraph}
          ref={(el) => (paragraphsRef.current[2] = el)}
        >
          Our small team of world-class professionals provides input on every
          project.
        </p>
      </div>

      <div className={styles.imageWrapper} ref={imageWrapperRef}>
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
