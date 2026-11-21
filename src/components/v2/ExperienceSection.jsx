import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { LuBriefcase } from "react-icons/lu";
import { Reveal, EASE, staggerParent } from "../motion/Reveal";
import "./ExperienceSection.css";
import { useLanguage } from "../../context/LanguageContext";

export default function ExperienceSection() {
  const { t, experienceList } = useLanguage();
  const [expanded, setExpanded] = useState({});
  const [mobileExpanded, setMobileExpanded] = useState({ 0: true });
  const reduce = useReducedMotion();

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

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', x + 'px');
    e.currentTarget.style.setProperty('--mouse-y', y + 'px');
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMobileAccordion = (index) => {
    setMobileExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const cardVariants = {
    hidden: (custom) => {
      if (custom.reduce) return { opacity: 1, x: 0, y: 0 };
      if (custom.isMobile) {
        return { opacity: 0, y: 16, x: 0 };
      }
      return {
        opacity: 0,
        y: 24,
        x: 0,
      };
    },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: custom.isMobile ? 0.5 : 0.6,
        ease: EASE,
      },
    }),
  };

  return (
    <section id="experience" className="experience-section">
      <Reveal>
        <div className="experience-section__header">
          <h1 className="experience-section__title">{t("experience.title")}</h1>
          <p className="experience-section__subtitle">{t("experience.subtitle")}</p>
        </div>
      </Reveal>

      <div className="experience-section__divider" />

      <div className="exp-block">
        <h2 className="exp-block__title">
          <LuBriefcase style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px', color: 'var(--text-secondary)' }}/> 
          {t("experience.workExp")}
        </h2>
        <p className="exp-block__subtitle">{t("experience.workSubtitle")}</p>

        <motion.div
          className="exp-list"
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {experienceList.map((exp, idx) => {
            const isAccordionOpen = mobileExpanded[idx] ?? false;

            return (
              <motion.div
                key={exp.id}
                custom={{ idx, isMobile, reduce }}
                variants={cardVariants}
                whileHover={!isMobile ? { y: -4 } : undefined}
                className={`exp-card ${isMobile ? "exp-card--mobile-accordion" : ""}`}
                onMouseMove={!isMobile ? handleMouseMove : undefined}
              >
                {isMobile ? (
                  <>
                    <div
                      className="exp-accordion-header"
                      onClick={() => toggleMobileAccordion(idx)}
                      role="button"
                      tabIndex={0}
                    >
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
                      <div className="exp-accordion-header__titles">
                        <h3 className="exp-card__role">{exp.role}</h3>
                        <p className="exp-card__company">{exp.company}</p>
                        <span className="exp-card__period">{exp.period}</span>
                      </div>
                      <div className={`exp-accordion-chevron ${isAccordionOpen ? "open" : ""}`}>
                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isAccordionOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="exp-accordion-body">
                            <div className="exp-card__meta">
                              <p className="exp-card__location">{exp.location} &nbsp;•&nbsp; {exp.duration}</p>
                              <div className="exp-card__badges">
                                <span className="exp-card__badge exp-card__badge--type">{exp.type}</span>
                                <span className="exp-card__badge exp-card__badge--mode">{exp.mode}</span>
                              </div>
                            </div>
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
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <>
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

                      <AnimatePresence>
                        {expanded[exp.id] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: EASE }}
                            style={{ overflow: "hidden" }}
                          >
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
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
