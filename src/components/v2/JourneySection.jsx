import { useState } from "react";
import { LuCalendar, LuMapPin, LuLayoutGrid } from "react-icons/lu";
import "./JourneySection.css";

const CATEGORIES = ["All", "Organisasi", "Industri", "Komunitas", "Kepanitiaan"];

const journeyItems = [
  {
    id: 1,
    cat: "Organisasi",
    date: "Des 2024 – Des 2025",
    location: "UIN Sultan Syarif Kasim Riau, Pekanbaru",
    title: "Wakil Ketua – HIMATIF UIN Suska Riau",
    desc: "Mengatur pelaksanaan lebih dari 10 program berskala besar, serta memimpin dan mengoordinasikan komite lintas fungsi di 8 divisi internal organisasi mahasiswa.",
    image: "/assets/pengalaman/organisasi1.jpg",
    color: "#8b5cf6",
  },
  {
    id: 2,
    cat: "Industri",
    date: "Feb 2025 – Mar 2025",
    location: "PT. Kilang Pertamina Internasional RU II, Dumai",
    title: "Magang Software Engineer – PT. Kilang Pertamina Internasional",
    desc: "Merancang dan membangun aplikasi enterprise SIMIT menggunakan C# dan ASP.NET Core Clean Architecture. Mengelola penuh siklus SDLC dalam lingkungan industri migas nasional.",
    image: "/assets/pengalaman/pertamina1.jpg",
    color: "#e6212a",
  },
  {
    id: 3,
    cat: "Komunitas",
    date: "Mei 2024 – Des 2024",
    location: "Pekanbaru, Riau",
    title: "Event & Program Coordinator – Riau DevOps Community",
    desc: "Mengelola inisiatif pendidikan dan komunitas terkait pengembangan sistem perangkat lunak, infrastruktur cloud, dan keunggulan operasional di komunitas developer Riau.",
    image: "/assets/pengalaman/riaudevops1.jpg",
    color: "#06b6d4",
  },
  {
    id: 4,
    cat: "Kepanitiaan",
    date: "Jul 2024 – Sep 2024",
    location: "UIN Sultan Syarif Kasim Riau, Pekanbaru",
    title: "Project Chairman – 25th Informatics Engineering Anniversary",
    desc: "Memimpin pelaksanaan acara tahunan terbesar jurusan Teknik Informatika, menyatukan ratusan mahasiswa, dosen, dan jaringan alumni dalam rangka HUT ke-25.",
    image: "/assets/pengalaman/organisasi2.jpg",
    color: "#f59e0b",
  },
  {
    id: 5,
    cat: "Organisasi",
    date: "Des 2023 – Des 2024",
    location: "UIN Sultan Syarif Kasim Riau, Pekanbaru",
    title: "Design Lead – HIMATIF UIN Suska Riau",
    desc: "Memimpin arah kreatif dan identitas visual untuk acara-acara besar organisasi, menghasilkan materi publikasi digital yang menarik lebih dari 2.000 peserta.",
    image: "/assets/pengalaman/organisasi3.jpg",
    color: "#ec4899",
  },
  {
    id: 6,
    cat: "Komunitas",
    date: "Feb 2024 – Des 2024",
    location: "Pekanbaru, Riau",
    title: "Anggota Aktif – Riau DevOps Community",
    desc: "Berpartisipasi aktif dalam workshop, seminar, dan hackathon komunitas developer dan DevOps di Pekanbaru sebagai bagian dari pengembangan diri di bidang teknologi.",
    image: "/assets/pengalaman/riaudevops2.jpg",
    color: "#06b6d4",
  },
];

const CAT_COLORS = {
  Organisasi: { bg: "#ede9fe", text: "#6d28d9" },
  Industri:   { bg: "#fee2e2", text: "#b91c1c" },
  Komunitas:  { bg: "#cffafe", text: "#0e7490" },
  Kepanitiaan:{ bg: "#fef3c7", text: "#92400e" },
};

export default function JourneySection() {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? journeyItems
    : journeyItems.filter(j => j.cat === active);

  const counts = {};
  CATEGORIES.forEach(c => {
    counts[c] = c === "All" ? journeyItems.length : journeyItems.filter(j => j.cat === c).length;
  });

  return (
    <section id="journey" className="journey-section">
      <div className="journey-section__header">
        <h1 className="journey-section__title">Perjalanan</h1>
        <p className="journey-section__subtitle">
          Milestones, kepanitiaan, komunitas, dan industri yang membentuk karir saya.
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
            {cat}
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

              {/* Card */}
              <div className="journey-card__body">
                {/* Image */}
                <div className="journey-card__img-wrapper">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="journey-card__img"
                    onError={e => { e.target.style.display = "none"; }}
                  />
                  <div className="journey-card__img-overlay" />
                </div>

                {/* Content */}
                <div className="journey-card__content">
                  {/* Category badge */}
                  <span
                    className="journey-card__cat"
                    style={{ background: catStyle.bg, color: catStyle.text }}
                  >
                    {item.cat}
                  </span>

                  {/* Meta: date + location */}
                  <div className="journey-card__meta">
                    <span className="journey-card__meta-item">
                      <LuCalendar size={12} /> {item.date}
                    </span>
                    <span className="journey-card__meta-sep">•</span>
                    <span className="journey-card__meta-item">
                      <LuMapPin size={12} /> {item.location}
                    </span>
                  </div>

                  <h3 className="journey-card__title">{item.title}</h3>
                  <p className="journey-card__desc">{item.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
