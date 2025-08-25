import React, { useEffect, useMemo, useState } from "react";
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

  const items = useMemo(() => {
    if (variant === "home") return featuredProjects;
    return projects;
  }, [variant]);

  const handleCardClick = () => {
    if (variant === "home") {
      navigate("/portfolio");
    }
  };

  return (
    <section className={styles.wrapper}>
      {variant === "home" && (
        <div className={styles.headerRow}>
          <h2 className={styles.title}>Featured</h2>
          {(isDesktop || isTablet) && (
            <button
              className={styles.ctaButton}
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
