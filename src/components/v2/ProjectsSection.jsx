import { useState, useRef } from "react";
import "./ProjectsSection.css";
import { listProyek } from "../../data";
import { LuLayoutGrid, LuGlobe, LuSmartphone, LuPenTool, LuLink } from "react-icons/lu";

// ---- 3D Tilt Hook ----
function useTilt() {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    // position of cursor relative to card center, normalized -1 to 1
    const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 → 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5;  // -0.5 → 0.5

    const MAX_TILT = 14; // degrees
    const rotateY =  x * MAX_TILT;   // cursor right → tilt right
    const rotateX = -y * MAX_TILT;   // cursor down  → tilt down (invert)

    // Glare position
    const glareX = (x + 0.5) * 100;  // 0% – 100%
    const glareY = (y + 0.5) * 100;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;
    card.style.setProperty("--glare-x", glareX + "%");
    card.style.setProperty("--glare-y", glareY + "%");
    card.style.setProperty("--glare-opacity", "0.18");
  };

  const handleMouseLeave = () => {
    const card = ref.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    card.style.setProperty("--glare-opacity", "0");
  };

  return { ref, handleMouseMove, handleMouseLeave };
}

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
  "C#": "#239120", "ASP.NET": "#512BD4", "Next.js": "#000000",
  "Express.js": "#000000", "Canva": "#00C4CC",
};

// Vary description length to create natural height variation
const DESC_LENGTHS = [140, 80, 200, 100, 160, 90];

function ProjectCard({ proyek, descLen }) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt();
  const desc = proyek.fullDescription
    ? proyek.fullDescription.substring(0, descLen) + "..."
    : proyek.subtitle;

  return (
    <div
      className="project-card"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glare layer */}
      <div className="project-card__glare" />

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
        {/* Overlay on hover */}
        <div className="project-card__img-overlay">
          <a
            href={proyek.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card__overlay-link"
          >
            View Project →
          </a>
        </div>
      </div>

      <div className="project-card__body">
        <div className="project-card__categories">
          {proyek.categories && proyek.categories.map((cat, idx) => (
            <span key={idx} className="project-card__cat-pill">{cat}</span>
          ))}
        </div>

        <h3 className="project-card__title">{proyek.title}</h3>
        <p className="project-card__desc">{desc}</p>

        <div className="project-card__tech">
          {proyek.tech && proyek.tech.map((t, idx) => (
            <span
              key={idx}
              className="project-card__tech-pill"
              style={{ "--dot-color": TECH_COLORS[t] || "#9ca3af" }}
            >
              <span className="tech-dot" />{t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = listProyek.filter((p) =>
    activeFilter === "All" || (p.categories && p.categories.includes(activeFilter))
  );

  // Split into two columns (Pinterest style)
  const leftCol = filteredProjects.filter((_, i) => i % 2 === 0);
  const rightCol = filteredProjects.filter((_, i) => i % 2 === 1);

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
          Etalase proyek pribadi maupun sumber terbuka yang telah saya bangun.
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

      {/* Pinterest 2-column layout */}
      <div className="projects-pinterest">
        <div className="projects-col">
          {leftCol.map((proyek, i) => (
            <ProjectCard
              key={proyek.id}
              proyek={proyek}
              descLen={DESC_LENGTHS[(i * 2) % DESC_LENGTHS.length]}
            />
          ))}
        </div>
        <div className="projects-col">
          {rightCol.map((proyek, i) => (
            <ProjectCard
              key={proyek.id}
              proyek={proyek}
              descLen={DESC_LENGTHS[(i * 2 + 1) % DESC_LENGTHS.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
