import React, { useState } from "react";
import styles from "./ContactForm.module.scss";
import IconArrow from "../../assets/icons/icon-arrow.svg?react";

const ContactForm = () => {
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

  return (
    <section className={styles.contactForm}>
      <h2 className={styles.title}>Connect with us</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div
          className={`${styles.inputGroup} ${errors.name ? styles.error : ""}`}
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

        <button type="submit" className={styles.submitButton}>
          <IconArrow className={styles.iconArrow} />
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
