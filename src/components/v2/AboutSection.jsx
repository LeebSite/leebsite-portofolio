import { LuGraduationCap, LuWrench, LuCode, LuDatabase, LuPalette, LuUsers } from "react-icons/lu";
import "./AboutSection.css";
import { useLanguage } from "../../context/LanguageContext";

export default function AboutSection() {
  const { t } = useLanguage();
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
    </section>
  );
}
