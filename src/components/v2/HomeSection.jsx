import { useState } from "react";
import "./HomeSection.css";

const ALL_SKILLS = [
  { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", cats: ["Backend", "Main"] },
  { name: "ASP.NET Core", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg", cats: ["Backend", "Main"] },
  { name: ".NET", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original-wordmark.svg", cats: ["Backend", "Main"] },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", cats: ["Backend", "Main"] },
  { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", cats: ["Backend", "Main"] },
  { name: "CodeIgniter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeigniter/codeigniter-plain.svg", cats: ["Backend", "Main"] },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", cats: ["Backend"] },
  
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", cats: ["Frontend", "Main"] },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", cats: ["Frontend", "Main"] },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", cats: ["Frontend", "Backend", "Main"] },
  { name: "Vite", icon: "https://vitejs.dev/logo.svg", cats: ["Frontend", "Main"] },
  { name: "TailwindCSS", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg", cats: ["Frontend", "Main"] },
  { name: "Shadcn UI", icon: "https://ui.shadcn.com/favicon.ico", cats: ["Frontend", "Main"] },
  { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", cats: ["Frontend"] },
  { name: "Framer Motion", icon: "https://www.framer.com/images/favicons/favicon.png", cats: ["Frontend"] },
  
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", cats: ["Data", "Backend", "Main"] },
  { name: "Power BI", icon: "https://cdn.worldvectorlogo.com/logos/powerbi.svg", cats: ["Data", "Main"] },
  { name: "Excel", icon: "https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg", cats: ["Data", "Main"] },
  { name: "Google Colab", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Colaboratory_SVG_Logo.svg", cats: ["Data", "Main"] },
  { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", cats: ["Data"] },
  { name: "Tableau", icon: "https://cdn.worldvectorlogo.com/logos/tableau-software.svg", cats: ["Data"] },
  
  { name: "SQL Server", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg", cats: ["Database", "Main"] },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", cats: ["Database", "Main"] },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", cats: ["Database", "Main"] },
  { name: "Oracle Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg", cats: ["Database"] },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", cats: ["Database", "Tools"] },
  { name: "Supabase", icon: "https://avatars.githubusercontent.com/u/54469796?s=200&v=4", cats: ["Database", "Tools"] },
  
  { name: "Git/GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", cats: ["Tools", "Main"] },
  { name: "Google Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", cats: ["Tools", "Main"] },
  { name: "Midtrans", icon: "https://seeklogo.com/images/M/midtrans-logo-491953ADF3-seeklogo.com.png", cats: ["Tools", "Main"] },
  { name: "Vercel", icon: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png", cats: ["Tools"] },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", cats: ["Tools"] },
  { name: "Laragon", icon: "https://laragon.org/logo.png", cats: ["Tools"] },
  { name: "Antigravity", icon: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f680/512.webp", cats: ["Tools"] },
  { name: "npm", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg", cats: ["Tools"] },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", cats: ["Tools"] },
  { name: "Canva", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg", cats: ["Tools"] }
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
            <div key={i} className="skill-badge">
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