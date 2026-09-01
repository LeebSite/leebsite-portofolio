import { useState } from "react";
import "./ExperienceSection.css";

const experiences = [
  {
    id: 1,
    role: "Software Engineer",
    company: "PT Orixa Digital Agency",
    companyLogo: "https://media.licdn.com/dms/image/v2/D560BAQFsLV-BSVGDqg/company-logo_200_200/company-logo_200_200/0/1704257040839/orixa_digital_logo?e=2147483647&v=beta&t=f2p3RuU0UWE7NnHGWXHJdmkUOL5rPGJJLMDhGmETEKM",
    location: "Gresik, Indonesia 🌐",
    period: "Jan 2026 – Present",
    duration: "8 bulan",
    type: "Part-Time",
    mode: "Remote",
    description: [
      "Mengembangkan dan memelihara aplikasi web menggunakan React.js dan Next.js",
      "Berkolaborasi dengan tim desain dalam implementasi UI/UX yang responsif",
      "Menulis kode yang bersih, terstruktur, dan mudah dipelihara",
      "Mengintegrasikan REST API dan mengelola state management dengan Redux",
    ],
    skills: ["React.js", "Next.js", "TypeScript", "REST API", "Redux"],
    logoColor: "#e91e63",
  },
  {
    id: 2,
    role: "Fullstack Web Developer",
    company: "PT JTEKT Indonesia",
    companyLogo: "https://media.licdn.com/dms/image/v2/C4D0BAQHUknLJfWvUaA/company-logo_200_200/company-logo_200_200/0/1631370588427?e=2147483647&v=beta&t=jtekt-logo",
    location: "Karawang, Indonesia 🌐",
    period: "Jan 2026 – Apr 2026",
    duration: "3 bulan",
    type: "Internship",
    mode: "Onsite",
    description: [
      "Membangun aplikasi fullstack dengan Laravel dan Vue.js untuk kebutuhan internal perusahaan",
      "Mengoptimalkan query database MySQL untuk performa lebih baik",
      "Berpartisipasi aktif dalam code review dan standar koding perusahaan",
      "Mendokumentasikan API dan fitur aplikasi secara terstruktur",
    ],
    skills: ["Laravel", "Vue.js", "MySQL", "PHP", "REST API"],
    logoColor: "#1565c0",
  },
  {
    id: 3,
    role: "Mobile Developer – Project Based",
    company: "Yayasan Triputra Persada Horizon Education",
    companyLogo: "https://media.licdn.com/dms/image/v2/C4D0BAQExxxx/company-logo_200_200/0/1631370588427?e=2147483647",
    location: "Karawang, Indonesia 🌐",
    period: "Dec 2025 – Jan 2026",
    duration: "1 bulan",
    type: "Part-time",
    mode: "Hybrid",
    description: [
      "Mengembangkan aplikasi mobile menggunakan Flutter dan Dart",
      "Mengintegrasikan Firebase untuk autentikasi dan penyimpanan data real-time",
      "Berkolaborasi dengan tim kecil dalam sprint pengembangan agile",
    ],
    skills: ["Flutter", "Dart", "Firebase", "Agile"],
    logoColor: "#ff6f00",
  },
];

export default function ExperienceSection() {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="experience" className="experience-section">
      <div className="experience-section__header">
        <h1 className="experience-section__title">Experience</h1>
        <p className="experience-section__subtitle">Perjalanan profesional saya.</p>
      </div>

      <div className="experience-section__divider" />

      <div className="exp-block">
        <h2 className="exp-block__title">💼 Work Experience</h2>
        <p className="exp-block__subtitle">My professional career journey.</p>

        <div className="exp-list">
          {experiences.map((exp) => (
            <div key={exp.id} className="exp-card">
              <div className="exp-card__logo-wrapper" style={{ "--logo-color": exp.logoColor }}>
                <img
                  src={exp.companyLogo}
                  alt={exp.company}
                  className="exp-card__logo"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
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
                  {expanded[exp.id] ? "▾ Sembunyikan detail" : "▸ Tampilkan detail"}
                </button>

                {expanded[exp.id] && (
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
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
