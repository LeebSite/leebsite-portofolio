import { useState } from "react";
import "./ProjectsSection.css";
import { listProyek } from "../../data";
import { LuLayoutGrid, LuGlobe, LuSmartphone, LuPenTool, LuLink } from "react-icons/lu";
import { FaPlay } from "react-icons/fa";

const filterCategories = [
  { id: "All", label: "All", count: 8, icon: <LuLayoutGrid size={14}/> },
  { id: "Website", label: "Website", count: 5, icon: <LuGlobe size={14}/> },
  { id: "Mobile", label: "Mobile", count: 1, icon: <LuSmartphone size={14}/> },
  { id: "UI/UX Design", label: "UI/UX Design", count: 2, icon: <LuPenTool size={14}/> },
  { id: "Associated", label: "Associated", count: 0, icon: <LuLink size={14}/> },
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = listProyek.filter((proyek) => {
    if (activeFilter === "All") return true;
    return proyek.categories && proyek.categories.includes(activeFilter);
  });

  return (
    <section id="projects" className="projects-section">
      <div className="projects-section__header">
        <h1 className="projects-section__title">Proyek</h1>
        <p className="projects-section__subtitle">
          Etalase proyek pribadi maupun sumber terbuka (open-source) yang telah saya bangun atau kontribusikan.
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
            {cat.count > 0 && <span className="projects-filter__count">{cat.count}</span>}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.map((proyek) => (
          <div key={proyek.id} className="project-card">
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
                onError={(e) => { e.target.style.opacity = 0; }}
              />
            </div>
            
            <div className="project-card__body">
              <div className="project-card__categories">
                {proyek.categories && proyek.categories.map((cat, idx) => (
                  <span key={idx} className="project-card__cat-pill">{cat}</span>
                ))}
              </div>
              
              <h3 className="project-card__title">{proyek.title}</h3>
              <p className="project-card__desc">{proyek.fullDescription ? (proyek.fullDescription.substring(0, 100) + "...") : proyek.subtitle}</p>
              
              <div className="project-card__footer">
                <div className="project-card__tech">
                  {proyek.tech && proyek.tech.map((t, idx) => (
                    <span key={idx} className="project-card__tech-pill">
                      <span className="tech-dot" style={{background: 'var(--text-secondary)'}}/> {t}
                    </span>
                  ))}
                </div>
                
                <a
                  href={proyek.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__play-btn"
                >
                  <FaPlay size={10} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
