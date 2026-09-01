import { useState } from "react";
import "./HomeSection.css";

const ALL_SKILLS = [
  { name: "C#", icon: "https://cdn.simpleicons.org/csharp/239120", color: "#239120", cats: ["Backend", "Main"] },
  { name: "ASP.NET Core", icon: "https://cdn.simpleicons.org/dotnet/512BD4", color: "#512BD4", cats: ["Backend", "Main"] },
  { name: ".NET", icon: "https://cdn.simpleicons.org/dotnet/512BD4", color: "#512BD4", cats: ["Backend", "Main"] },
  { name: "PHP", icon: "https://cdn.simpleicons.org/php/777BB4", color: "#777BB4", cats: ["Backend", "Main"] },
  { name: "Laravel", icon: "https://cdn.simpleicons.org/laravel/FF2D20", color: "#FF2D20", cats: ["Backend", "Main"] },
  { name: "CodeIgniter", icon: "https://cdn.simpleicons.org/codeigniter/EE4323", color: "#EE4323", cats: ["Backend", "Main"] },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933", color: "#339933", cats: ["Backend"] },
  
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6", color: "#3178C6", cats: ["Frontend", "Main"] },
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB", color: "#61DAFB", cats: ["Frontend", "Main"] },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/000000", color: "#000000", cats: ["Frontend", "Backend", "Main"] },
  { name: "Vite", icon: "https://cdn.simpleicons.org/vite/646CFF", color: "#646CFF", cats: ["Frontend", "Main"] },
  { name: "TailwindCSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4", color: "#06B6D4", cats: ["Frontend", "Main"] },
  { name: "Shadcn UI", icon: "https://cdn.simpleicons.org/shadcnui/000000", color: "#000000", cats: ["Frontend", "Main"] },
  { name: "Bootstrap", icon: "https://cdn.simpleicons.org/bootstrap/7952B3", color: "#7952B3", cats: ["Frontend"] },
  { name: "Framer Motion", icon: "https://cdn.simpleicons.org/framer/0055FF", color: "#0055FF", cats: ["Frontend"] },
  
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB", color: "#3776AB", cats: ["Data", "Backend", "Main"] },
  { name: "Power BI", icon: "https://cdn.simpleicons.org/powerbi/F2C811", color: "#F2C811", cats: ["Data", "Main"] },
  { name: "Excel", icon: "https://cdn.simpleicons.org/microsoftexcel/217346", color: "#217346", cats: ["Data", "Main"] },
  { name: "Google Colab", icon: "https://cdn.simpleicons.org/googlecolab/F9AB00", color: "#F9AB00", cats: ["Data", "Main"] },
  { name: "TensorFlow", icon: "https://cdn.simpleicons.org/tensorflow/FF6F00", color: "#FF6F00", cats: ["Data"] },
  { name: "Tableau", icon: "https://cdn.simpleicons.org/tableau/E97627", color: "#E97627", cats: ["Data"] },
  
  { name: "SQL Server", icon: "https://cdn.simpleicons.org/microsoftsqlserver/CC292B", color: "#CC292B", cats: ["Database", "Main"] },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1", color: "#4479A1", cats: ["Database", "Main"] },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1", color: "#4169E1", cats: ["Database", "Main"] },
  { name: "Oracle Database", icon: "https://cdn.simpleicons.org/oracle/F80000", color: "#F80000", cats: ["Database"] },
  { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/FFCA28", color: "#FFCA28", cats: ["Database", "Tools"] },
  { name: "Supabase", icon: "https://cdn.simpleicons.org/supabase/3ECF8E", color: "#3ECF8E", cats: ["Database", "Tools"] },
  
  { name: "Git/GitHub", icon: "https://cdn.simpleicons.org/github/181717", color: "#181717", cats: ["Tools", "Main"] },
  { name: "Google Cloud", icon: "https://cdn.simpleicons.org/googlecloud/4285F4", color: "#4285F4", cats: ["Tools", "Main"] },
  { name: "Midtrans", icon: "https://cdn.simpleicons.org/midtrans/000000", color: "#000000", cats: ["Tools", "Main"] },
  { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/000000", color: "#000000", cats: ["Tools"] },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED", color: "#2496ED", cats: ["Tools"] },
  { name: "Laragon", icon: "https://cdn.simpleicons.org/laragon/000000", color: "#008DD1", cats: ["Tools"] },
  { name: "Antigravity", icon: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f680/512.webp", color: "#3b82f6", cats: ["Tools"] },
  { name: "npm", icon: "https://cdn.simpleicons.org/npm/CB3837", color: "#CB3837", cats: ["Tools"] },
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E", color: "#F24E1E", cats: ["Tools"] },
  { name: "Canva", icon: "https://cdn.simpleicons.org/canva/00C4CC", color: "#00C4CC", cats: ["Tools"] }
];

const TABS = ["All", "Main", "Frontend", "Backend", "Data", "Database", "Tools"];

export default function HomeSection() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredSkills = ALL_SKILLS.filter(skill => 
    activeTab === "All" || skill.cats.includes(activeTab)
  );

  return (
    <section id="home" className="home-section">
      <div className="home-section__header">
        <h1 className="home-section__title">Halo, saya Muhammad Ghalib Pradipa</h1>
        <div className="home-section__meta">
          <span className="home-section__meta-item">
            <span className="home-section__meta-dot" />
            Berdomisili di Riau, Indonesia
          </span>
          <span className="home-section__meta-divider">•</span>
          <span className="home-section__meta-item">Onsite</span>
        </div>
      </div>

      <div className="home-section__divider" />

      <div className="home-section__bio">
        <p>
          Seorang <strong>Fresh Graduate Teknik Informatika</strong> yang berfokus sebagai <strong>Full-Stack Software dan Data Engineer</strong> dengan rekam jejak yang kuat dalam membangun aplikasi web skala enterprise dan mengoptimalkan alur kerja data skala besar. Fondasi teknis saya dibangun melalui pengalaman industri langsung di berbagai instansi nasional tingkat atas, termasuk <strong>PT Kilang Pertamina Internasional</strong>, <strong>Bank Indonesia</strong>, dan <strong>Kemendikdasmen</strong>.
        </p>
        <p className="mt-4">
          Nilai tambah yang membedakan saya adalah kombinasi antara eksekusi teknis dan kepemimpinan strategis. Saya memahami bahwa menulis kode yang bersih (<span className="home-section__highlight">clean code</span>) sama pentingnya dengan komunikasi yang efektif dan pemahaman terhadap tujuan bisnis.
        </p>
      </div>

      <div className="home-section__divider" />

      {/* Skills */}
      <div className="home-section__skills-block">
        <h2 className="home-section__section-title">
          &lt;/&gt; Keahlian
        </h2>
        <p className="home-section__section-subtitle">Keahlian profesional saya.</p>

        {/* Filter Tabs */}
        <div className="skills__filter-tabs">
          {TABS.map((tab) => {
            const count = tab === "All" ? ALL_SKILLS.length : ALL_SKILLS.filter(s => s.cats.includes(tab)).length;
            return (
              <button 
                key={tab} 
                className={`skills__tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab} <span className="skills__tab-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Skill Badges */}
        <div className="skills__badges">
          {filteredSkills.map((skill, i) => (
            <div 
              key={i} 
              className="skill-badge"
              style={{ "--badge-color": skill.color }}
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="skill-badge__icon"
                onError={(e) => { e.target.style.display = "none"; }}
              />
              <span className="skill-badge__name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}