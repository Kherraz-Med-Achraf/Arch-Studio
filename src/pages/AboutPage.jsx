import React from "react";
import PageHero from "../components/PageHero/PageHero";
import Heritage from "../components/Heritage/Heritage";
import TeamLeaders from "../components/TeamLeaders/TeamLeaders";

// Import des images About
import aboutImageDesktop from "../assets/about/desktop/image-hero.jpg";
import aboutImageTablet from "../assets/about/tablet/image-hero.jpg";
import aboutImageMobile from "../assets/about/mobile/image-hero.jpg";

const AboutPage = () => {
  const aboutHeroData = {
    images: {
      desktop: aboutImageDesktop,
      tablet: aboutImageTablet,
      mobile: aboutImageMobile,
    },
    altText: "Équipe de travail avec ordinateur portable",
    bigLabel: "About",
    title: "Your team of professionals",
    description:
      "Our small team of world-class professionals will work with you every step of the way. Strong relationships are at the core of everything we do. This extends to the relationship our projects have with their surroundings.",
  };

  return (
    <section className="projects-page">
      <PageHero {...aboutHeroData} />
      <Heritage />
      <TeamLeaders />
    </section>
  );
};

export default AboutPage;
