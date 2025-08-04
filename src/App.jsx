import styles from "./App.module.scss";
import Header from "./components/Header.jsx";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import PortfolioPage from "./pages/PortfolioPage.jsx";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/projets" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  );
}

export default App;
