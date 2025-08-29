import React, {
  useEffect,
  useMemo,
  useState,
  useLayoutEffect,
  useRef,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ProjectsGrid.module.scss";
import { projects, featuredProjects } from "../../data/projects";
import IconArrow from "../../assets/icons/icon-arrow.svg?react";
import { useNavigate } from "react-router-dom";

function useWindowWidth() {
  const [width, setWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1440
  );
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return width;
}

function getResponsiveSrc(images, width) {
  if (width < 768) return images.mobile;
  if (width < 1440) return images.tablet;
  return images.desktop;
}

export default function ProjectsGrid({ variant = "home" }) {
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();
  const isDesktop = windowWidth >= 1440;
  const isTablet = windowWidth >= 768 && windowWidth < 1440;

  // Refs pour les animations
  const rootRef = useRef(null);
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const ctaRef = useRef(null);
  const cardsRef = useRef([]);

  const items = useMemo(() => {
    if (variant === "home") return featuredProjects;
    return projects;
  }, [variant]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animation pour le header (uniquement sur la home)
      if (variant === "home" && headerRef.current) {
        gsap.set([titleRef.current, ctaRef.current], {
          autoAlpha: 0,
          y: 50,
        });

        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        });

        headerTl
          .to(titleRef.current, {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power2.out",
          })
          .to(
            ctaRef.current,
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.4"
          );
      }

      // Animation des cartes via timeline globale (sans ScrollTrigger)
      const validCards = cardsRef.current.filter((card) => card !== null);

      if (validCards.length > 0) {
        const mm = gsap.matchMedia();

        // Mobile : animations simplifiées avec timeline globale
        mm.add("(max-width: 767px)", () => {
          gsap.set(validCards, {
            autoAlpha: 0,
            y: 30, // Valeur réduite
            scale: 0.95, // Scale minimal
          });

          const tl = gsap.timeline({ delay: 2 });
          tl.to(validCards, {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.6, // Durée réduite
            ease: "power2.out", // Ease plus simple
            stagger: 0.05, // Léger effet cascade
          });

          return () => tl.kill();
        });

        // Tablet et Desktop : animations complètes avec timeline globale
        mm.add("(min-width: 768px)", () => {
          gsap.set(validCards, {
            autoAlpha: 0,
            y: 60,
            scale: 0.9,
            rotationY: 15,
          });

          const tl = gsap.timeline({ delay: 1 });
          tl.to(validCards, {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            rotationY: 0,
            duration: 0.8,
            ease: "back.out(1.2)",
            stagger: 0.1, // Effet cascade
          });

          return () => tl.kill();
        });
      }
    }, rootRef);

    // Gestion du hover avec GSAP (uniquement sur desktop/souris)
    const validCards = cardsRef.current.filter((card) => card !== null);
    const hoverHandlers = [];

    // Vérifier si l'appareil a une souris (pas mobile/tactile)
    const hasHover = window.matchMedia("(hover: hover)").matches;

    if (hasHover) {
      validCards.forEach((card) => {
        const handleMouseEnter = () => {
          // Seulement si la carte est visible (a été animée)
          if (gsap.getProperty(card, "autoAlpha") === 1) {
            gsap.to(card, {
              y: -20,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        };

        const handleMouseLeave = () => {
          // Seulement si la carte est visible
          if (gsap.getProperty(card, "autoAlpha") === 1) {
            gsap.to(card, {
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        };

        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);

        hoverHandlers.push({
          card,
          handleMouseEnter,
          handleMouseLeave,
        });
      });
    }

    return () => {
      // Nettoyage du contexte GSAP
      ctx.revert();
      // Nettoyage des event listeners
      hoverHandlers.forEach(({ card, handleMouseEnter, handleMouseLeave }) => {
        card?.removeEventListener("mouseenter", handleMouseEnter);
        card?.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [variant, items]);

  const handleCardClick = () => {
    if (variant === "home") {
      navigate("/portfolio");
    }
  };

  return (
    <section className={styles.wrapper} ref={rootRef}>
      {variant === "home" && (
        <div className={styles.headerRow} ref={headerRef}>
          <h2 className={styles.title} ref={titleRef}>
            Featured
          </h2>
          {(isDesktop || isTablet) && (
            <button
              className={styles.ctaButton}
              ref={ctaRef}
              onClick={() => navigate("/portfolio")}
            >
              See All <IconArrow className={styles.icon} />
            </button>
          )}
        </div>
      )}

      <div className={styles.grid} data-variant={variant}>
        {items.map((item, index) => (
          <article
            key={item.id}
            className={styles.card}
            ref={(el) => (cardsRef.current[index] = el)}
            onClick={handleCardClick}
            role={variant === "home" ? "button" : undefined}
            tabIndex={variant === "home" ? 0 : -1}
          >
            <img
              src={getResponsiveSrc(item.images, windowWidth)}
              alt={item.title}
              className={styles.image}
            />
            <div className={styles.overlay} />
            <div className={styles.content}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardSubtitle}>
                {variant === "home" ? "View All Projects" : item.subtitle}
              </p>
            </div>
            {variant === "home" && (
              <span aria-hidden className={styles.indexNumber}>
                {index + 1}
              </span>
            )}
          </article>
        ))}
      </div>

      {variant === "home" && !isDesktop && !isTablet && (
        <div className={styles.mobileCta}>
          <button
            className={styles.ctaButtonMobile}
            onClick={() => navigate("/portfolio")}
          >
            See All <IconArrow className={styles.icon} />
          </button>
        </div>
      )}
    </section>
  );
}
