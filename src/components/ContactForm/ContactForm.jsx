import React, { useState, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ContactForm.module.scss";
import IconArrow from "../../assets/icons/icon-arrow.svg?react";

const ContactForm = () => {
  const rootRef = useRef(null);
  const titleRef = useRef(null);
  const inputGroupRefs = useRef([]);
  const submitButtonRef = useRef(null);
  const hasAnimated = useRef(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Effacer l'erreur dès que l'utilisateur commence à saisir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() === "",
      email: formData.email.trim() === "",
      message: formData.message.trim() === "",
    };

    setErrors(newErrors);

    // Retourne true si pas d'erreurs
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Ici vous pouvez ajouter la logique de soumission réussie
    }
  };

  useLayoutEffect(() => {
    if (hasAnimated.current) return; // Empêcher l'animation de se rejouer

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Gestion responsive avec matchMedia
      const mm = gsap.matchMedia();

      // Mobile : animations simplifiées
      mm.add("(max-width: 767px)", () => {
        // État initial simplifié pour mobile
        gsap.set(titleRef.current, {
          autoAlpha: 0,
          y: 30, // Valeur réduite pour mobile
        });

        const validInputGroups = inputGroupRefs.current.filter(
          (group) => group !== null
        );

        gsap.set(validInputGroups, {
          autoAlpha: 0,
          y: 20, // Pas de mouvement horizontal sur mobile
          scale: 0.98, // Scale minimal
        });

        gsap.set(submitButtonRef.current, {
          autoAlpha: 0,
          scale: 0.9, // Pas de rotation sur mobile
        });

        // Timeline simplifiée pour mobile
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

        // 1. Animation du titre
        mobileTl
          .to(titleRef.current, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8, // Durée réduite
            ease: "power2.out",
          })
          // 2. Animation simple des champs
          .to(
            validInputGroups,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power2.out", // Ease plus simple
              stagger: {
                amount: 0.3, // Stagger réduit
                from: "start",
              },
            },
            "-=0.4"
          )
          // 3. Animation simple du bouton
          .to(
            submitButtonRef.current,
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.6,
              ease: "power2.out", // Ease plus simple
            },
            "-=0.3"
          );
      });

      // Tablet et Desktop : animations complètes
      mm.add("(min-width: 768px)", () => {
        // État initial des éléments
        gsap.set(titleRef.current, {
          autoAlpha: 0,
          y: 50,
        });

        const validInputGroups = inputGroupRefs.current.filter(
          (group) => group !== null
        );

        gsap.set(validInputGroups, {
          autoAlpha: 0,
          x: -60,
          scale: 0.95,
        });

        gsap.set(submitButtonRef.current, {
          autoAlpha: 0,
          scale: 0,
          rotation: 180,
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

        // 1. Animation du titre
        desktopTl
          .to(titleRef.current, {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          })
          // 2. Animation stagger des champs du formulaire
          .to(
            validInputGroups,
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.1)",
              stagger: {
                amount: 0.4,
                from: "start",
              },
            },
            "-=0.5"
          )
          // 3. Animation du bouton de soumission
          .to(
            submitButtonRef.current,
            {
              autoAlpha: 1,
              scale: 1,
              rotation: 0,
              duration: 0.8,
              ease: "back.out(1.4)",
            },
            "-=0.2"
          );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.contactForm} ref={rootRef}>
      <h2 className={styles.title} ref={titleRef}>
        Connect with us
      </h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div
          className={`${styles.inputGroup} ${errors.name ? styles.error : ""}`}
          ref={(el) => (inputGroupRefs.current[0] = el)}
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className={styles.input}
          />
          {errors.name && <p className={styles.errorMessage}>Can't be empty</p>}
        </div>

        <div
          className={`${styles.inputGroup} ${errors.email ? styles.error : ""}`}
          ref={(el) => (inputGroupRefs.current[1] = el)}
        >
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className={styles.input}
          />
          {errors.email && (
            <p className={styles.errorMessage}>Can't be empty</p>
          )}
        </div>

        <div
          className={`${styles.inputGroup} ${
            errors.message ? styles.error : ""
          }`}
          ref={(el) => (inputGroupRefs.current[2] = el)}
        >
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Message"
            className={styles.textarea}
            rows={4}
          />
          {errors.message && (
            <p className={styles.errorMessage}>Can't be empty</p>
          )}
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          ref={submitButtonRef}
        >
          <IconArrow className={styles.iconArrow} />
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
