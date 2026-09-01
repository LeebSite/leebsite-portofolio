import { LuPalette, LuCloud, LuTrophy, LuHandshake } from "react-icons/lu";
import "./JourneySection.css";

const journeyItems = [
  {
    year: "Des 2023 – Des 2024",
    title: "Design Lead",
    desc: "Memimpin arah kreatif dan identitas visual untuk acara-acara besar organisasi, menghasilkan materi publikasi digital yang menarik lebih dari 2.000 peserta.",
    icon: <LuPalette size={16} color="#fff" />,
    color: "#ec4899",
  },
  {
    year: "Mei 2024 – Des 2024",
    title: "Event & Program Coordinator - Riau DevOps Community",
    desc: "Mengelola inisiatif pendidikan dan komunitas terkait pengembangan sistem perangkat lunak, infrastruktur cloud, dan keunggulan operasional.",
    icon: <LuCloud size={16} color="#fff" />,
    color: "#06b6d4",
  },
  {
    year: "Jul 2024 – Sep 2024",
    title: "Project Chairman – 25th Informatics Engineering Anniversary",
    desc: "Memimpin pelaksanaan acara tahunan terbesar jurusan, menyatukan ratusan mahasiswa, dosen, dan jaringan alumni.",
    icon: <LuTrophy size={16} color="#fff" />,
    color: "#f59e0b",
  },
  {
    year: "Des 2024 – Des 2025",
    title: "Wakil Ketua - HIMATIF UIN Suska Riau",
    desc: "Mengatur pelaksanaan lebih dari 10 program berskala besar, serta memimpin dan mengoordinasikan komite lintas fungsi di 8 divisi internal.",
    icon: <LuHandshake size={16} color="#fff" />,
    color: "#8b5cf6",
  }
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
