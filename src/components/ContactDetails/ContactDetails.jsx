import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ContactDetails.module.scss";

// Import de l'icône flèche
import arrowIcon from "../../assets/icons/icon-arrow.svg";

const ContactDetails = ({ offices, selectedOfficeId, onViewOnMap }) => {
  const rootRef = useRef(null);
  const dividerRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const officeTitleRefs = useRef([]);
  const contactDetailsRefs = useRef([]);
  const buttonRefs = useRef([]);
  const hasAnimated = useRef(false);

  useLayoutEffect(() => {
    if (hasAnimated.current) return; // Empêcher l'animation de se rejouer

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // État initial des éléments
      gsap.set(dividerRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(titleRef.current, {
        autoAlpha: 0,
        y: 50,
      });

      // État initial des cartes et leurs éléments
      const validCards = cardsRef.current.filter((card) => card !== null);
      const validOfficeTitles = officeTitleRefs.current.filter(
        (title) => title !== null
      );
      const validContactDetails = contactDetailsRefs.current.filter(
        (details) => details !== null
      );
      const validButtons = buttonRefs.current.filter(
        (button) => button !== null
      );

      // Gestion responsive avec matchMedia
      const mm = gsap.matchMedia();

      // Mobile : animations simplifiées
      mm.add("(max-width: 767px)", () => {
        gsap.set(validCards, {
          autoAlpha: 0,
          y: 30, // Valeur réduite pour mobile
          scale: 0.98, // Scale minimal
        });

        gsap.set(validOfficeTitles, {
          autoAlpha: 0,
          y: 15, // Utiliser y au lieu de x sur mobile
        });

        gsap.set(validContactDetails, {
          autoAlpha: 0,
          y: 15, // Valeur réduite
        });

        gsap.set(validButtons, {
          autoAlpha: 0,
          y: 15, // Utiliser y au lieu de x sur mobile
        });

        // Animation d'entrée simplifiée pour mobile
        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 90%", // Déclenchement plus tard
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
            once: true,
          },
          onComplete: () => {
            hasAnimated.current = true;
          },
        });

        // 1. Animation du divider
        mobileTl
          .to(dividerRef.current, {
            scaleX: 1,
            duration: 0.6, // Durée réduite
            ease: "power2.out",
          })
          // 2. Animation du titre
          .to(
            titleRef.current,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            "0"
          )
          // 3. Animation simplifiée des cartes
          .to(
            validCards,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power2.out", // Ease plus simple
              stagger: {
                amount: 0.15, // Stagger réduit
                from: "start",
              },
            },
            "0.2"
          )
          // 4. Animation des titres d'office
          .to(
            validOfficeTitles,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              stagger: {
                amount: 0.2,
                from: "start",
              },
            },
            "0.2"
          )
          // 5. Animation des détails de contact
          .to(
            validContactDetails,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              stagger: {
                amount: 0.15,
                from: "start",
              },
            },
            "0.2"
          )
          // 6. Animation des boutons
          .to(
            validButtons,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out", // Ease plus simple
              stagger: {
                amount: 0.15,
                from: "start",
              },
            },
            "0.2"
          );
      });

      // Tablet et Desktop : animations complètes
      mm.add("(min-width: 768px)", () => {
        gsap.set(validCards, {
          autoAlpha: 0,
          y: 60,
          scale: 0.95,
        });

        gsap.set(validOfficeTitles, {
          autoAlpha: 0,
          x: -30,
        });

        gsap.set(validContactDetails, {
          autoAlpha: 0,
          y: 20,
        });

        gsap.set(validButtons, {
          autoAlpha: 0,
          x: -40,
        });

        // Animation d'entrée complète
        const desktopTl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
            once: true,
          },
          onComplete: () => {
            hasAnimated.current = true;
          },
        });

        // 1. Animation du divider
        desktopTl
          .to(dividerRef.current, {
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
          // 3. Animation stagger des cartes
          .to(
            validCards,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.1)",
              stagger: {
                amount: 0.2,
                from: "start",
              },
            },
            "0.3"
          )
          // 4. Animation des titres d'office
          .to(
            validOfficeTitles,
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: {
                amount: 0.3,
                from: "start",
              },
            },
            "0.3"
          )
          // 5. Animation des détails de contact
          .to(
            validContactDetails,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              stagger: {
                amount: 0.2,
                from: "start",
              },
            },
            "0.3"
          )
          // 6. Animation des boutons
          .to(
            validButtons,
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.6,
              ease: "back.out(1.2)",
              stagger: {
                amount: 0.2,
                from: "start",
              },
            },
            "0.3"
          );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []); // Supprimer les dépendances pour éviter les re-animations

  return (
    <section className={styles.contactDetails} ref={rootRef}>
      <div className={styles.divider} ref={dividerRef}></div>

      <h2 className={styles.title} ref={titleRef}>
        Contact Details
      </h2>

      <div className={styles.officesGrid}>
        {offices.map((office, index) => (
          <div
            key={office.id}
            className={styles.officeCard}
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <h3
              className={styles.officeTitle}
              ref={(el) => (officeTitleRefs.current[index] = el)}
            >
              {office.title}
            </h3>
            <div
              className={styles.contactInfoDetails}
              ref={(el) => (contactDetailsRefs.current[index] = el)}
            >
              <p className={styles.contactItem}>Mail : {office.email}</p>
              <p className={styles.contactItem}>Address : {office.address}</p>
              <p className={styles.contactItem}>Phone : {office.phone}</p>
            </div>
            <button
              ref={(el) => (buttonRefs.current[index] = el)}
              className={`${styles.mapButton} ${
                selectedOfficeId === office.id ? styles.activeButton : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onViewOnMap(office.id);
              }}
              type="button"
            >
              View on Map
              <img
                src={arrowIcon}
                alt="Voir sur la carte"
                className={styles.arrowIcon}
              />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactDetails;
