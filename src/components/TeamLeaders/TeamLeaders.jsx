import React from "react";
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

  return (
    <section className={styles.teamLeaders}>
      <h2 className={styles.title}>The Leaders</h2>

      <div className={styles.leadersGrid}>
        {leaders.map((leader) => (
          <div key={leader.id} className={styles.leaderCard}>
            <div className={styles.avatarWrapper}>
              <img
                src={leader.avatar}
                alt={`Portrait de ${leader.name}`}
                className={styles.avatar}
              />
              <div className={styles.socialOverlay}>
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
              <h3 className={styles.leaderName}>{leader.name}</h3>
              <p className={styles.leaderTitle}>{leader.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamLeaders;
