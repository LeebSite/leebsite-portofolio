import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiUser, FiBriefcase, FiLayers, FiCompass, FiAward, FiMail } from "react-icons/fi";
import { HiCheckBadge } from "react-icons/hi2";
import "./Sidebar.css";

const navItems = [
  { id: "home", path: "/", label: "Beranda", icon: <FiHome /> },
  { id: "about", path: "/about", label: "Tentang", icon: <FiUser /> },
  { id: "experience", path: "/experience", label: "Pengalaman", icon: <FiBriefcase /> },
  { id: "projects", path: "/projects", label: "Proyek", icon: <FiLayers /> },
  { id: "journey", path: "/journey", label: "Perjalanan", icon: <FiCompass /> },
  { id: "achievements", path: "/achievements", label: "Pencapaian", icon: <FiAward /> },
  { id: "contact", path: "/contact", label: "Kontak", icon: <FiMail /> },
];

export default function Sidebar() {
  const [lang, setLang] = useState("ID");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <aside className="sidebar">
      {/* Profile Card */}
      <div className="sidebar__profile">
        <div className="sidebar__avatar-wrapper">
          <img
            src="/assets/ghalib.png"
            alt="Muhammad Ghalib Pradipa"
            className="sidebar__avatar"
          />
        </div>
        <h2 className="sidebar__name">
          Muhammad Ghalib Pradipa
          <HiCheckBadge className="sidebar__verified-icon" />
        </h2>
        <p className="sidebar__title">Software Engineer Enthusiast</p>

        {/* Action Buttons */}
        <div className="sidebar__actions-wrapper">
          <div className="sidebar__lang-toggle">
            <button
              className={`sidebar__lang-btn ${lang === "US" ? "active" : ""}`}
              onClick={() => setLang("US")}
            >
              US
            </button>
            <button
              className={`sidebar__lang-btn sidebar__lang-btn--yellow ${lang === "ID" ? "active" : ""}`}
              onClick={() => setLang("ID")}
            >
              ID
            </button>
          </div>
          
          <button
            className="sidebar__icon-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"></path></svg>
            ) : (
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"></path></svg>
            )}
          </button>
          
          <a href="/assets/CV.pdf" download="CV Muhammad Ghalib Pradipa.pdf" className="sidebar__icon-btn" title="Download CV"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM18 20H6V4h6v6h6v10z"></path><path d="M11 10h2v4h-2zm-1 5h4v2h-4z"></path></svg></a>
        </div>
      </div>

      {/* Divider */}
      <div className="sidebar__divider" />

      {/* Navigation */}
      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) => 
              `sidebar__nav-item ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar__nav-icon">{item.icon}</span>
            <span className="sidebar__nav-label">{item.label}</span>
            {/* Adding the right arrow logic like the screenshot */}
            <span className="sidebar__nav-arrow">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </span>
          </NavLink>
        ))}
      </nav>
          <div className="sidebar__cv-wrapper">
        <a href="/assets/CV.pdf" download="CV Muhammad Ghalib Pradipa.pdf" className="sidebar__cv-btn">
          <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="15" width="15" xmlns="http://www.w3.org/2000/svg"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span>Unduh CV</span>
        </a>
      </div>
    </aside>
  );
}
