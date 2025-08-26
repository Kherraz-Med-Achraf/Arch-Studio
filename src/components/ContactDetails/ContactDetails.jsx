import React from "react";
import styles from "./ContactDetails.module.scss";

// Import de l'icône flèche
import arrowIcon from "../../assets/icons/icon-arrow.svg";

const ContactDetails = ({ offices }) => {
  return (
    <section className={styles.contactDetails}>
      <div className={styles.divider}></div>
      <h2 className={styles.title}>Contact Details</h2>

      <div className={styles.officesGrid}>
        {offices.map((office) => (
          <div key={office.id} className={styles.officeCard}>
            <h3 className={styles.officeTitle}>{office.title}</h3>
            <div className={styles.contactInfo}>
              <p className={styles.contactItem}>Mail : {office.email}</p>
              <p className={styles.contactItem}>Address : {office.address}</p>
              <p className={styles.contactItem}>Phone : {office.phone}</p>
            </div>
            <button className={styles.mapButton}>
              View on Map
              <img src={arrowIcon} alt="" className={styles.arrowIcon} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactDetails;
