import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiSearch, 
  FiFolder, 
  FiFileText, 
  FiHome, 
  FiUser, 
  FiBriefcase, 
  FiLayers, 
  FiCompass, 
  FiAward, 
  FiMail, 
  FiMoon, 
  FiSun, 
  FiGlobe, 
  FiDownload, 
  FiCopy, 
  FiExternalLink, 
  FiCornerDownLeft, 
  FiCheck,
  FiX
} from "react-icons/fi";
import { listProyek } from "../../data";
import { useLanguage } from "../../context/LanguageContext";
import { useCvModal } from "../../context/CvModalContext";
import { useCommandPalette } from "../../context/CommandPaletteContext";
import "./CommandPalette.css";

export default function CommandPalette() {
  const { isPaletteOpen, closePalette } = useCommandPalette();
  const { openCvModal } = useCvModal();
  const { language, setLanguage, isEn, t } = useLanguage();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState("");
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Focus input whenever palette opens
  useEffect(() => {
    if (isPaletteOpen) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 50);
    }
  }, [isPaletteOpen]);

  // Show quick toast notification
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
      closePalette();
    }, 1200);
  };

  const toggleTheme = () => {
    const isDark = document.body.classList.contains("dark");
    if (isDark) {
      document.body.classList.remove("dark");
      triggerToast(isEn ? "Light mode activated" : "Mode terang diaktifkan");
    } else {
      document.body.classList.add("dark");
      triggerToast(isEn ? "Dark mode activated" : "Mode gelap diaktifkan");
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("mhd.ghalibpradipa@gmail.com");
    triggerToast(isEn ? "Email copied to clipboard!" : "Email berhasil disalin!");
  };

  // Build searchable items list
  const allItems = useMemo(() => {
    // 1. Projects
    const projectItems = listProyek.map((p) => ({
      id: `project-${p.id}`,
      type: "project",
      category: isEn ? "Projects" : "Proyek",
      title: p.title,
      subtitle: p.subtitle,
      meta: p.tech ? p.tech.slice(0, 3).join(" • ") : p.categories?.join(", "),
      icon: <FiFolder className="item-icon item-icon--project" />,
      action: () => {
        closePalette();
        navigate(`/projects/${p.id}`);
      }
    }));

    // 2. Navigation items
    const navItems = [
      { id: "nav-home", type: "nav", category: isEn ? "Navigation" : "Navigasi", title: t("nav.home") || "Beranda", subtitle: isEn ? "Jump to Home Page" : "Ke Halaman Utama", icon: <FiHome className="item-icon" />, action: () => { closePalette(); navigate("/"); } },
      { id: "nav-about", type: "nav", category: isEn ? "Navigation" : "Navigasi", title: t("nav.about") || "Tentang", subtitle: isEn ? "Background & competencies" : "Profil & kompetensi diri", icon: <FiUser className="item-icon" />, action: () => { closePalette(); navigate("/about"); } },
      { id: "nav-experience", type: "nav", category: isEn ? "Navigation" : "Navigasi", title: t("nav.experience") || "Pengalaman", subtitle: isEn ? "Career & internship history" : "Riwayat karier & industri", icon: <FiBriefcase className="item-icon" />, action: () => { closePalette(); navigate("/experience"); } },
      { id: "nav-projects", type: "nav", category: isEn ? "Navigation" : "Navigasi", title: t("nav.projects") || "Semua Proyek", subtitle: isEn ? "Explore all works & apps" : "Kumpulan proyek & aplikasi", icon: <FiLayers className="item-icon" />, action: () => { closePalette(); navigate("/projects"); } },
      { id: "nav-journey", type: "nav", category: isEn ? "Navigation" : "Navigasi", title: t("nav.journey") || "Perjalanan", subtitle: isEn ? "Organizations & leadership" : "Organisasi & kepanitiaan", icon: <FiCompass className="item-icon" />, action: () => { closePalette(); navigate("/journey"); } },
      { id: "nav-achievements", type: "nav", category: isEn ? "Navigation" : "Navigasi", title: t("nav.achievements") || "Pencapaian", subtitle: isEn ? "Certifications & credentials" : "Sertifikasi profesional & lisensi", icon: <FiAward className="item-icon" />, action: () => { closePalette(); navigate("/achievements"); } },
      { id: "nav-contact", type: "nav", category: isEn ? "Navigation" : "Navigasi", title: t("nav.contact") || "Kontak", subtitle: isEn ? "Get in touch & direct message" : "Kirim pesan langsung & terhubung", icon: <FiMail className="item-icon" />, action: () => { closePalette(); navigate("/contact"); } }
    ];

    // 3. Quick Actions
    const actionItems = [
      {
        id: "act-preview-cv",
        type: "action",
        category: isEn ? "Quick Actions" : "Aksi Cepat",
        title: isEn ? "Preview CV / Resume" : "Lihat Sekilas CV (Preview)",
        subtitle: isEn ? "View official Curriculum Vitae" : "Buka dokumen CV di modal interaktif",
        icon: <FiFileText className="item-icon item-icon--cv" />,
        action: () => {
          closePalette();
          openCvModal();
        }
      },
      {
        id: "act-download-cv",
        type: "action",
        category: isEn ? "Quick Actions" : "Aksi Cepat",
        title: isEn ? "Download CV (PDF)" : "Unduh CV Langsung (PDF)",
        subtitle: isEn ? "Download latest resume file" : "Download file PDF CV Muhammad Ghalib Pradipa",
        icon: <FiDownload className="item-icon" />,
        action: () => {
          const a = document.createElement("a");
          a.href = "/assets/CV.pdf";
          a.download = "CV Muhammad Ghalib Pradipa.pdf";
          a.click();
          triggerToast(isEn ? "Downloading CV..." : "Mengunduh CV...");
        }
      },
      {
        id: "act-copy-email",
        type: "action",
        category: isEn ? "Quick Actions" : "Aksi Cepat",
        title: isEn ? "Copy Email Address" : "Salin Alamat Email",
        subtitle: "mhd.ghalibpradipa@gmail.com",
        icon: <FiCopy className="item-icon" />,
        action: copyEmail
      },
      {
        id: "act-toggle-theme",
        type: "action",
        category: isEn ? "Quick Actions" : "Aksi Cepat",
        title: isEn ? "Toggle Dark / Light Theme" : "Ganti Tema Gelap / Terang",
        subtitle: isEn ? "Switch appearance mode" : "Ubah mode tampilan website",
        icon: <FiMoon className="item-icon" />,
        action: toggleTheme
      },
      {
        id: "act-switch-lang",
        type: "action",
        category: isEn ? "Quick Actions" : "Aksi Cepat",
        title: language === "en" ? "Ganti Bahasa ke Indonesia (ID)" : "Switch Language to English (US)",
        subtitle: language === "en" ? "Alihkan bahasa ke Bahasa Indonesia" : "Switch language to English",
        icon: <FiGlobe className="item-icon" />,
        action: () => {
          const newLang = language === "en" ? "id" : "en";
          setLanguage(newLang);
          triggerToast(newLang === "en" ? "Language switched to English" : "Bahasa diubah ke Indonesia");
        }
      },
      {
        id: "act-linkedin",
        type: "action",
        category: isEn ? "Socials" : "Media Sosial",
        title: "LinkedIn Profile",
        subtitle: "linkedin.com/in/ghalibpradipaa",
        icon: <FiExternalLink className="item-icon" />,
        action: () => {
          window.open("https://www.linkedin.com/in/ghalibpradipaa", "_blank", "noopener,noreferrer");
          closePalette();
        }
      },
      {
        id: "act-instagram",
        type: "action",
        category: isEn ? "Socials" : "Media Sosial",
        title: "Instagram",
        subtitle: "@gpradiipaa",
        icon: <FiExternalLink className="item-icon" />,
        action: () => {
          window.open("https://www.instagram.com/gpradiipaa", "_blank", "noopener,noreferrer");
          closePalette();
        }
      }
    ];

    return [...projectItems, ...navItems, ...actionItems];
  }, [language, isEn, t, closePalette, openCvModal, navigate, setLanguage]);

  // Filter items based on query
  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems;

    const q = query.toLowerCase().trim();
    return allItems.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSubtitle = item.subtitle?.toLowerCase().includes(q);
      const matchMeta = item.meta?.toLowerCase().includes(q);
      const matchCategory = item.category?.toLowerCase().includes(q);
      return matchTitle || matchSubtitle || matchMeta || matchCategory;
    });
  }, [query, allItems]);

  // Handle keyboard navigation inside the list
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (filteredItems.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const activeItem = filteredItems[activeIndex];
      if (activeItem && activeItem.action) {
        activeItem.action();
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeElement = listRef.current.querySelector(".cp-item.active");
      if (activeElement) {
        activeElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [activeIndex]);

  if (!isPaletteOpen) return null;

  return (
    <div className="cp-overlay" onClick={closePalette} role="dialog" aria-modal="true">
      <div className="cp-dialog" onClick={(e) => e.stopPropagation()} onKeyDown={handleKeyDown}>
        {/* Search Header */}
        <div className="cp-header">
          <FiSearch className="cp-search-icon" size={18} />
          <input
            ref={inputRef}
            type="text"
            className="cp-input"
            placeholder={isEn ? "Type a command or search projects... (Ctrl + K)" : "Ketik perintah atau cari proyek... (Ctrl + K)"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query ? (
            <button className="cp-clear-btn" onClick={() => setQuery("")} aria-label="Clear search">
              <FiX size={16} />
            </button>
          ) : (
            <kbd className="cp-kbd">ESC</kbd>
          )}
        </div>

        {/* Results Body */}
        <div className="cp-body" ref={listRef}>
          {toastMessage ? (
            <div className="cp-toast">
              <FiCheck className="cp-toast-icon" />
              <span>{toastMessage}</span>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="cp-empty">
              <p className="cp-empty-title">{isEn ? "No results found" : "Tidak ada hasil ditemukan"}</p>
              <p className="cp-empty-desc">
                {isEn ? `No commands or projects match "${query}"` : `Tidak ada perintah atau proyek yang cocok dengan "${query}"`}
              </p>
            </div>
          ) : (
            <div className="cp-list">
              {filteredItems.map((item, index) => {
                const isActive = index === activeIndex;
                const isFirstOfCategory = index === 0 || filteredItems[index - 1].category !== item.category;

                return (
                  <React.Fragment key={item.id}>
                    {isFirstOfCategory && (
                      <div className="cp-category-header">
                        <span>{item.category}</span>
                      </div>
                    )}
                    <div
                      className={`cp-item ${isActive ? "active" : ""}`}
                      onClick={() => item.action && item.action()}
                      onMouseEnter={() => setActiveIndex(index)}
                    >
                      <div className="cp-item__left">
                        {item.icon}
                        <div className="cp-item__text">
                          <span className="cp-item__title">{item.title}</span>
                          {item.subtitle && <span className="cp-item__subtitle">{item.subtitle}</span>}
                        </div>
                      </div>

                      <div className="cp-item__right">
                        {item.meta && <span className="cp-item__meta">{item.meta}</span>}
                        {isActive && <FiCornerDownLeft className="cp-item__enter-icon" size={14} />}
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div className="cp-footer">
          <div className="cp-footer__shortcuts">
            <span className="cp-shortcut"><kbd>↑</kbd><kbd>↓</kbd> {isEn ? "Navigate" : "Navigasi"}</span>
            <span className="cp-shortcut"><kbd>↵</kbd> {isEn ? "Select" : "Pilih"}</span>
            <span className="cp-shortcut"><kbd>ESC</kbd> {isEn ? "Close" : "Tutup"}</span>
          </div>

          <span className="cp-footer__count">
            {filteredItems.length} {isEn ? "items" : "item"}
          </span>
        </div>
      </div>
    </div>
  );
}
