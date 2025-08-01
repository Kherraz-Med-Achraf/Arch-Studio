import React, { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "../App.css";

const HomePage = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="home">
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((c) => c + 1)}>count is {count}</button>
        <p>
          Modifiez <code>src/pages/HomePage.jsx</code> et sauvegardez pour
          tester le HMR
        </p>
      </div>
      <p className="read-the-docs">
        Cliquez sur les logos Vite et React pour en savoir plus
      </p>
    </div>
  );
};

export default HomePage;
