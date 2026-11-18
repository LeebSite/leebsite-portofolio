import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiFolder, FiBriefcase, FiAward, FiDatabase, FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { listProyek } from "../../data";
import { Reveal, EASE, fadeUp, staggerParent } from "../motion/Reveal";
import "./HomeSection.css";
import { useLanguage } from "../../context/LanguageContext";

const ALL_SKILLS = [
  // Languages & Frameworks
  { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg", color: "#239120", cats: ["Backend", "Main"] },
  { name: "ASP.NET Core", icon: "https://cdn.simpleicons.org/dotnet/512BD4", color: "#512BD4", cats: ["Backend", "Main"] },
  { name: "PHP", icon: "https://cdn.simpleicons.org/php/777BB4", color: "#777BB4", cats: ["Backend", "Main"] },
  { name: "Laravel", icon: "https://cdn.simpleicons.org/laravel/FF2D20", color: "#FF2D20", cats: ["Backend", "Main"] },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", color: "#F7DF1E", cats: ["Frontend", "Main"] },
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB", color: "#61DAFB", cats: ["Frontend", "Main"] },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/000000", color: "#000000", cats: ["Frontend", "Backend", "Main"] },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB", color: "#3776AB", cats: ["Backend", "Data", "Main"] },
  { name: "FastAPI", icon: "https://cdn.simpleicons.org/fastapi/009688", color: "#009688", cats: ["Backend", "Main"] },

  // Data
  { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg", color: "#CC292B", cats: ["Database", "Data", "Main"] },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1", color: "#4479A1", cats: ["Database", "Main"] },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1", color: "#4169E1", cats: ["Database", "Main"] },
  { name: "Power BI", icon: "/assets/powerbi.svg", color: "#F2C811", cats: ["Data", "Main"] },
  { name: "Looker Studio", icon: "https://cdn.simpleicons.org/looker/4285F4", color: "#4285F4", cats: ["Data", "Tools"] },
  { name: "Microsoft Excel (Advanced)", icon: "/assets/excel.svg", color: "#217346", cats: ["Data", "Main"] },
  { name: "Pandas", icon: "https://cdn.simpleicons.org/pandas/150458", color: "#150458", cats: ["Data", "Backend"] },

  // Tools & Platforms
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032", color: "#F05032", cats: ["Tools", "Main"] },
  { name: "GitHub", icon: "https://cdn.simpleicons.org/github/181717", color: "#181717", cats: ["Tools", "Main"] },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED", color: "#2496ED", cats: ["Tools", "Main"] },
  { name: "Docker Compose", icon: "https://cdn.simpleicons.org/docker/2496ED", color: "#2496ED", cats: ["Tools"] },
  { name: "Postman", icon: "https://cdn.simpleicons.org/postman/FF6C37", color: "#FF6C37", cats: ["Tools"] },
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E", color: "#F24E1E", cats: ["Tools"] },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", color: "#007ACC", cats: ["Tools", "Main"] },
  { name: "Vite", icon: "https://cdn.simpleicons.org/vite/646CFF", color: "#646CFF", cats: ["Frontend", "Tools"] },
  { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4", color: "#06B6D4", cats: ["Frontend", "Main"] },
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", color: "#E34F26", cats: ["Frontend"] },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", color: "#1572B6", cats: ["Frontend"] },
  { name: "Bootstrap", icon: "https://cdn.simpleicons.org/bootstrap/7952B3", color: "#7952B3", cats: ["Frontend"] },
  { name: "REST APIs", icon: "https://cdn.simpleicons.org/fastapi/009688", color: "#009688", cats: ["Backend", "Tools"] }
];

const TABS = ["All", "Main", "Frontend", "Backend", "Data", "Database", "Tools"];

export default function HomeSection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [bioExpanded, setBioExpanded] = useState(false);
  const [skillsExpanded, setSkillsExpanded] = useState(false);
  const { t, isEn, projectTranslations } = useLanguage();

  const FEATURED_PROJECT_IDS = [5, 4, 13];
  const featuredProjects = FEATURED_PROJECT_IDS.map(id => listProyek.find(p => p.id === id)).filter(Boolean);

  const greetingWords = isEn
    ? ["Hello,", "I'm", "Muhammad Ghalib Pradipa"]
    : ["Halo,", "saya", "Muhammad Ghalib Pradipa"];

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

  const filteredSkills = ALL_SKILLS.filter(skill => 
    activeTab === "All" || skill.cats.includes(activeTab)
  );

  return (
    <section id="home" className="home-section">
      <div className="home-section__header">
        <h1 className="home-section__title">
          {greetingWords.map((word, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: EASE }}
              style={{ display: "inline-block", marginRight: "0.28em" }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.div
          className="home-section__meta"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
        >
          <span className="home-section__meta-item">
            <span className="home-section__meta-dot" />
            {t("home.domicile")}
          </span>
          <span className="home-section__meta-divider"> </span>
          <span className="home-section__meta-item">{t("home.onsite")}</span>
        </motion.div>
      </div>

      <div className="home-section__divider" />

      <motion.div
        className="home-section__bio"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
      >
        <p dangerouslySetInnerHTML={{ __html: t("home.bio1Html") }} />
        <div className={`home-section__bio-extra ${bioExpanded ? "expanded" : ""}`}>
          <p className="mt-4" dangerouslySetInnerHTML={{ __html: t("home.bio2Html") }} />
        </div>
        <button
          type="button"
          className="home-section__read-more-btn"
          onClick={() => setBioExpanded(!bioExpanded)}
        >
          <span>{bioExpanded ? (isEn ? "Show less" : "Tampilkan lebih sedikit") : (isEn ? "Read more" : "Baca selengkapnya")}</span>
          <svg className={`home-section__read-more-arrow ${bioExpanded ? "up" : ""}`} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="14" width="14" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
      </motion.div>

      <div className="home-section__divider" />

      {/* Stats Proof Row */}
      <Reveal delay={0.1}>
        <div className="home-section__stats">
          <div className="home-stat-card">
            <div className="home-stat-card__icon"><FiFolder size={18} /></div>
            <div className="home-stat-card__content">
              <span className="home-stat-card__value">15</span>
              <span className="home-stat-card__label">{t("home.stats.projects") || "Proyek"}</span>
            </div>
          </div>
          <div className="home-stat-card">
            <div className="home-stat-card__icon"><FiBriefcase size={18} /></div>
            <div className="home-stat-card__content">
              <span className="home-stat-card__value">3</span>
              <span className="home-stat-card__label">{t("home.stats.internships") || "Magang Industri"}</span>
            </div>
          </div>
          <div className="home-stat-card">
            <div className="home-stat-card__icon"><FiAward size={18} /></div>
            <div className="home-stat-card__content">
              <span className="home-stat-card__value">13</span>
              <span className="home-stat-card__label">{t("home.stats.certifications") || "Sertifikasi"}</span>
            </div>
          </div>
          <div className="home-stat-card">
            <div className="home-stat-card__icon"><FiDatabase size={18} /></div>
            <div className="home-stat-card__content">
              <span className="home-stat-card__value">{isEn ? "20,000+" : "20.000+"}</span>
              <span className="home-stat-card__label">{t("home.stats.dataRows") || "Baris Data Diolah"}</span>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="home-section__divider" />

      {/* Skills */}
      <div className="home-section__skills-block">
        <Reveal>
          <h2 className="home-section__section-title">
            {t("home.skillsTitle")}
          </h2>
          <p className="home-section__section-subtitle">{t("home.skillsSubtitle")}</p>
        </Reveal>

        {/* Filter Tabs */}
        {(!isMobile || skillsExpanded) && (
          <div className="skills__filter-tabs">
            {TABS.map((tab) => {
              const count = tab === "All" ? ALL_SKILLS.length : ALL_SKILLS.filter(s => s.cats.includes(tab)).length;
              const tabLabel = t(`home.tabs.${tab}`) || tab;
              return (
                <button 
                  key={tab} 
                  className={`skills__tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tabLabel} <span className="skills__tab-count">{count}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Skill Badges */}
        {!isMobile ? (
          <motion.div
            className="skills__badges"
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {filteredSkills.map((skill) => (
              <motion.div 
                key={skill.name} 
                variants={fadeUp}
                whileHover={{ y: -3, scale: 1.03 }}
                className={`skill-badge ${skill.name.length > 18 ? "skill-badge--wide" : ""}`}
                style={{ "--badge-color": skill.color }}
              >
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="skill-badge__icon"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
                <span className="skill-badge__name">{skill.name}</span>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <>
            <motion.div
              className="skills__badges"
              variants={staggerParent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {ALL_SKILLS.slice(0, 12).map((skill) => (
                <motion.div 
                  key={skill.name} 
                  variants={fadeUp}
                  whileHover={{ y: -3, scale: 1.03 }}
                  className={`skill-badge ${skill.name.length > 18 ? "skill-badge--wide" : ""}`}
                  style={{ "--badge-color": skill.color }}
                >
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="skill-badge__icon"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                  <span className="skill-badge__name">{skill.name}</span>
                </motion.div>
              ))}
            </motion.div>

            <AnimatePresence>
              {skillsExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="skills__badges" style={{ marginTop: "8px" }}>
                    {ALL_SKILLS.slice(12).map((skill) => (
                      <motion.div 
                        key={skill.name} 
                        variants={fadeUp}
                        whileHover={{ y: -3, scale: 1.03 }}
                        className={`skill-badge ${skill.name.length > 18 ? "skill-badge--wide" : ""}`}
                        style={{ "--badge-color": skill.color }}
                      >
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="skill-badge__icon"
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                        <span className="skill-badge__name">{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="button"
              className="skills__expand-btn"
              onClick={() => setSkillsExpanded(!skillsExpanded)}
            >
              <span>
                {skillsExpanded
                  ? (isEn ? "Show fewer skills" : "Tampilkan lebih sedikit")
                  : (isEn ? `Show all ${ALL_SKILLS.length} skills` : `Lihat semua ${ALL_SKILLS.length} skill`)}
              </span>
              <svg
                style={{
                  transform: skillsExpanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease"
                }}
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="15"
                width="15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </>
        )}
      </div>

      <div className="home-section__divider" />

      {/* Featured Projects Block */}
      <div className="home-section__featured-block">
        <Reveal>
          <div className="home-section__section-header-row">
            <div>
              <h2 className="home-section__section-title">
                {t("home.featuredTitle") || "Proyek Unggulan"}
              </h2>
              <p className="home-section__section-subtitle">
                {t("home.featuredSubtitle") || "Tiga proyek representatif dengan arsitektur modern dan dampak nyata."}
              </p>
            </div>
            <button
              type="button"
              className="home-section__view-all-link"
              onClick={() => {
                if (isMobile) {
                  const el = document.getElementById("projects");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                    return;
                  }
                }
                navigate("/projects");
              }}
            >
              <span>{t("home.viewAllProjects") || "Lihat Semua Proyek"}</span>
              <FiArrowRight size={14} />
            </button>
          </div>
        </Reveal>

        <motion.div
          className="home-featured__grid"
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {featuredProjects.map((p) => {
            const tr = isEn && projectTranslations[p.id]?.en;
            const subtitle = tr?.subtitle || p.subtitle;
            return (
              <motion.div
                key={p.id}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="home-featured-card"
                onClick={() => navigate(`/projects/${p.id}`)}
                role="button"
                tabIndex={0}
              >
                <div className="home-featured-card__thumb-wrap">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="home-featured-card__thumb"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <span className="home-featured-card__badge">
                    {t(`projects.tabs.${p.categories?.[0]}`) || p.categories?.[0] || "Website"}
                  </span>
                </div>
                <div className="home-featured-card__body">
                  <h3 className="home-featured-card__title">{p.title}</h3>
                  <p className="home-featured-card__desc">{subtitle}</p>
                  <div className="home-featured-card__tech">
                    {p.tech && p.tech.slice(0, 3).map((tName, idx) => (
                      <span key={idx} className="home-featured-card__tech-tag">{tName}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
