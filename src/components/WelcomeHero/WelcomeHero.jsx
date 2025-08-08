import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(labelRef.current, { yPercent: 20, autoAlpha: 0, duration: 0.6 })
        .from(infoRef.current, { y: 24, autoAlpha: 0, duration: 0.6 }, "-=0.2")
        .from(
          imageRef.current,
          { y: 30, autoAlpha: 0, scale: 1.03, duration: 0.8 },
          "-=0.3"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} ref={rootRef}>
      <div className={styles.container}>
        <div className={styles.bigLabel} ref={labelRef} aria-hidden>
          {label}
        </div>
        <div className={styles.infoCard} ref={infoRef}>
          <h1 className={styles.infoTitle}>{infoTitle}</h1>
          <div className={styles.infoTextContainer}>
            {infoDescription.split("\n\n").map((para, idx) => (
              <p key={idx} className={styles.infoText}>
                {para}
              </p>
            ))}
          </div>
        </div>
        <img src={imageSrc} ref={imageRef} alt="Building facade" />
      </div>
    </section>
  );
};

export default WelcomeHero;
