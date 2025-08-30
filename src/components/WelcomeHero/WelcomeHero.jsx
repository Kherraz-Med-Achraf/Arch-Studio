import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./WelcomeHero.module.scss";

// Default image from the assets to match the provided mockup
import defaultImage from "../../assets/home/desktop/image-welcome.jpg";

const WelcomeHero = ({
  label = "Welcome",
  infoTitle = "Welcome to Arch Studio",
  infoDescription = "We have a unique network and skillset to help bring your projects to life. Our small team of highly skilled individuals combined with our large network put us in a strong position to deliver exceptional results.\n\nOver the past 10 years, we have worked on all kinds of projects. From stations to high-rise buildings, we create spaces that inspire and delight.\n\nWe work closely with our clients so that we understand the intricacies of each project. This allows us to work in harmony the surrounding area to create truly stunning projects that will stand the test of time.",
  imageSrc = defaultImage,
}) => {
  const rootRef = useRef(null);
  const labelRef = useRef(null);
  const infoRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphsRef = useRef([]);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Précharger l'image et préparer l'état initial
  useLayoutEffect(() => {
    // Précharger l'image
    const img = new Image();
    img.onload = () => {
      setIsImageLoaded(true);
    };
    img.src = imageSrc;

    // Délai pour permettre au DOM de se stabiliser
    const readyTimer = setTimeout(() => {
      setIsReady(true);
    }, 50);

    return () => {
      clearTimeout(readyTimer);
    };
  }, [imageSrc]);

  useLayoutEffect(() => {
    if (!isReady || !isImageLoaded) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Définir l'état initial de tous les éléments
      gsap.set([titleRef.current, ...paragraphsRef.current], {
        autoAlpha: 0,
        y: 40,
      });

      // Animation d'entrée avec fade et mouvement de bas en haut
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "10% 75%",
          toggleActions: "play none none none",
          invalidateOnRefresh: true,
        },
      });

      // Fade et montée du titre
      tl.to(titleRef.current, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: "power2.out",
      })
        // Fade et montée échelonnée des paragraphes
        .to(
          paragraphsRef.current,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
          },
          "-=0.4"
        );

      // Parallaxe du bloc info: désactivée sur mobile (voir règle matchMedia ci-dessous)

      // Règles responsive avec matchMedia
      const mm = gsap.matchMedia();

      // Tablet et + : parallaxe fluide et subtile pour le bloc info (désactivée sur mobile)
      mm.add("(min-width: 768px)", () => {
        if (!infoRef.current) return undefined;

        const infoParallax = gsap.to(infoRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          infoParallax?.scrollTrigger?.kill();
          infoParallax?.kill();
        };
      });

      // Tablet et + : parallaxe sophistiquée du grand label
      mm.add("(min-width: 768px)", () => {
        if (!labelRef.current) return undefined;

        // Définir l'état initial du label
        gsap.set(labelRef.current, { autoAlpha: 0, y: 60 });

        // Animation d'entrée du label avec fade et montée
        gsap.to(labelRef.current, {
          y: 0,
          autoAlpha: 1,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "10% 80%",
            toggleActions: "play none none none",
          },
        });

        // Parallaxe du label
        const parallaxAnim = gsap.to(labelRef.current, {
          yPercent: 30,
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
          parallaxAnim?.scrollTrigger?.kill();
          parallaxAnim?.kill();
        };
      });

      // Desktop et + : parallaxe et animations de l'image
      mm.add("(min-width: 1440px)", () => {
        if (!imageRef.current) return undefined;

        // Définir l'état initial de l'image
        gsap.set(imageRef.current, { autoAlpha: 0, y: 50 });

        // Animation d'entrée de l'image avec fade et montée
        gsap.to(imageRef.current, {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power2.out",
          delay: 0.4,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "10% 70%",
            toggleActions: "play none none none",
          },
        });

        // Parallaxe de l'image avec mouvement plus naturel
        const imageParallax = gsap.to(imageRef.current, {
          yPercent: 30,
          scale: 1.02,
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

      // Refresh optimisé au chargement de l'image
      if (imageRef.current) {
        const img = imageRef.current;
        const onLoad = () => {
          ScrollTrigger.refresh();
        };
        if (img.complete) {
          ScrollTrigger.refresh();
        } else {
          img.addEventListener("load", onLoad, { once: true });
        }
      }
    }, rootRef);

    return () => ctx.revert();
  }, [isReady, isImageLoaded]);

  return (
    <section
      className={`${styles.hero} ${!isReady ? "gsap-fade-in" : ""}`}
      ref={rootRef}
    >
      <div className={styles.container}>
        <div className={styles.bigLabel} ref={labelRef} aria-hidden>
          {label}
        </div>
        <div className={styles.infoCard} ref={infoRef}>
          <h1
            className={`${styles.infoTitle} ${!isReady ? "gsap-fade-in" : ""}`}
            ref={titleRef}
          >
            {infoTitle}
          </h1>
          <div className={styles.infoTextContainer}>
            {infoDescription.split("\n\n").map((para, idx) => (
              <p
                key={idx}
                className={`${styles.infoText} ${
                  !isReady ? "gsap-fade-in" : ""
                }`}
                ref={(el) => (paragraphsRef.current[idx] = el)}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
        <img
          src={imageSrc}
          ref={imageRef}
          alt="Building facade"
          style={{ opacity: isImageLoaded ? 1 : 0 }}
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>
    </section>
  );
};

export default WelcomeHero;
