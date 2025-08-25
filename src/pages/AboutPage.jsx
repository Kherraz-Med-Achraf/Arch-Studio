import React from "react";
import AboutHero from "../components/AboutHero/AboutHero";
import Heritage from "../components/Heritage/Heritage";
import TeamLeaders from "../components/TeamLeaders/TeamLeaders";

const AboutPage = () => {
  return (
    <section className="projects-page">
      <AboutHero />
      <Heritage />
      <TeamLeaders />
    </section>
  );
};

export default AboutPage;
