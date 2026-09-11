import { useState } from "react";
import { LuBriefcase } from "react-icons/lu";
import "./ExperienceSection.css";
import { useLanguage } from "../../context/LanguageContext";

export default function ExperienceSection() {
  const { t, experienceList } = useLanguage();
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', x + 'px');
    e.currentTarget.style.setProperty('--mouse-y', y + 'px');
  };
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="experience" className="experience-section">
      <div className="experience-section__header">
        <h1 className="experience-section__title">{t("experience.title")}</h1>
        <p className="experience-section__subtitle">{t("experience.subtitle")}</p>
      </div>

      <div className="experience-section__divider" />

      <div className="exp-block">
        <h2 className="exp-block__title">
          <LuBriefcase style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px', color: 'var(--text-secondary)' }}/> 
          {t("experience.workExp")}
        </h2>
        <p className="exp-block__subtitle">{t("experience.workSubtitle")}</p>

        <div className="exp-list">
          {experienceList.map((exp) => (
            <div key={exp.id} className="exp-card" onMouseMove={handleMouseMove}>
              <div className="exp-card__logo-wrapper" style={{ "--logo-color": exp.logoColor }}>
                <img
                  src={exp.companyLogo}
                  alt={exp.company}
                  className="exp-card__logo"
                  onError={(e) => {
                    e.target.style.display = "none";
                    if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div
                  className="exp-card__logo-fallback"
                  style={{ display: "none", background: exp.logoColor }}
                >
                  {exp.company[0]}
                </div>
              </div>

              <div className="exp-card__body">
                <div className="exp-card__top">
                  <div>
                    <h3 className="exp-card__role">{exp.role}</h3>
                    <p className="exp-card__company">
                      {exp.company} &nbsp;•&nbsp; {exp.location}
                    </p>
                    <p className="exp-card__meta">
                      {exp.period} &nbsp;•&nbsp; {exp.duration} &nbsp;•&nbsp;
                      <span className="exp-card__badge exp-card__badge--type">{exp.type}</span>
                      &nbsp;•&nbsp;
                      <span className="exp-card__badge exp-card__badge--mode">{exp.mode}</span>
                    </p>
                  </div>
                </div>

                <button
                  className="exp-card__toggle"
                  onClick={() => toggleExpand(exp.id)}
                >
                  {expanded[exp.id] ? t("experience.hideDetail") : t("experience.showDetail")}
                </button>

                {expanded[exp.id] && (
                  <div className="exp-card__detail">
                    <ul className="exp-card__desc">
                      {exp.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    <div className="exp-card__skills">
                      {exp.skills.map((s, i) => (
                        <span key={i} className="exp-skill-tag">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
