import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./TeamLeaders.module.scss";

// Import des avatars
import avatarJake from "../../assets/about/desktop/avatar-jake.jpg";
import avatarThompson from "../../assets/about/desktop/avatar-thompson.jpg";
import avatarJackson from "../../assets/about/desktop/avatar-jackson.jpg";
import avatarMaria from "../../assets/about/desktop/avatar-maria.jpg";

// Import des icônes sociales
import iconLinkedIn from "../../assets/icons/icon-linkedin.svg";
import iconTwitter from "../../assets/icons/icon-twitter.svg";

const TeamLeaders = () => {
  const rootRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const avatarRefs = useRef([]);
  const overlayRefs = useRef([]);
  const nameRefs = useRef([]);
  const titleRefs = useRef([]);

  const leaders = [
    {
      id: 1,
      name: "Jake Richards",
      title: "Chief Architect",
      avatar: avatarJake,
    },
    {
      id: 2,
      name: "Thompson Smith",
      title: "Head of Finance",
      avatar: avatarThompson,
    },
    {
      id: 3,
      name: "Jackson Rourke",
      title: "Lead Designer",
      avatar: avatarJackson,
    },
    {
      id: 4,
      name: "Maria Simpson",
      title: "Senior Architect",
      avatar: avatarMaria,
    },
  ];

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animation du titre
      gsap.set(titleRef.current, {
        autoAlpha: 0,
        y: 60,
      });

      gsap.to(titleRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
          invalidateOnRefresh: true,
        },
      });

      // Animation individuelle pour chaque carte
      const validCards = cardsRef.current.filter((card) => card !== null);
      const mm = gsap.matchMedia();

      // Mobile : animations simplifiées sans parallaxe
      mm.add("(max-width: 767px)", () => {
        validCards.forEach((card, index) => {
          const avatar = avatarRefs.current[index];
          const overlay = overlayRefs.current[index];
          const name = nameRefs.current[index];
          const title = titleRefs.current[index];

          // État initial simplifié pour mobile
          gsap.set(card, {
            autoAlpha: 0,
            y: 40, // Valeur réduite
            scale: 0.95, // Scale minimal
            // Pas de rotationY sur mobile
          });

          gsap.set([name, title], {
            autoAlpha: 0,
            y: 20, // Valeur réduite
          });

          // État initial de l'overlay
          if (overlay) {
            gsap.set(overlay, {
              autoAlpha: 0,
            });
          }

          // Animation d'entrée simplifiée pour mobile
          const mobileCardTl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 95%", // Déclenchement plus tard
              toggleActions: "play none none none",
              invalidateOnRefresh: true,
            },
          });

          mobileCardTl
            // Animation de la carte
            .to(card, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.8, // Durée réduite
              ease: "power2.out", // Ease plus simple
            })
            // Animation du nom
            .to(
              name,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
              },
              "-=0.4"
            )
            // Animation du titre
            .to(
              title,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
              },
              "-=0.3"
            );

          // Pas d'effets parallaxe sur mobile pour optimiser les performances
        });
      });

      // Tablet et Desktop : animations complètes avec parallaxe
      mm.add("(min-width: 768px)", () => {
        validCards.forEach((card, index) => {
          const avatar = avatarRefs.current[index];
          const overlay = overlayRefs.current[index];
          const name = nameRefs.current[index];
          const title = titleRefs.current[index];

          // État initial de chaque carte
          gsap.set(card, {
            autoAlpha: 0,
            y: 80,
            rotationY: 25,
            scale: 0.9,
          });

          gsap.set([name, title], {
            autoAlpha: 0,
            y: 30,
          });

          // État initial de l'overlay
          if (overlay) {
            gsap.set(overlay, {
              autoAlpha: 0,
            });
          }

          // Animation d'entrée pour chaque carte
          const desktopCardTl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
              invalidateOnRefresh: true,
            },
          });

          desktopCardTl
            // Animation de la carte
            .to(card, {
              autoAlpha: 1,
              y: 0,
              rotationY: 0,
              scale: 1,
              duration: 1.2,
              ease: "back.out(1.1)",
            })
            // Animation du nom
            .to(
              name,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
              },
              "-=0.6"
            )
            // Animation du titre
            .to(
              title,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
              },
              "-=0.4"
            );

          // Effet parallaxe sur l'avatar et l'overlay - Desktop uniquement
          if (avatar) {
            // Créer une timeline pour synchroniser l'avatar et l'overlay
            const parallaxTl = gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 2,
                invalidateOnRefresh: true,
              },
            });

            // Appliquer le parallaxe à l'avatar
            parallaxTl.to(
              avatar,
              {
                yPercent: -15,
                ease: "none",
              },
              0
            );

            // Appliquer le même parallaxe à l'overlay pour qu'ils restent synchronisés
            if (overlay) {
              parallaxTl.to(
                overlay,
                {
                  yPercent: -15,
                  ease: "none",
                },
                0
              );
            }

            // Rotation subtile sur l'avatar et l'overlay
            const rotationTl = gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
                invalidateOnRefresh: true,
              },
            });

            rotationTl.to(
              [avatar, overlay],
              {
                rotation: 2,
                ease: "none",
              },
              0
            );
          }

          // Parallaxe inverse sur les infos textuelles - Desktop uniquement
          gsap.to([name, title], {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.8,
              invalidateOnRefresh: true,
            },
          });
        });
      });
    }, rootRef);

    // Gestion des hovers avec GSAP (uniquement sur desktop/souris)
    const validCards = cardsRef.current.filter((card) => card !== null);
    const hoverHandlers = [];

    // Vérifier si l'appareil a une souris (pas mobile/tactile)
    const hasHover = window.matchMedia("(hover: hover)").matches;

    if (hasHover) {
      validCards.forEach((card, index) => {
        const avatarWrapper = card?.querySelector(".avatarWrapper");
        const overlay = overlayRefs.current[index];

        if (avatarWrapper && overlay) {
          const handleMouseEnter = () => {
            gsap.to(overlay, {
              autoAlpha: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          };

          const handleMouseLeave = () => {
            gsap.to(overlay, {
              autoAlpha: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          };

          avatarWrapper.addEventListener("mouseenter", handleMouseEnter);
          avatarWrapper.addEventListener("mouseleave", handleMouseLeave);

          hoverHandlers.push({
            element: avatarWrapper,
            handleMouseEnter,
            handleMouseLeave,
          });
        }
      });
    }

    return () => {
      // Nettoyage du contexte GSAP
      ctx.revert();
      // Nettoyage des event listeners
      hoverHandlers.forEach(
        ({ element, handleMouseEnter, handleMouseLeave }) => {
          element?.removeEventListener("mouseenter", handleMouseEnter);
          element?.removeEventListener("mouseleave", handleMouseLeave);
        }
      );
    };
  }, []);

  return (
    <section className={styles.teamLeaders} ref={rootRef}>
      <h2 className={styles.title} ref={titleRef}>
        The Leaders
      </h2>

      <div className={styles.leadersGrid}>
        {leaders.map((leader, index) => (
          <div
            key={leader.id}
            className={styles.leaderCard}
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <div className={`${styles.avatarWrapper} avatarWrapper`}>
              <img
                ref={(el) => (avatarRefs.current[index] = el)}
                src={leader.avatar}
                alt={`Portrait de ${leader.name}`}
                className={styles.avatar}
              />
              <div
                className={styles.socialOverlay}
                ref={(el) => (overlayRefs.current[index] = el)}
              >
                <a
                  href="#"
                  className={styles.socialLink}
                  aria-label={`LinkedIn de ${leader.name}`}
                >
                  <img
                    src={iconLinkedIn}
                    alt="LinkedIn"
                    className={styles.socialIcon}
                  />
                </a>
                <a
                  href="#"
                  className={styles.socialLink}
                  aria-label={`Twitter de ${leader.name}`}
                >
                  <img
                    src={iconTwitter}
                    alt="Twitter"
                    className={styles.socialIcon}
                  />
                </a>
              </div>
            </div>
            <div className={styles.leaderInfo}>
              <h3
                className={styles.leaderName}
                ref={(el) => (nameRefs.current[index] = el)}
              >
                {leader.name}
              </h3>
              <p
                className={styles.leaderTitle}
                ref={(el) => (titleRefs.current[index] = el)}
              >
                {leader.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamLeaders;
