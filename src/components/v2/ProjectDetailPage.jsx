import { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  FiArrowLeft, 
  FiArrowRight, 
  FiExternalLink, 
  FiShare2, 
  FiCheck, 
  FiLayers, 
  FiCpu, 
  FiCode, 
  FiCheckCircle, 
  FiFolder,
  FiGithub,
  FiX,
  FiMaximize2,
  FiMinus,
  FiPlus,
  FiRotateCcw
} from "react-icons/fi";
import { LuGlobe, LuSparkles, LuZoomIn, LuZoomOut } from "react-icons/lu";
import { listProyek } from "../../data";
import { useLanguage } from "../../context/LanguageContext";
import "./ProjectDetailPage.css";

const TECH_COLORS = {
  "React.js": "#61DAFB", "FastAPI": "#009688", "Python": "#3776AB",
  "TailwindCSS": "#06B6D4", "Tailwind CSS": "#06B6D4", "Vite": "#646CFF", "Node.js": "#339933",
  "Flutter": "#02569B", "Dart": "#0175C2", "Firebase": "#FFCA28",
  "Figma": "#F24E1E", "PHP": "#777BB4", "Laravel": "#FF2D20",
  "MySQL": "#4479A1", "Bootstrap": "#7952B3", "HTML": "#E34F26", "HTML5": "#E34F26",
  "CSS": "#1572B6", "CSS3": "#1572B6", "JavaScript": "#F7DF1E", "TypeScript": "#3178C6",
  "C#": "#239120", "ASP.NET": "#512BD4", "ASP.NET Core": "#512BD4", "Next.js": "#000000",
  "Express.js": "#000000", "Canva": "#00C4CC", "Flipbook Engine": "#8b5cf6", "Clean Architecture": "#10b981",
  "SQL Server": "#CC292B", "WebGIS": "#0ea5e9", "RESTful API": "#10b981", "NLP": "#ec4899", "AI": "#8b5cf6",
  "Fullstack Web": "#3b82f6", "XGBoost": "#f97316", "K-Means": "#a855f7", "SHAP": "#eab308", "Docker Compose": "#2496ED",
  "OpenCV": "#5C3EE8", "KNN": "#f59e0b", "GLCM": "#06b6d4", "Google Colab": "#F9AB00", "WordPress": "#21759B", "UI/UX Design": "#ec4899"
};

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isEn, projectTranslations, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  // Lightbox & Zoom State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Scroll to top on id change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const mainEl = document.querySelector(".app-v2__main");
    if (mainEl) mainEl.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const currentIndex = listProyek.findIndex((p) => String(p.id) === String(id));
  const project = listProyek[currentIndex];

  const prevProject = currentIndex > 0 ? listProyek[currentIndex - 1] : null;
  const nextProject = currentIndex < listProyek.length - 1 ? listProyek[currentIndex + 1] : null;

  // Translation helpers
  const tr = isEn && project ? projectTranslations[project.id]?.en : null;
  const title = project?.title || "";
  const subtitle = tr?.subtitle || project?.subtitle || "";
  const fullDescription = tr?.fullDescription || project?.fullDescription || "";

  // Dynamic Document Title
  useEffect(() => {
    if (project) {
      document.title = `${project.title} - Muhammad Ghalib Pradipa`;
    }
    return () => {
      document.title = "Muhammad Ghalib Pradipa - Portfolio";
    };
  }, [project]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen]);

  // Lightbox Zoom Controls
  const handleOpenLightbox = () => {
    setZoomLevel(1);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    setZoomLevel(1);
  }, []);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.35, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.35, 0.75));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const handleToggleZoom = (e) => {
    e.stopPropagation();
    setZoomLevel((prev) => (prev > 1.2 ? 1 : 1.8));
  };

  // Keyboard Shortcuts for Lightbox (ESC, +, -, 0)
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleCloseLightbox();
      } else if (e.key === "+" || e.key === "=") {
        handleZoomIn();
      } else if (e.key === "-") {
        handleZoomOut();
      } else if (e.key === "0") {
        handleResetZoom();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, handleCloseLightbox]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!project) {
    return (
      <div className="project-detail-notfound">
        <div className="project-detail-notfound__card">
          <FiFolder size={48} className="project-detail-notfound__icon" />
          <h2>{t("projectDetail.notFound") || "Proyek Tidak Ditemukan"}</h2>
          <p>{t("projectDetail.notFoundDesc") || "Maaf, proyek yang Anda cari tidak tersedia atau telah dipindahkan."}</p>
          <button onClick={() => navigate("/projects")} className="project-detail__btn-primary">
            <FiArrowLeft /> {t("projectDetail.backToProjects") || "Kembali ke Semua Proyek"}
          </button>
        </div>
      </div>
    );
  }

  const hasLiveUrl = project.url && project.url !== "#" && project.url.trim() !== "";

  return (
    <div className="project-detail-page">
      {/* Top Breadcrumb & Navigation */}
      <div className="project-detail__top-nav">
        <button 
          onClick={() => navigate("/projects")} 
          className="project-detail__back-btn"
          aria-label="Back to projects"
        >
          <FiArrowLeft size={16} />
          <span>{t("projectDetail.backToProjects") || "Kembali ke Semua Proyek"}</span>
        </button>

        <div className="project-detail__top-meta">
          <span className="project-detail__id-pill">Project #{String(project.id).padStart(2, '0')}</span>
          <button 
            onClick={handleShare} 
            className={`project-detail__share-btn ${copied ? 'copied' : ''}`}
            title="Bagikan Tautan Proyek"
          >
            {copied ? <FiCheck size={14} /> : <FiShare2 size={14} />}
            <span>{copied ? (t("projectDetail.copied") || "Tersalin!") : (t("projectDetail.shareProject") || "Bagikan")}</span>
          </button>
        </div>
      </div>

      {/* Main Showcase Hero */}
      <div className="project-detail__hero-card">
        <div 
          className="project-detail__img-container"
          onClick={handleOpenLightbox}
          title={t("projectDetail.clickToZoom") || "Klik untuk memperbesar screenshot"}
        >
          <img
            src={project.image}
            alt={title}
            className="project-detail__hero-img"
            onError={(e) => {
              if (!e.target.dataset.fallbackTried) {
                e.target.dataset.fallbackTried = "true";
                e.target.src = "/assets/proyek/projek" + (((project.id - 1) % 6) + 1) + ".png";
              }
            }}
          />

          {/* Hover Zoom Hint Overlay */}
          <div className="project-detail__zoom-hint">
            <LuZoomIn size={16} />
            <span>{t("projectDetail.clickToZoom") || "Klik untuk Memperbesar"}</span>
          </div>

          {project.featured && (
            <div className="project-detail__featured-badge">
              <LuSparkles size={13} />
              <span>{t("projects.featured") || "Unggulan"}</span>
            </div>
          )}
        </div>

        <div className="project-detail__header-content">
          <div className="project-detail__categories">
            {project.categories && project.categories.map((cat, idx) => (
              <span key={idx} className="project-detail__cat-tag">
                <FiFolder size={11} /> {cat}
              </span>
            ))}
          </div>

          <h1 className="project-detail__title">{title}</h1>
          <p className="project-detail__subtitle">{subtitle}</p>

          {/* Quick Action Links Bar */}
          <div className="project-detail__actions-bar">
            {hasLiveUrl && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-detail__btn-primary"
              >
                <LuGlobe size={16} />
                <span>{t("projectDetail.viewLive") || "Kunjungi Website"}</span>
                <FiExternalLink size={14} />
              </a>
            )}

            {project.github && project.github !== "#" ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-detail__btn-github"
              >
                <FiGithub size={16} />
                <span>{t("projectDetail.viewCode") || "Source Code"}</span>
                <FiExternalLink size={14} />
              </a>
            ) : (
              <button
                type="button"
                className="project-detail__btn-github"
                onClick={(e) => {
                  e.preventDefault();
                }}
                title="Tautan repositori akan segera diperbarui"
              >
                <FiGithub size={16} />
                <span>{t("projectDetail.viewCode") || "Source Code"}</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleOpenLightbox}
              className="project-detail__btn-preview-zoom"
              title={t("projectDetail.clickToZoom") || "Lihat Screenshot Resolusi Penuh"}
            >
              <FiMaximize2 size={15} />
              <span>{t("projectDetail.fullscreenPreview") || "Lihat Layar Penuh"}</span>
            </button>

            <div className="project-detail__status-indicator">
              <FiCheckCircle className="status-icon" size={15} />
              <span>{t("projectDetail.completed") || "Selesai & Terverifikasi"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Content Grid */}
      <div className="project-detail__body-grid">
        {/* Left / Main Section: Description & Deep Dive */}
        <div className="project-detail__main-content">
          {/* Section: Overview */}
          <div className="project-detail__section-card">
            <div className="project-detail__section-header">
              <FiLayers className="section-icon" />
              <h2>{t("projectDetail.overview") || "Ikhtisar & Latar Belakang"}</h2>
            </div>
            <div className="project-detail__desc-body">
              <p>{fullDescription}</p>
            </div>
          </div>

          {/* Section: Tech Stack */}
          <div className="project-detail__section-card">
            <div className="project-detail__section-header">
              <FiCode className="section-icon" />
              <h2>{t("projectDetail.techStack") || "Teknologi & Tools yang Digunakan"}</h2>
            </div>
            <div className="project-detail__tech-grid">
              {project.tech && project.tech.map((techItem, idx) => (
                <div 
                  key={idx} 
                  className="project-detail__tech-item"
                  style={{ "--item-color": TECH_COLORS[techItem] || "#3b82f6" }}
                >
                  <span className="tech-item-dot" />
                  <span className="tech-item-name">{techItem}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section: Quick Info Sidebar */}
        <div className="project-detail__sidebar-info">
          <div className="project-detail__info-card">
            <h3 className="project-detail__info-heading">
              <FiCpu /> {t("projectDetail.projectInfo") || "Informasi Proyek"}
            </h3>

            <div className="project-detail__info-list">
              <div className="project-detail__info-row">
                <span className="info-label">{t("projectDetail.category") || "Kategori"}</span>
                <span className="info-value">{project.categories ? project.categories.join(", ") : "Web Application"}</span>
              </div>
              <div className="project-detail__info-row">
                <span className="info-label">Tech Stack Utama</span>
                <span className="info-value">{project.tech ? project.tech.slice(0, 3).join(", ") : "Full-Stack"}</span>
              </div>
              <div className="project-detail__info-row">
                <span className="info-label">{t("projectDetail.status") || "Status"}</span>
                <span className="info-value status-completed">
                  <span className="pulse-dot" /> {t("projectDetail.completed") || "Selesai"}
                </span>
              </div>
              <div className="project-detail__info-row">
                <span className="info-label">Peringkat Unggulan</span>
                <span className="info-value">#0{project.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Prev / Next Navigation Bar */}
      <div className="project-detail__bottom-nav">
        {prevProject ? (
          <Link to={`/projects/${prevProject.id}`} className="project-nav-card prev">
            <FiArrowLeft className="nav-arrow" size={20} />
            <div className="nav-content">
              <span className="nav-label">{t("projectDetail.prevProject") || "Proyek Sebelumnya"}</span>
              <span className="nav-title">{prevProject.title}</span>
            </div>
          </Link>
        ) : (
          <div className="project-nav-card disabled" />
        )}

        {nextProject ? (
          <Link to={`/projects/${nextProject.id}`} className="project-nav-card next">
            <div className="nav-content right-align">
              <span className="nav-label">{t("projectDetail.nextProject") || "Proyek Selanjutnya"}</span>
              <span className="nav-title">{nextProject.title}</span>
            </div>
            <FiArrowRight className="nav-arrow" size={20} />
          </Link>
        ) : (
          <div className="project-nav-card disabled" />
        )}
      </div>

      {/* ============================================================
          INTERACTIVE IMAGE LIGHTBOX / FULLSCREEN ZOOM MODAL
         ============================================================ */}
      {isLightboxOpen && (
        <div className="lightbox-overlay" onClick={handleCloseLightbox} role="dialog" aria-modal="true">
          <div className="lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            {/* Lightbox Header Bar */}
            <div className="lightbox-header">
              <div className="lightbox-header__title-box">
                <span className="lightbox-header__badge">
                  <FiMaximize2 size={13} /> {t("projectDetail.fullscreenPreview") || "Pratinjau Layar Penuh"}
                </span>
                <h3 className="lightbox-header__title">{title}</h3>
              </div>

              {/* Lightbox Toolbar Controls */}
              <div className="lightbox-toolbar">
                <button 
                  onClick={handleZoomOut} 
                  className="lightbox-tool-btn" 
                  title={t("projectDetail.zoomOut") || "Perkecil (-)"}
                  disabled={zoomLevel <= 0.75}
                >
                  <FiMinus size={16} />
                </button>

                <button 
                  onClick={handleResetZoom} 
                  className="lightbox-zoom-indicator" 
                  title={t("projectDetail.resetZoom") || "Reset Ukuran (100%)"}
                >
                  {Math.round(zoomLevel * 100)}%
                </button>

                <button 
                  onClick={handleZoomIn} 
                  className="lightbox-tool-btn" 
                  title={t("projectDetail.zoomIn") || "Perbesar (+)"}
                  disabled={zoomLevel >= 3}
                >
                  <FiPlus size={16} />
                </button>

                <button 
                  onClick={handleResetZoom} 
                  className="lightbox-tool-btn" 
                  title={t("projectDetail.resetZoom") || "Reset Zoom (0)"}
                >
                  <FiRotateCcw size={15} />
                </button>

                <div className="lightbox-toolbar__divider" />

                <button 
                  onClick={handleCloseLightbox} 
                  className="lightbox-tool-btn lightbox-tool-btn--close" 
                  title="Tutup (Esc)"
                  aria-label="Tutup"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>

            {/* Lightbox Stage (Scrollable / Pannable Image Container) */}
            <div 
              className={`lightbox-stage ${zoomLevel > 1 ? 'is-zoomed' : ''}`}
              onDoubleClick={handleToggleZoom}
            >
              <div 
                className="lightbox-img-wrapper"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <img
                  src={project.image}
                  alt={title}
                  className="lightbox-img"
                  draggable={false}
                />
              </div>
            </div>

            {/* Lightbox Footer Tip */}
            <div className="lightbox-footer">
              <span className="lightbox-tip">
                💡 {t("projectDetail.zoomTip") || "Klik 2x pada gambar atau gunakan tombol di atas untuk zoom • Tekan ESC untuk keluar"}
              </span>
              <span className="lightbox-counter">
                Project #{String(project.id).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
