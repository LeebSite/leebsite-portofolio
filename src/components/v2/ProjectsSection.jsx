import { useState } from "react";
import "./ProjectsSection.css";
import { listProyek } from "../../data";
import { LuLayoutGrid, LuGlobe, LuSmartphone, LuPenTool, LuLink, LuExternalLink } from "react-icons/lu";

const filterCategories = [
  { id: "All", label: "All", icon: <LuLayoutGrid size={14}/> },
  { id: "Website", label: "Website", icon: <LuGlobe size={14}/> },
  { id: "Mobile", label: "Mobile", icon: <LuSmartphone size={14}/> },
  { id: "UI/UX Design", label: "UI/UX Design", icon: <LuPenTool size={14}/> },
  { id: "Associated", label: "Associated", icon: <LuLink size={14}/> },
];

const TECH_COLORS = {
  "React.js": "#61DAFB", "FastAPI": "#009688", "Python": "#3776AB",
  "TailwindCSS": "#06B6D4", "Vite": "#646CFF", "Node.js": "#339933",
  "Flutter": "#02569B", "Dart": "#0175C2", "Firebase": "#FFCA28",
  "Figma": "#F24E1E", "PHP": "#777BB4", "Laravel": "#FF2D20",
  "MySQL": "#4479A1", "Bootstrap": "#7952B3", "HTML": "#E34F26",
  "CSS": "#1572B6", "JavaScript": "#F7DF1E", "TypeScript": "#3178C6",
  "Shadcn UI": "#18181B", "Framer Motion": "#0055FF", "Google Cloud": "#4285F4",
  "Midtrans": "#4C8BF5", "Railway": "#0B0D0E", "Express.js": "#000000",
  "C#": "#239120", "ASP.NET": "#512BD4", "Next.js": "#000000",
};

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", (e.clientX - rect.left) + "px");
    e.currentTarget.style.setProperty("--mouse-y", (e.clientY - rect.top) + "px");
  };

  const filteredProjects = listProyek.filter((p) =>
    activeFilter === "All" || (p.categories && p.categories.includes(activeFilter))
  );

  const counts = {};
  filterCategories.forEach(cat => {
    counts[cat.id] = cat.id === "All"
      ? listProyek.length
      : listProyek.filter(p => p.categories && p.categories.includes(cat.id)).length;
  });

  return (
    <section id="projects" className="projects-section">
      <div className="projects-section__header">
        <h1 className="projects-section__title">Proyek</h1>
        <p className="projects-section__subtitle">
          Etalase proyek pribadi maupun sumber terbuka yang telah saya bangun atau kontribusikan.
        </p>
      </div>

      <div className="projects-filter">
        {filterCategories.map((cat) => (
          <button
            key={cat.id}
            className={`projects-filter__btn ${activeFilter === cat.id ? "active" : ""}`}
            onClick={() => setActiveFilter(cat.id)}
          >
            {cat.icon} {cat.label}
            <span className="projects-filter__count">{counts[cat.id]}</span>
          </button>
        ))}
      </div>

      <div className="projects-masonry">
        {filteredProjects.map((proyek) => (
          <div key={proyek.id} className="project-card" onMouseMove={handleMouseMove}>
            {/* Card Image */}
            <div className="project-card__img-wrapper">
              {proyek.featured && (
                <div className="project-card__featured">
                  <span className="featured-dot" /> Featured
                </div>
              )}
              <img
                src={proyek.image}
                alt={proyek.title}
                className="project-card__img"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>

            {/* Card Body */}
            <div className="project-card__body">
              <div className="project-card__categories">
                {proyek.categories && proyek.categories.map((cat, idx) => (
                  <span key={idx} className="project-card__cat-pill">{cat}</span>
                ))}
              </div>

              <h3 className="project-card__title">{proyek.title}</h3>
              <p className="project-card__desc">
                {proyek.fullDescription
                  ? proyek.fullDescription.substring(0, 120) + "..."
                  : proyek.subtitle}
              </p>

              {/* Tech Pills */}
              <div className="project-card__tech">
                {proyek.tech && proyek.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="project-card__tech-pill"
                    style={{ "--dot-color": TECH_COLORS[t] || "#9ca3af" }}
                  >
                    <span className="tech-dot" />
                    {t}
                  </span>
                ))}
              </div>

              {/* Link */}
              <a
                href={proyek.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card__link"
              >
                <LuExternalLink size={13} /> Lihat Proyek
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
