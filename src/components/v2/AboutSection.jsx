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
        <GitHubStatsWidget />
      </div>
    </section>
  );
}

