import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { LuCalendar, LuMapPin, LuLayoutGrid } from "react-icons/lu";
import { Reveal, EASE, fadeUp, staggerParent } from "../motion/Reveal";
import "./JourneySection.css";
import { useLanguage } from "../../context/LanguageContext";

const CATEGORIES = ["All", "Organisasi", "Industri", "Komunitas", "Kepanitiaan"];

const CAT_COLORS = {
  Organisasi: { bg: "#ede9fe", text: "#6d28d9" },
  Industri:   { bg: "#fee2e2", text: "#b91c1c" },
  Komunitas:  { bg: "#cffafe", text: "#0e7490" },
  Kepanitiaan:{ bg: "#fef3c7", text: "#92400e" },
};

export default function JourneySection() {
  const [active, setActive] = useState("All");
  const [mobileExpanded, setMobileExpanded] = useState({ 0: true });
  const { t, journeyList } = useLanguage();
  const feedRef = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: feedRef,
    offset: ["start 0.75", "end 0.95"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

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

  const filtered = active === "All"
    ? journeyList
    : journeyList.filter(j => j.cat === active);

  const counts = {};
  CATEGORIES.forEach(c => {
    counts[c] = c === "All" ? journeyList.length : journeyList.filter(j => j.cat === c).length;
  });

  return (
    <section id="journey" className="journey-section">
      <Reveal>
        <div className="journey-section__header">
          <h1 className="journey-section__title">{t("journey.title")}</h1>
          <p className="journey-section__subtitle">
            {t("journey.subtitle")}
          </p>
        </div>
      </Reveal>

      <div className="journey-section__divider" />

      {/* Filter tabs */}
      <div className="journey-filter">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`journey-filter__btn ${active === cat ? "active" : ""}`}
            onClick={() => setActive(cat)}
          >
            {cat === "All" && <LuLayoutGrid size={13} />}
            {t(`journey.categories.${cat}`) || cat}
            <span className="journey-filter__count">{counts[cat]}</span>
          </button>
        ))}
      </div>

      {/* Mobile accordion vs Desktop timeline feed */}
      {isMobile ? (
        <motion.div
          key={active}
          className="journey-accordion-list"
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {filtered.map((item, idx) => {
            const catStyle = CAT_COLORS[item.cat] || { bg: "#f3f4f6", text: "#374151" };
            const isAccordionOpen = mobileExpanded[idx] ?? false;

            return (
              <motion.div key={item.id} variants={fadeUp} className="journey-accordion-card">
                <div
                  className="journey-accordion-header"
                  onClick={() => toggleMobileAccordion(idx)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="journey-accordion-header__meta">
                    <span
                      className="journey-card__cat"
                      style={{ background: catStyle.bg, color: catStyle.text }}
                    >
                      {t(`journey.categories.${item.cat}`) || item.cat}
                    </span>
                    <span className="journey-accordion-date">
                      <LuCalendar size={11} style={{ display: "inline", marginRight: "3px" }} />
                      {item.date}
                    </span>
                  </div>
                  <div className="journey-accordion-header__row">
                    <h3 className="journey-accordion-title">{item.title}</h3>
                    <div className={`journey-accordion-chevron ${isAccordionOpen ? "open" : ""}`}>
                      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="17" width="17" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
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
                      <div className="journey-accordion-body">
                        <div className="journey-card__meta" style={{ marginBottom: "8px" }}>
                          <span className="journey-card__meta-item">
                            <LuMapPin size={12} />
                            {item.location}
                          </span>
                        </div>
                        <p className="journey-card__desc">{item.desc}</p>
                        {item.image && (
                          <div className="journey-card__img-wrapper" style={{ marginTop: "10px" }}>
                            <img
                              src={item.image}
                              alt={item.title}
                              className="journey-card__img"
                              onError={(e) => { e.target.parentElement.style.display = "none"; }}
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <div className="journey-feed" ref={feedRef}>
          <motion.div
            className="journey-feed__progress-line"
            style={{
              scaleY: reduce ? 1 : scaleY,
              transformOrigin: "top",
            }}
          />
          <motion.div
            key={active}
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            style={{ display: "flex", flexDirection: "column", gap: 0, width: "100%" }}
          >
            {filtered.map((item, i) => {
              const catStyle = CAT_COLORS[item.cat] || { bg: "#f3f4f6", text: "#374151" };
              return (
                <motion.div key={item.id} variants={fadeUp} className="journey-card">
                  {/* Timeline dot */}
                  <div className="journey-card__dot-col">
                    <div
                      className="journey-card__dot"
                      style={{ background: item.color, boxShadow: `0 0 0 5px ${item.color}20` }}
                    />
                    {i < filtered.length - 1 && (
                      <div className="journey-card__connector" style={{ background: `linear-gradient(to bottom, ${item.color}40, transparent)` }} />
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="journey-card__body">
                    {/* Left: Text Content */}
                    <div className="journey-card__content">
                      <div className="journey-card__header">
                        <span
                          className="journey-card__cat"
                          style={{ background: catStyle.bg, color: catStyle.text }}
                        >
                          {t(`journey.categories.${item.cat}`) || item.cat}
                        </span>
                        <div className="journey-card__meta">
                          <span className="journey-card__meta-item">
                            <LuCalendar size={12} />
                            {item.date}
                          </span>
                          <span className="journey-card__meta-sep">•</span>
                          <span className="journey-card__meta-item">
                            <LuMapPin size={12} />
                            {item.location}
                          </span>
                        </div>
                      </div>

                      <h3 className="journey-card__title">{item.title}</h3>
                      <p className="journey-card__desc">{item.desc}</p>
                    </div>

                    {/* Right: Image */}
                    {item.image && (
                      <div className="journey-card__img-wrapper">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="journey-card__img"
                          onError={(e) => { e.target.parentElement.style.display = "none"; }}
                        />
                        <div className="journey-card__img-overlay" />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      )}
    </section>
  );
}
