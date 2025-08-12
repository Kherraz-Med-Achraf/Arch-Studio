import React, { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "../App.css";
import Carousel from "../components/Carrousel/Carousel";
import WelcomeHero from "../components/WelcomeHero/WelcomeHero";
import SmallTeamBanner from "../components/SmallTeamBanner/SmallTeamBanner";
import ProjectsGrid from "../components/ProjectsGrid/ProjectsGrid";

const HomePage = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="home">
      <Carousel />
      <WelcomeHero />
      <SmallTeamBanner />
      <ProjectsGrid variant="home" />
    </div>
  );
};

export default HomePage;
