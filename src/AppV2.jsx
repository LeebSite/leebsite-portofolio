import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Routes, Route, useLocation, useNavigate, useMatch } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import Sidebar from "./components/Sidebar/Sidebar";
import MobileHeader from "./components/MobileHeader/MobileHeader";
import "./AppV2.css";
import { CvModalProvider } from "./context/CvModalContext";
import { CommandPaletteProvider } from "./context/CommandPaletteContext";
import SEO, { HelmetProvider } from "./components/SEO";
import { listProyek } from "./data";

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

const ROUTE_SEO = {
  "/": {
    title: "Muhammad Ghalib Pradipa | Software Engineer Portfolio",
    canonical: "https://www.leebsite.my.id/",
    description: "Portofolio resmi Muhammad Ghalib Pradipa (Ghalib), Software Engineer & Web Developer. Spesialis React, AI, dan Web Modern."
  },
  "/about": {
    title: "Muhammad Ghalib Pradipa | Tentang",
    canonical: "https://www.leebsite.my.id/about",
    description: "Tentang Muhammad Ghalib Pradipa - Software Engineer dan Web Developer dari Indonesia. Latar belakang pendidikan, keahlian teknis, dan filosofi pengembangan."
  },
  "/experience": {
    title: "Muhammad Ghalib Pradipa | Pengalaman",
    canonical: "https://www.leebsite.my.id/experience",
    description: "Pengalaman kerja dan rekam jejak profesional Muhammad Ghalib Pradipa sebagai Software Engineer."
  },
  "/projects": {
    title: "Muhammad Ghalib Pradipa | Proyek",
    canonical: "https://www.leebsite.my.id/projects",
    description: "Daftar portofolio proyek software engineering, web development, dan machine learning karya Muhammad Ghalib Pradipa."
  },
  "/journey": {
    title: "Muhammad Ghalib Pradipa | Perjalanan",
    canonical: "https://www.leebsite.my.id/journey",
    description: "Perjalanan organisasi, komunitas, kepanitiaan, dan karier teknologi Muhammad Ghalib Pradipa."
  },
  "/achievements": {
    title: "Muhammad Ghalib Pradipa | Pencapaian",
    canonical: "https://www.leebsite.my.id/achievements",
    description: "Sertifikasi, penghargaan, dan pencapaian profesional Muhammad Ghalib Pradipa."
  },
  "/contact": {
    title: "Muhammad Ghalib Pradipa | Kontak",
    canonical: "https://www.leebsite.my.id/contact",
    description: "Hubungi Muhammad Ghalib Pradipa untuk peluang kerja, proyek freelance, atau diskusi teknis."
  }
};

function RouteSEO() {
  const location = useLocation();
  const rawPath = location.pathname;
  const pathname = rawPath.length > 1 && rawPath.endsWith("/") ? rawPath.slice(0, -1) : rawPath;

  let seoData = ROUTE_SEO[pathname];

  if (!seoData) {
    const match = pathname.match(/^\/projects\/([^/]+)/);
    if (match) {
      const projId = match[1];
      const project = listProyek.find((p) => String(p.id) === String(projId));
      const projectTitle = project ? project.title : "Proyek";
      seoData = {
        title: `${projectTitle} | Muhammad Ghalib Pradipa`,
        canonical: `https://www.leebsite.my.id/projects/${projId}`,
        description: project?.subtitle || project?.fullDescription || undefined
      };
    } else {
      seoData = ROUTE_SEO["/"];
    }
  }

  return (
    <SEO
      title={seoData.title}
      url={seoData.canonical}
      description={seoData.description}
      image="https://www.leebsite.my.id/assets/hero-img.webp"
    />
  );
}

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

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
    const mainEl = document.querySelector('.app-v2__main');
    if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname, isMobile]);

  // Deep link on mobile: scroll to matching section on direct URL load or when returning from detail
  const initialDeepLinkHandled = useRef(false);
  const wasInDetailRef = useRef(false);

  useEffect(() => {
    if (!isMobile) return;

    if (isProjectDetail) {
      // entering a project detail page; remember to avoid scrolling when coming back
      wasInDetailRef.current = true;
      return;
    }

    // If we came from a project detail, clear the flag
    const returningFromDetail = wasInDetailRef.current;
    wasInDetailRef.current = false;

    // Always scroll on mobile route change
    const path = location.pathname;
    // Scroll to top for root or unknown paths
    if (path === "/" || path === "") {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const matched = SECTIONS.find((s) => s.path === path);
    if (!matched || matched.id === "home") {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const el = document.getElementById(matched.id);
    if (el) {
      el.scrollIntoView({ behavior: "instant" });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname, isMobile, isProjectDetail]);
  return (
    <HelmetProvider>
      <RouteSEO />
      <CvModalProvider>
        <CommandPaletteProvider>
          <motion.div style={{ scaleX }} className="scroll-progress" />
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
    </HelmetProvider>
  );
}

export default App;
