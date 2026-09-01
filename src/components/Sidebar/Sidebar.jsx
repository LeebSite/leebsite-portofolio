import { useState } from "react";
import "./Sidebar.css";

const navItems = [
  { id: "home", label: "Beranda", icon: "🏠" },
  { id: "about", label: "Tentang", icon: "👤" },
  { id: "experience", label: "Pengalaman", icon: "💼" },
  { id: "projects", label: "Proyek", icon: "🗂️" },
  { id: "journey", label: "Perjalanan", icon: "🎯" },
  { id: "achievements", label: "Pencapaian", icon: "🏆" },
  { id: "contact", label: "Kontak", icon: "✉️" },
];

export default function Sidebar({ activeSection }) {
  const [lang, setLang] = useState("ID");
  const [darkMode, setDarkMode] = useState(true);

  const handleNavClick = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

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
          Abidino Nurkhiansyah
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
          <button
            key={item.id}
            className={`sidebar__nav-item ${activeSection === item.id ? "active" : ""}`}
            onClick={() => handleNavClick(item.id)}
          >
            <span className="sidebar__nav-icon">{item.icon}</span>
            <span className="sidebar__nav-label">{item.label}</span>
            {activeSection === item.id && (
              <span className="sidebar__nav-arrow">→</span>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
}
