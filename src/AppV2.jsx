import { useState, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import HomeSection from "./components/v2/HomeSection";
import AboutSection from "./components/v2/AboutSection";
import ExperienceSection from "./components/v2/ExperienceSection";
import ProjectsSection from "./components/v2/ProjectsSection";
import JourneySection from "./components/v2/JourneySection";
import AchievementsSection from "./components/v2/AchievementsSection";
import ContactSection from "./components/v2/ContactSection";
import "./AppV2.css";

const SECTIONS = ["home", "about", "experience", "projects", "journey", "achievements", "contact"];

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const sectionRefs = useRef({});

  // Intersection Observer to track active section
  useEffect(() => {
    const observers = [];
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="app-v2">
      {/* Left Sidebar */}
      <Sidebar activeSection={activeSection} />

      {/* Main Content */}
      <main className="app-v2__main">
        {/* Mobile Top Nav (hidden on desktop) */}
        <div className="app-v2__mobile-nav">
          <img src="/assets/ghalib.png" alt="Ghalib" className="app-v2__mobile-avatar" />
          <span className="app-v2__mobile-name">M. Ghalib Pradipa</span>
          <nav className="app-v2__mobile-tabs">
            {SECTIONS.map((id) => (
              <button
                key={id}
                className={`app-v2__mobile-tab ${activeSection === id ? "active" : ""}`}
                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Sections with dividers between them */}
        <div className="app-v2__sections">
          <HomeSection />
          <div className="app-v2__section-gap" />
          <AboutSection />
          <div className="app-v2__section-gap" />
          <ExperienceSection />
          <div className="app-v2__section-gap" />
          <ProjectsSection />
          <div className="app-v2__section-gap" />
          <JourneySection />
          <div className="app-v2__section-gap" />
          <AchievementsSection />
          <div className="app-v2__section-gap" />
          <ContactSection />
        </div>

        {/* Footer */}
        <footer className="app-v2__footer">
          <p>© 2026 Muhammad Ghalib Pradipa · Dibuat dengan ❤️ menggunakan React</p>
        </footer>
      </main>

      {/* Right panel scroll indicator */}
      <div className="app-v2__scroll-indicator" aria-hidden="true">
        {SECTIONS.map((id, i) => (
          <button
            key={id}
            className={`app-v2__scroll-dot ${activeSection === id ? "active" : ""}`}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
            title={id}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
