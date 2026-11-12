import { useState, useEffect } from "react";
import "./AchievementsSection.css";
import { listCertifications } from "../../data";
import { useLanguage } from "../../context/LanguageContext";

export default function AchievementsSection() {
  const { t } = useLanguage();
  const [mobileExpanded, setMobileExpanded] = useState({ 0: true });

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(max-width: 900px)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 900px)");
    const onChange = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const toggleMobileAccordion = (index) => {
    setMobileExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section id="achievements" className="achievements-section">
      <div className="achievements-section__header">
        <h1 className="achievements-section__title">{t("achievements.title")}</h1>
        <p className="achievements-section__subtitle">{t("achievements.subtitle")}</p>
      </div>

      <div className="achievements-section__divider" />

      {/* Mobile Accordion vs Desktop List */}
      {isMobile ? (
        <div className="cert-accordion-list">
          {listCertifications.map((cert, idx) => {
            const isAccordionOpen = mobileExpanded[idx] ?? false;

            return (
              <div key={cert.id} className="cert-accordion-card">
                <div
                  className="cert-accordion-header"
                  onClick={() => toggleMobileAccordion(idx)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="cert-card__logo-wrapper">
                    <img
                      src={cert.logo}
                      alt={cert.issuer}
                      className="cert-card__logo"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  </div>
                  <div className="cert-accordion-header__text">
                    <h3 className="cert-accordion-title">{cert.title}</h3>
                    <p className="cert-accordion-sub">{cert.issuer} &nbsp;•&nbsp; {cert.date}</p>
                  </div>
                  <div className={`cert-accordion-chevron ${isAccordionOpen ? "open" : ""}`}>
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="17" width="17" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>

                {isAccordionOpen && (
                  <div className="cert-accordion-body">
                    <div className="cert-card__skills">
                      {cert.skills.map((s, i) => (
                        <span key={i} className="cert-skill-tag">{s}</span>
                      ))}
                    </div>
                    {cert.credentialLink && cert.credentialLink !== "#" && (
                      <a
                        href={cert.credentialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-card__link"
                      >
                        {t("achievements.showCredential")}
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="cert-list">
          {listCertifications.map((cert) => (
            <div key={cert.id} className="cert-card">
              <div className="cert-card__logo-wrapper">
                <img
                  src={cert.logo}
                  alt={cert.issuer}
                  className="cert-card__logo"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
              <div className="cert-card__body">
                <h3 className="cert-card__title">{cert.title}</h3>
                <p className="cert-card__issuer">{cert.issuer}</p>
                <p className="cert-card__date">{cert.date}</p>
                <div className="cert-card__skills">
                  {cert.skills.map((s, i) => (
                    <span key={i} className="cert-skill-tag">{s}</span>
                  ))}
                </div>
                {cert.credentialLink && cert.credentialLink !== "#" && (
                  <a
                    href={cert.credentialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-card__link"
                  >
                    {t("achievements.showCredential")}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
