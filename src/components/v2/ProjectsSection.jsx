import "./ProjectsSection.css";
import { listProyek } from "../../data";

export default function ProjectsSection() {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-section__header">
        <h1 className="projects-section__title">Proyek</h1>
        <p className="projects-section__subtitle">
          Menampilkan pilihan proyek yang mencerminkan keahlian dan passion saya.
        </p>
      </div>

      <div className="projects-section__divider" />

      <div className="projects-grid">
        {listProyek.map((proyek, i) => (
          <div key={proyek.id} className="project-card">
            <div
              className="project-card__img-wrapper"
              style={{ background: proyek.gradient }}
            >
              <img
                src={proyek.image}
                alt={proyek.title}
                className="project-card__img"
                onError={(e) => { e.target.style.opacity = 0; }}
              />
              <div className="project-card__overlay" />
            </div>
            <div className="project-card__body">
              <h3 className="project-card__title">{proyek.title}</h3>
              <p className="project-card__desc">{proyek.subtitle}</p>
              <div className="project-card__footer">
                <a
                  href={proyek.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__link"
                >
                  Lihat di GitHub →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
