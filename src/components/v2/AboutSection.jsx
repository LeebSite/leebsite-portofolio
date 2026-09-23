import { LuGraduationCap, LuWrench, LuCode, LuDatabase, LuPalette, LuUsers } from "react-icons/lu";
import "./AboutSection.css";
import { useLanguage } from "../../context/LanguageContext";
import GitHubStatsWidget from "../GitHubStatsWidget/GitHubStatsWidget";

export default function AboutSection() {
  const { t, isEn } = useLanguage();
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', x + 'px');
    e.currentTarget.style.setProperty('--mouse-y', y + 'px');
  };
  return (
    <section id="about" className="about-section">
      <div className="about-section__header">
        <h1 className="about-section__title">{t("about.title")}</h1>
        <p className="about-section__subtitle">{t("about.subtitle")}</p>
      </div>

      <div className="about-section__divider" />

      <div className="about-section__bio">
        <p>
          {t("about.bio1")}
        </p>
        <p className="mt-4">
          {t("about.bio2")}
        </p>
        <p className="mt-4">
          {t("about.bio3")}
        </p>
        <div className="about-section__competencies" style={{ marginTop: '32px' }}>
          <h3 className="about-section__sub-title" style={{ marginBottom: '16px' }}>
            <LuWrench className="about-section__icon-inline" /> {t("about.compTitle")}
          </h3>
          <div className="competencies-grid">
            <div className="comp-card" onMouseMove={handleMouseMove}>
              <div className="comp-card__icon"><LuCode /></div>
              <h4 className="comp-card__title">{t("about.comp1Title")}</h4>
              <p className="comp-card__desc">{t("about.comp1Desc")}</p>
            </div>
            <div className="comp-card" onMouseMove={handleMouseMove}>
              <div className="comp-card__icon"><LuDatabase /></div>
              <h4 className="comp-card__title">{t("about.comp2Title")}</h4>
              <p className="comp-card__desc">{t("about.comp2Desc")}</p>
            </div>
            <div className="comp-card" onMouseMove={handleMouseMove}>
              <div className="comp-card__icon"><LuPalette /></div>
              <h4 className="comp-card__title">{t("about.comp3Title")}</h4>
              <p className="comp-card__desc">{t("about.comp3Desc")}</p>
            </div>
            <div className="comp-card" onMouseMove={handleMouseMove}>
              <div className="comp-card__icon"><LuUsers /></div>
              <h4 className="comp-card__title">{t("about.comp4Title")}</h4>
              <p className="comp-card__desc">{t("about.comp4Desc")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-section__divider" />

      {/* Education */}
      <div className="about-section__edu-block">
        <h2 className="about-section__sub-title"><LuGraduationCap className="about-section__icon-inline" /> {t("about.eduTitle")}</h2>
        <p className="about-section__section-subtitle">{t("about.eduSubtitle")}</p>

        <div className="edu-card">
          <div className="edu-card__logo-wrapper">
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjfvDbFXCj-rhZkD4imXKAbCGRaRAkdHIndPbLFP_vveRj6gCoNJkiHAeP50Uhq9bKKTqp3-5cGWMC7nBmMpg7h03Asj1dMlCgmysCIOBSPOj9ER6n1uQ9SUZNTmKza3OIa57YFrwadjMHDOuYwa9j5rDB7C2oPQZTiYGH0_dXvIdaCWMZKUfhxQ9IOog/s1560/Logo%20Universitas%20Islam%20Negeri%20Sultan%20Syarif%20Kasim%20Riau%20(UIN%20Suska%20Riau).png"
              alt="UIN Suska Riau"
              className="edu-card__logo"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/48x48?text=UIN";
              }}
            />
          </div>
          <div className="edu-card__info">
            <h3 className="edu-card__school">UIN Sultan Syarif Kasim Riau</h3>
            <p className="edu-card__degree">
              {t("about.degree")} &nbsp;•&nbsp;{" "}
              <strong>{t("about.gpaLabel")}: 3.66/4.00</strong>
            </p>
            <p className="edu-card__period">2022 — 2026 &nbsp;&nbsp; {t("about.locationEdu")}</p>
          </div>
        </div>
      </div>

      <div className="about-section__divider" />

      {/* Quick Stats */}
      <div className="about-section__stats">
        <div className="about-stat">
          <span className="about-stat__value">10<span className="about-stat__plus">+</span></span>
          <span className="about-stat__label">{t("about.statProjects")}</span>
        </div>
        <div className="about-stat">
          <span className="about-stat__value">3<span className="about-stat__plus">+</span></span>
          <span className="about-stat__label">{t("about.statExp")}</span>
        </div>
        <div className="about-stat">
          <span className="about-stat__value">3.66<span className="about-stat__plus">/4.00</span></span>
          <span className="about-stat__label">{t("about.statGpa")}</span>
        </div>
        <div className="about-stat">
          <span className="about-stat__value">10<span className="about-stat__plus">+</span></span>
          <span className="about-stat__label">{t("about.statCert")}</span>
        </div>
      </div>

      <div className="about-section__divider" />

      {/* GitHub Live Stats Widget */}
      <div className="about-section__github">
        <h2 className="about-section__sub-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="about-section__icon-inline" style={{color:'var(--text-secondary)'}}>
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub Activity
        </h2>
        <p className="about-section__section-subtitle">
          {isEn ? "Live stats from GitHub public API · Auto-refreshed every 10 minutes" : "Statistik langsung dari GitHub API publik · Diperbarui otomatis setiap 10 menit"}
        </p>
        <GitHubStatsWidget />
      </div>
    </section>
  );
}
