import styles from "./App.module.scss";
import Header from "./components/Header/Header.jsx";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer.jsx";
import useSimplePageTransition from "./hooks/useSimplePageTransition.js";
import useImagePreloader from "./hooks/useImagePreloader.js";

import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import PortfolioPage from "./pages/PortfolioPage.jsx";

// Images critiques à précharger
import heroParamour from "./assets/home/desktop/image-hero-paramour.jpg";
import heroSeraph from "./assets/home/desktop/image-hero-seraph.jpg";
import heroFederal from "./assets/home/desktop/image-hero-federal.jpg";
import heroTrinity from "./assets/home/desktop/image-hero-trinity.jpg";
import welcomeImage from "./assets/home/desktop/image-welcome.jpg";

function App() {
  const { displayLocation, isExiting } = useSimplePageTransition();

  // Précharger les images critiques
  const criticalImages = [
    heroParamour,
    heroSeraph,
    heroFederal,
    heroTrinity,
    welcomeImage,
  ];

  const { isLoading } = useImagePreloader(criticalImages);

  // Ne rien afficher tant que les images ne sont pas chargées
  if (isLoading) {
    return null;
  }

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
