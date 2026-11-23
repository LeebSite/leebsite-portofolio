import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { HiCheckBadge } from "react-icons/hi2";
import {
  FiHome,
  FiUser,
  FiBriefcase,
  FiLayers,
  FiCompass,
  FiAward,
  FiMail,
  FiSearch,
  FiFileText,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext";
import { useCvModal } from "../../context/CvModalContext";
import { useCommandPalette } from "../../context/CommandPaletteContext";
import "./HomeNav.css";

export default function HomeNav({ isScrolled }) {
  const { openCvModal } = useCvModal();
  const { openPalette } = useCommandPalette();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => document.body.classList.contains("dark"));

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const navItems = [
    { id: "home", path: "/", label: t("nav.home"), icon: <FiHome /> },
    { id: "about", path: "/about", label: t("nav.about"), icon: <FiUser /> },
    { id: "experience", path: "/experience", label: t("nav.experience"), icon: <FiBriefcase /> },
    { id: "projects", path: "/projects", label: t("nav.projects"), icon: <FiLayers /> },
    { id: "journey", path: "/journey", label: t("nav.journey"), icon: <FiCompass /> },
    { id: "achievements", path: "/achievements", label: t("nav.achievements"), icon: <FiAward /> },
    { id: "contact", path: "/contact", label: t("nav.contact"), icon: <FiMail /> },
  ];

  return (
    <aside className="sidebar home-nav">
      {/* Scrolled avatar: the hero photo's morph target. Absolute so it fills
          the empty top space WITHOUT pushing the toggle/menus down (no
          layout shift when it appears). Reuses the Sidebar profile classes,
          so it looks exactly like the avatar on About. */}
      {isScrolled && (
        <motion.div
          className="home-nav__profile"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div className="sidebar__avatar-wrapper">
            <motion.img
              src="/assets/ghalibpradipa.png"
              alt="Muhammad Ghalib Pradipa"
              className="sidebar__avatar"
              layoutId="profile-photo"
              transition={{ type: "spring", stiffness: 120, damping: 30 }}
            />
          </div>
          <h2 className="sidebar__name">
            Muhammad Ghalib Pradipa
            <HiCheckBadge className="sidebar__verified-icon" title={t("nav.verified")} />
          </h2>
          <p className="sidebar__title">{t("nav.roleTitle")}</p>
        </motion.div>
      )}

      <div className="home-nav__controls">
        <div className="sidebar__actions-wrapper">
          <div className="sidebar__lang-toggle">
            <button
              className={`sidebar__lang-btn ${language === "en" ? "active" : ""}`}
              onClick={() => setLanguage("en")}
              title="English (US)"
            >
              US
            </button>
            <button
              className={`sidebar__lang-btn ${language === "id" ? "active" : ""}`}
              onClick={() => setLanguage("id")}
              title="Bahasa Indonesia (ID)"
            >
              ID
            </button>
          </div>

          <button
            className="sidebar__icon-btn"
            onClick={() => setDarkMode((current) => !current)}
            title="Toggle Dark Mode"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FiMoon size={16} /> : <FiSun size={16} />}
          </button>

          <button
            type="button"
            onClick={openCvModal}
            className="sidebar__icon-btn sidebar__icon-btn--cv"
            title={t("cvModal.previewCv") || "Lihat Sekilas CV (Preview)"}
          >
            <FiFileText size={16} />
            <span className="sidebar__icon-btn-text">Preview CV</span>
          </button>
        </div>

        <div className="sidebar__search-wrapper">
          <button
            type="button"
            onClick={openPalette}
            className="sidebar__search-btn"
            title="Cari Cepat & Command Palette (Ctrl + K)"
          >
            <FiSearch className="sidebar__search-icon" size={14} />
            <span className="sidebar__search-text">
              {t("cmdPalette.searchPlaceholder") || "Cari cepat..."}
            </span>
            <kbd className="sidebar__search-kbd">Ctrl K</kbd>
          </button>
        </div>
      </div>

      <div className="sidebar__divider" />

      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `sidebar__nav-item ${isActive || (item.id === "projects" && location.pathname.startsWith("/projects")) ? "active" : ""}`
            }
          >
            <span className="sidebar__nav-icon">{item.icon}</span>
            <span className="sidebar__nav-label">{item.label}</span>
            <span className="sidebar__nav-arrow">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
