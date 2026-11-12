import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Routes, Route, useLocation, useNavigate, useMatch } from "react-router-dom";
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
  const projectDetailMatch = useMatch("/projects/:id");
  const isProjectDetail = Boolean(projectDetailMatch);

  // Mobile detection matching AppV2.css breakpoint (900px)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(max-width: 900px)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 900px)");
    const onChange = (e) => setIsMobile(e.matches);

    if (mql.addEventListener) {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    } else {
      mql.addListener(onChange);
      return () => mql.removeListener(onChange);
    }
  }, []);

  // Scroll to top on route change (Desktop only)
  useEffect(() => {
    if (isMobile) return;
    const mainEl = document.querySelector(".app-v2__main");
    if (mainEl) mainEl.scrollTo(0, 0);
  }, [location.pathname, isMobile]);

  // Deep link on mobile: scroll to matching section on direct URL load or when returning from detail
  const initialDeepLinkHandled = useRef(false);
  const wasInDetailRef = useRef(false);

  useEffect(() => {
    if (!isMobile) return;

    if (isProjectDetail) {
      wasInDetailRef.current = true;
      return;
    }

    const returningFromDetail = wasInDetailRef.current;
    wasInDetailRef.current = false;

    if (!initialDeepLinkHandled.current || returningFromDetail) {
      initialDeepLinkHandled.current = true;
      const path = location.pathname;
      if (path === "/" || path === "") {
        window.scrollTo(0, 0);
        return;
      }

      const matched = SECTIONS.find((s) => s.path === path);
      if (!matched || matched.id === "home") return;

      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        const el = document.getElementById(matched.id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          clearInterval(interval);
        } else if (attempts >= 20) {
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isMobile, isProjectDetail]);

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
              {isMobile && isProjectDetail ? (
                <Suspense fallback={<SectionLoader />}>
                  <Routes>
                    <Route path="/projects/:id" element={<ProjectDetailPage />} />
                  </Routes>
                </Suspense>
              ) : isMobile ? (
                <>
                  <section id="home">
                    <Suspense fallback={<SectionLoader />}>
                      <HomeSection />
                    </Suspense>
                  </section>
                  <section id="about">
                    <Suspense fallback={<SectionLoader />}>
                      <AboutSection />
                    </Suspense>
                  </section>
                  <section id="experience">
                    <Suspense fallback={<SectionLoader />}>
                      <ExperienceSection />
                    </Suspense>
                  </section>
                  <section id="projects">
                    <Suspense fallback={<SectionLoader />}>
                      <ProjectsSection />
                    </Suspense>
                  </section>
                  <section id="journey">
                    <Suspense fallback={<SectionLoader />}>
                      <JourneySection />
                    </Suspense>
                  </section>
                  <section id="achievements">
                    <Suspense fallback={<SectionLoader />}>
                      <AchievementsSection />
                    </Suspense>
                  </section>
                  <section id="contact">
                    <Suspense fallback={<SectionLoader />}>
                      <ContactSection />
                    </Suspense>
                  </section>
                </>
              ) : (
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
              )}
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
