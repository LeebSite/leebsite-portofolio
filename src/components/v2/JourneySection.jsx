import "./JourneySection.css";

const journeyItems = [
  {
    year: "2022",
    title: "Mulai Kuliah Informatika",
    desc: "Memulai perjalanan akademik di UIN Sultan Syarif Kasim Riau, jurusan Teknik Informatika.",
    icon: "🎓",
    color: "#3b82f6",
  },
  {
    year: "2023",
    title: "Proyek Web Pertama",
    desc: "Membangun proyek web pertama menggunakan HTML, CSS, dan JavaScript murni.",
    icon: "💻",
    color: "#10b981",
  },
  {
    year: "2024",
    title: "Belajar React & Next.js",
    desc: "Menguasai ekosistem React, menyelesaikan berbagai sertifikasi di HackerRank dan freeCodeCamp.",
    icon: "⚛️",
    color: "#8b5cf6",
  },
  {
    year: "2024",
    title: "Magang Pertama – Kilang Pertamina",
    desc: "Mengerjakan aplikasi berbasis C# dan ASP.NET Core di lingkungan enterprise.",
    icon: "🏭",
    color: "#f59e0b",
  },
  {
    year: "2025",
    title: "Mobile Development dengan Flutter",
    desc: "Membangun aplikasi mobile lintas platform dengan Flutter & Dart untuk project berbasis klien.",
    icon: "📱",
    color: "#ec4899",
  },
  {
    year: "2026",
    title: "Full-time Software Engineer",
    desc: "Bergabung dengan PT Orixa Digital Agency sebagai Software Engineer, fokus pada React/Next.js.",
    icon: "🚀",
    color: "#06b6d4",
  },
];

export default function JourneySection() {
  return (
    <section id="journey" className="journey-section">
      <div className="journey-section__header">
        <h1 className="journey-section__title">Perjalanan</h1>
        <p className="journey-section__subtitle">Timeline perjalanan karir dan pendidikan saya.</p>
      </div>

      <div className="journey-section__divider" />

      <div className="journey-timeline">
        {journeyItems.map((item, i) => (
          <div key={i} className="journey-item">
            {/* Line */}
            <div className="journey-item__line-col">
              <div
                className="journey-item__dot"
                style={{ background: item.color, boxShadow: `0 0 0 4px ${item.color}22` }}
              >
                <span>{item.icon}</span>
              </div>
              {i < journeyItems.length - 1 && (
                <div className="journey-item__connector" />
              )}
            </div>

            <div className="journey-item__content">
              <span className="journey-item__year" style={{ color: item.color }}>
                {item.year}
              </span>
              <h3 className="journey-item__title">{item.title}</h3>
              <p className="journey-item__desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
