import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const navItems = [
  { id: "home", path: "/", label: "Beranda", icon: "🏠" },
  { id: "about", path: "/about", label: "Tentang", icon: "👤" },
  { id: "experience", path: "/experience", label: "Pengalaman", icon: "💼" },
  { id: "projects", path: "/projects", label: "Proyek", icon: "🗂️" },
  { id: "journey", path: "/journey", label: "Perjalanan", icon: "🎯" },
  { id: "achievements", path: "/achievements", label: "Pencapaian", icon: "🏆" },
  { id: "contact", path: "/contact", label: "Kontak", icon: "✉️" },
];

export default function Sidebar() {
  const [lang, setLang] = useState("ID");
  const [darkMode, setDarkMode] = useState(true);

  return (
    <aside className="sidebar">
      {/* Profile Card */}
      <div className="sidebar__profile">
        <div className="sidebar__avatar-wrapper">
          <img
            src="/assets/ghalib.png"
            alt="Ghalib Pradipa"
            className="sidebar__avatar"
          />
          <span className="sidebar__status-dot" />
        </div>
        <h2 className="sidebar__name">
          Muhammad Ghalib Pradipa
          <span className="sidebar__verified" title="Verified">✓</span>
        </h2>
        <p className="sidebar__title">Software Engineer Enthusiast</p>

        {/* Action Buttons */}
        <div className="sidebar__actions">
          <button
            className={`sidebar__action-btn ${lang === "US" ? "active" : ""}`}
            onClick={() => setLang("US")}
            title="English"
          >
            US
          </button>
          <button
            className={`sidebar__action-btn sidebar__action-btn--yellow ${lang === "ID" ? "active" : ""}`}
            onClick={() => setLang("ID")}
            title="Indonesia"
          >
            ID
          </button>
          <button
            className="sidebar__action-btn sidebar__action-btn--icon"
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle Theme"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
          <button
            className="sidebar__action-btn sidebar__action-btn--icon"
            title="Copy Link"
            onClick={() => navigator.clipboard?.writeText(window.location.href)}
          >
            🔗
          </button>
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
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
