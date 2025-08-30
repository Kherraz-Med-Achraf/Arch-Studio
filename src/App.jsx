import styles from "./App.module.scss";
import Header from "./components/Header/Header.jsx";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer.jsx";
import useSimplePageTransition from "./hooks/useSimplePageTransition.js";

import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import PortfolioPage from "./pages/PortfolioPage.jsx";

function App() {
  const { displayLocation, isExiting } = useSimplePageTransition();

  return (
    <div className={styles.app}>
      <Header />
      <div
        className={`${styles.pageContainer} ${isExiting ? styles.exiting : ""}`}
      >
        <Routes location={displayLocation}>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
