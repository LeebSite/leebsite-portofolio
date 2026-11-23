import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuGraduationCap, LuWrench, LuCode, LuDatabase, LuPalette, LuUsers } from "react-icons/lu";
import { Reveal, EASE, fadeUp, staggerParent } from "../motion/Reveal";
import "./AboutSection.css";
import { useLanguage } from "../../context/LanguageContext";
import GitHubStatsWidget from "../GitHubStatsWidget/GitHubStatsWidget";

export default function AboutSection() {
  const { t, isEn } = useLanguage();
  const [bioExpanded, setBioExpanded] = useState(false);
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

  return (
    <section id="about" className="about-section">
      <Reveal>
        <div className="about-section__header">
          <h1 className="about-section__title">{t("about.title")}</h1>
          <p className="about-section__subtitle">{t("about.subtitle")}</p>
        </div>
      </Reveal>

      <div className="about-section__divider" />

      <div className="about-section__bio">
        <Reveal delay={0}>
          <p>
            {t("about.bio1")}
          </p>
        </Reveal>

        {!isMobile ? (
          <div className="about-section__bio-extra">
            <Reveal delay={0.08}>
              <p className="mt-4">
                {t("about.bio2")}
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4">
                {t("about.bio3")}
              </p>
            </Reveal>
          </div>
        ) : (
          <AnimatePresence>
            {bioExpanded && (
              <motion.div
                className="about-section__bio-extra expanded"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                style={{ overflow: "hidden" }}
              >
                <p className="mt-4">
                  {t("about.bio2")}
                </p>
                <p className="mt-4">
                  {t("about.bio3")}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        <button
          type="button"
          className="about-section__read-more-btn"
          onClick={() => setBioExpanded(!bioExpanded)}
        >
          <span>{bioExpanded ? (isEn ? "Show less" : "Tampilkan lebih sedikit") : (isEn ? "Read more" : "Baca selengkapnya")}</span>
          <svg className={`about-section__read-more-arrow ${bioExpanded ? "up" : ""}`} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="14" width="14" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>

        <div className="about-section__competencies" style={{ marginTop: '32px' }}>
          <h3 className="about-section__sub-title" style={{ marginBottom: '16px' }}>
            <LuWrench className="about-section__icon-inline" /> {t("about.compTitle")}
          </h3>
          <motion.div
            className="competencies-grid"
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="comp-card"
              onMouseMove={handleMouseMove}
            >
              <div className="comp-card__icon"><LuCode /></div>
              <h4 className="comp-card__title">{t("about.comp1Title")}</h4>
              <p className="comp-card__desc">{t("about.comp1Desc")}</p>
            </motion.div>
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="comp-card"
              onMouseMove={handleMouseMove}
            >
              <div className="comp-card__icon"><LuDatabase /></div>
              <h4 className="comp-card__title">{t("about.comp2Title")}</h4>
              <p className="comp-card__desc">{t("about.comp2Desc")}</p>
            </motion.div>
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="comp-card"
              onMouseMove={handleMouseMove}
            >
              <div className="comp-card__icon"><LuPalette /></div>
              <h4 className="comp-card__title">{t("about.comp3Title")}</h4>
              <p className="comp-card__desc">{t("about.comp3Desc")}</p>
            </motion.div>
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="comp-card"
              onMouseMove={handleMouseMove}
            >
              <div className="comp-card__icon"><LuUsers /></div>
              <h4 className="comp-card__title">{t("about.comp4Title")}</h4>
              <p className="comp-card__desc">{t("about.comp4Desc")}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="about-section__divider" />

      {/* Education & Organization */}
      <div className="about-section__edu-block">
        <Reveal>
          <h3 className="about-section__sub-title" style={{ marginBottom: "12px" }}>
            <LuGraduationCap className="about-section__icon-inline" /> {isEn ? "Education & Organization" : "Pendidikan & Organisasi"}
          </h3>
          <div className="edu-card" style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "16px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <LuGraduationCap style={{ color: "var(--accent-blue)", flexShrink: 0 }} size={18} />
              <a
                href="https://tif.uin-suska.ac.id/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--text-primary)",
                  textDecoration: "none",
                  fontSize: "13.5px",
                  fontWeight: 500,
                  transition: "color 0.2s ease"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent-blue)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
              >
                S1 Teknik Informatika — UIN Sultan Syarif Kasim Riau (IPK 3.66)
              </a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <LuUsers style={{ color: "var(--accent-yellow)", flexShrink: 0 }} size={18} />
              <a
                href="https://hima.tif.uin-suska.ac.id/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--text-primary)",
                  textDecoration: "none",
                  fontSize: "13.5px",
                  fontWeight: 500,
                  transition: "color 0.2s ease"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent-blue)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
              >
                Wakil Ketua HIMATIF (Des 2024–Des 2025)
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="about-section__divider" />

      {/* GitHub Live Stats Widget */}
      <div className="about-section__github">
        <Reveal>
          <GitHubStatsWidget />
        </Reveal>
      </div>
    </section>
  );
}
