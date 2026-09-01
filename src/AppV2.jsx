import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import MobileHeader from "./components/MobileHeader/MobileHeader";
import HomeSection from "./components/v2/HomeSection";
import AboutSection from "./components/v2/AboutSection";
import ExperienceSection from "./components/v2/ExperienceSection";
import ProjectsSection from "./components/v2/ProjectsSection";
import JourneySection from "./components/v2/JourneySection";
import AchievementsSection from "./components/v2/AchievementsSection";
import ContactSection from "./components/v2/ContactSection";
import "./AppV2.css";

const SECTIONS = [
  { id: "home", path: "/" },
  { id: "about", path: "/about" },
  { id: "experience", path: "/experience" },
  { id: "projects", path: "/projects" },
  { id: "journey", path: "/journey" },
  { id: "achievements", path: "/achievements" },
  { id: "contact", path: "/contact" }
];

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top on route change
  useEffect(() => {
    const mainEl = document.querySelector(".app-v2__main");
    if (mainEl) mainEl.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app-v2">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="app-v2__main">
        <MobileHeader />

        {/* Section Route Content */}
        <div className="app-v2__sections">
          <Routes>
            <Route path="/" element={<HomeSection />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/experience" element={<ExperienceSection />} />
            <Route path="/projects" element={<ProjectsSection />} />
            <Route path="/journey" element={<JourneySection />} />
            <Route path="/achievements" element={<AchievementsSection />} />
            <Route path="/contact" element={<ContactSection />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="app-v2__footer" style={{ display: "none" }}>
        </footer>
      </main>
    </div>
  );
}

export default App;
