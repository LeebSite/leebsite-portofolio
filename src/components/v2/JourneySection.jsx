import { useState } from "react";
import { LuCalendar, LuMapPin, LuLayoutGrid } from "react-icons/lu";
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
  const { t, journeyList } = useLanguage();

  const filtered = active === "All"
    ? journeyList
    : journeyList.filter(j => j.cat === active);

  const counts = {};
  CATEGORIES.forEach(c => {
    counts[c] = c === "All" ? journeyList.length : journeyList.filter(j => j.cat === c).length;
  });

  return (
    <section id="journey" className="journey-section">
      <div className="journey-section__header">
        <h1 className="journey-section__title">{t("journey.title")}</h1>
        <p className="journey-section__subtitle">
          {t("journey.subtitle")}
        </p>
      </div>

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

      {/* Timeline feed */}
      <div className="journey-feed">
        {filtered.map((item, i) => {
          const catStyle = CAT_COLORS[item.cat] || { bg: "#f3f4f6", text: "#374151" };
          return (
            <div key={item.id} className="journey-card">
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
            </div>
          );
        })}
      </div>
    </section>
  );
}
