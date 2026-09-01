import { useState } from "react";
import "./ExperienceSection.css";

const experiences = [
  {
    id: 1,
    role: "Magang Data Statistik Ekonomi & Keuangan",
    company: "Bank Indonesia",
    companyLogo: "https://images.seeklogo.com/logo-png/29/1/bank-indonesia-logo-png_seeklogo-298866.png",
    location: "Pekanbaru, Riau 🌐",
    period: "Apr 2026 – Mei 2026",
    duration: "2 bulan",
    type: "Internship",
    mode: "Onsite",
    description: [
      "Pemrosesan Data Analisis Inflasi: Mengekstraksi, memfilter, dan menyusun lebih dari 20.000+ baris data historis PIHPS menggunakan Microsoft Excel untuk mempercepat proses analisis inflasi regional.",
      "Audit Data Digital Harian: Melakukan audit digital harian terhadap laporan ekonomi untuk memastikan integritas, akurasi, dan kepatuhan data.",
      "Optimalisasi Arsip Digital: Melaksanakan digitalisasi dokumen operasional dan menyusun dokumentasi analisis data yang komprehensif.",
    ],
    skills: ["Data Analysis", "Microsoft Excel", "Data Processing", "Data Auditing"],
    logoColor: "#1a5b8f",
  },
  {
    id: 2,
    role: "Magang IT & Web Developer",
    company: "Kemendikdasmen (Balai Bahasa Provinsi Riau)",
    companyLogo: "https://balaibahasariau.kemendikdasmen.go.id/storage/publikasi/0a0f5e2c-e718-4e37-8806-12b82aa92f13.png",
    location: "Pekanbaru, Riau 🌐",
    period: "Feb 2026 – Mar 2026",
    duration: "2 bulan",
    type: "Internship",
    mode: "Onsite",
    description: [
      "Otomatisasi Pipeline Data: Merancang alur kerja data dari ujung ke ujung menggunakan skrip Python untuk pengumpulan, pembersihan, dan transformasi data.",
      "Pengembangan Platform Digital: Mengembangkan \"SEMBARI\", sebuah platform literasi digital unggulan yang menampung 60 e-book interaktif dan mencapai lebih dari 1.442 pembaca aktif.",
      "Full-Stack Web Development: Merancang dan meluncurkan portal web institusi resmi menggunakan Laravel untuk memusatkan layanan publik.",
      "Dukungan Teknis IT: Memberikan dukungan teknis langsung untuk operasional IT harian termasuk masalah jaringan server dan infrastruktur LAN.",
    ],
    skills: ["Laravel", "Python", "Web Development", "IT Support", "Data Pipeline"],
    logoColor: "#214285",
  },
  {
    id: 3,
    role: "Magang Software Engineer",
    company: "PT. Kilang Pertamina Internasional RU II",
    companyLogo: "https://kompaskerja.com/wp-content/uploads/2021/09/logo-pt-kilang-pertamina-internasional.jpg",
    location: "Dumai, Riau 🌐",
    period: "Feb 2025 – Mar 2025",
    duration: "2 bulan",
    type: "Internship",
    mode: "Onsite",
    description: [
      "Pengembangan Aplikasi Enterprise: Merancang dan membangun SIMIT (Sistem Informasi Magang) dari awal menggunakan C# dan framework ASP.NET Core dengan Clean Architecture.",
      "Troubleshooting & UI/UX: Mendiagnosis dan menyelesaikan bug frontend penting pada sistem IT Helpdesk internal perusahaan untuk meningkatkan antarmuka dan pengalaman pengguna.",
      "Manajemen SDLC: Mengelola siklus penuh pengembangan perangkat lunak (SDLC) dalam lingkungan industri yang ketat, memastikan integrasi frontend-backend yang mulus.",
    ],
    skills: ["C#", "ASP.NET Core", "Clean Architecture", "UI/UX", "SDLC"],
    logoColor: "#e6212a",
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
