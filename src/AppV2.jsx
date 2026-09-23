import React, { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import MobileHeader from "./components/MobileHeader/MobileHeader";
import "./AppV2.css";
import { CvModalProvider } from "./context/CvModalContext";
import { CommandPaletteProvider } from "./context/CommandPaletteContext";

// Lazy-loaded Section Components & Modals for Fast Code-Splitting
const HomeSection = lazy(() => import("./components/v2/HomeSection"));
const AboutSection = lazy(() => import("./components/v2/AboutSection"));
const ExperienceSection = lazy(() => import("./components/v2/ExperienceSection"));
const ProjectsSection = lazy(() => import("./components/v2/ProjectsSection"));
const ProjectDetailPage = lazy(() => import("./components/v2/ProjectDetailPage"));
const JourneySection = lazy(() => import("./components/v2/JourneySection"));
const AchievementsSection = lazy(() => import("./components/v2/AchievementsSection"));
const ContactSection = lazy(() => import("./components/v2/ContactSection"));
const CvModal = lazy(() => import("./components/CvModal/CvModal"));
const CommandPalette = lazy(() => import("./components/CommandPalette/CommandPalette"));

// Modern Glowing Section Loading Skeleton
function SectionLoader() {
  return (
    <div className="section-loader-fallback">
      <div className="section-loader-card">
        <div className="section-loader-header">
          <div className="skeleton-line skeleton-title" />
          <div className="skeleton-line skeleton-subtitle" />
        </div>
        <div className="skeleton-divider" />
        <div className="section-loader-body">
          <div className="skeleton-line skeleton-p1" />
          <div className="skeleton-line skeleton-p2" />
          <div className="skeleton-line skeleton-p3" />
        </div>
        <div className="section-loader-grid">
          <div className="skeleton-box" />
          <div className="skeleton-box" />
        </div>
      </div>
    </div>
  );
}

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
    <CvModalProvider>
      <CommandPaletteProvider>
        <Suspense fallback={null}>
          <CvModal />
          <CommandPalette />
        </Suspense>
        <div className="app-v2">
          {/* Left Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="app-v2__main">
            <MobileHeader />

            {/* Section Route Content with Suspense Code-Splitting */}
            <div className="app-v2__sections">
              <Suspense fallback={<SectionLoader />}>
                <Routes>
                  <Route path="/" element={<HomeSection />} />
                  <Route path="/about" element={<AboutSection />} />
                  <Route path="/experience" element={<ExperienceSection />} />
                  <Route path="/projects" element={<ProjectsSection />} />
                  <Route path="/projects/:id" element={<ProjectDetailPage />} />
                  <Route path="/journey" element={<JourneySection />} />
                  <Route path="/achievements" element={<AchievementsSection />} />
                  <Route path="/contact" element={<ContactSection />} />
                </Routes>
              </Suspense>
            </div>

            {/* Footer */}
            <footer className="app-v2__footer" style={{ display: "none" }} />
          </main>
        </div>
      </CommandPaletteProvider>
    </CvModalProvider>
  );
}

export default App;
