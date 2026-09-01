import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiHome, FiUser, FiBriefcase, FiLayers, FiCompass, FiAward, FiMail, FiMenu, FiX } from "react-icons/fi";
import { HiCheckBadge } from "react-icons/hi2";
import "./MobileHeader.css";

const navItems = [
  { id: "home", path: "/", label: "Home", icon: <FiHome /> },
  { id: "about", path: "/about", label: "About", icon: <FiUser /> },
  { id: "experience", path: "/experience", label: "Experience", icon: <FiBriefcase /> },
  { id: "projects", path: "/projects", label: "Projects", icon: <FiLayers /> },
  { id: "journey", path: "/journey", label: "Journey", icon: <FiCompass /> },
  { id: "achievements", path: "/achievements", label: "Achievements", icon: <FiAward /> },
  { id: "contact", path: "/contact", label: "Contact", icon: <FiMail /> },
];

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("ID");

  useEffect(() => {
    setDarkMode(document.body.classList.contains("dark"));
  }, []);

  const toggleDarkMode = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <header className="mobile-header">
        <div className="mobile-header__profile">
          <img src="/assets/ghalibpradipa.png" alt="M Ghalib Pradipa" className="mobile-header__avatar" />
          <h2 className="mobile-header__name">
            Muhammad Ghalib Pradipa
            <HiCheckBadge className="mobile-header__verified" />
          </h2>
        </div>
        <button className="mobile-header__menu-btn" onClick={() => setIsOpen(true)}>
          <FiMenu size={24} />
        </button>
      </header>

      {/* Overlay */}
      <div className={`mobile-drawer-overlay ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(false)} />

      {/* Drawer */}
      <div className={`mobile-drawer ${isOpen ? "open" : ""}`}>
        <div className="mobile-drawer__header">
          <h2 className="mobile-drawer__title">Navigation</h2>
          <button className="mobile-drawer__close-btn" onClick={() => setIsOpen(false)}>
            <FiX size={24} />
          </button>
        </div>

        <div className="mobile-drawer__actions">
          <button className="mobile-drawer__icon-btn" onClick={toggleDarkMode}>
            {darkMode ? (
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"></path></svg>
            ) : (
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"></path></svg>
            )}
          </button>
          
          <div className="mobile-drawer__lang-toggle">
            <button className={`mobile-drawer__lang-btn ${lang === "US" ? "active" : ""}`} onClick={() => setLang("US")}>US</button>
            <button className={`mobile-drawer__lang-btn mobile-drawer__lang-btn--yellow ${lang === "ID" ? "active" : ""}`} onClick={() => setLang("ID")}>ID</button>
          </div>

          <a href="/assets/CV.pdf" download="CV Muhammad Ghalib Pradipa.pdf" className="mobile-drawer__icon-btn">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM18 20H6V4h6v6h6v10z"></path><path d="M11 10h2v4h-2zm-1 5h4v2h-4z"></path></svg>
          </a>
        </div>

        <div className="mobile-drawer__divider" />

        <nav className="mobile-drawer__nav">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) => `mobile-drawer__nav-item ${isActive ? "active" : ""}`}
            >
              <span className="mobile-drawer__nav-icon">{item.icon}</span>
              <span className="mobile-drawer__nav-label">{item.label}</span>
              <span className="mobile-drawer__nav-arrow">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}