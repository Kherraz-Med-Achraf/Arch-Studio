import React from "react";
import styles from "./LoadingScreen.module.scss";

const LoadingScreen = ({ progress = 0, isVisible = true }) => {
  if (!isVisible) return null;

  return (
    <div
      className={`${styles.loadingScreen} ${!isVisible ? styles.hiding : ""}`}
    >
      <div className={styles.content}>
        <div className={styles.logo}>
          <svg width="58" height="24" viewBox="0 0 58 24" fill="none">
            <path
              d="M0 0h15.255v17.763h2.678V0h15.256v24H18.122v-3.721H2.678V24H0V0z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className={styles.progressText}>{Math.round(progress)}%</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
