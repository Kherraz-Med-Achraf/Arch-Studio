import React, { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "../App.css";
import Carousel from "../components/Carrousel/Carousel";

const HomePage = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="home">
      <Carousel />
    </div>
  );
};

export default HomePage;
