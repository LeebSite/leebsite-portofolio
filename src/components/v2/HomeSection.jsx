import "./HomeSection.css";

export default function HomeSection() {
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
          {[
            { label: "All", count: 40 },
            { label: "Main", count: 23 },
            { label: "Frontend", count: 10 },
            { label: "Backend", count: 13 },
            { label: "Mobile", count: 3 },
            { label: "Database", count: 6 },
            { label: "Tools", count: 19 },
          ].map((tab, i) => (
            <button key={i} className={`skills__tab ${i === 0 ? "active" : ""}`}>
              {tab.label} <span className="skills__tab-count">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Skill Badges */}
        <div className="skills__badges">
          {[
            { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", color: "#e34f26" },
            { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", color: "#1572b6" },
            { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", color: "#7952b3" },
            { name: "TailwindCSS", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg", color: "#38bdf8" },
            { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "#f7df1e" },
            { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "#3178c6" },
            { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61dafb" },
            { name: "Vite", icon: "https://vitejs.dev/logo.svg", color: "#646cff" },
            { name: "Shadcn UI", icon: "https://ui.shadcn.com/favicon.ico", color: "#18181b" },
            { name: "Framer Motion", icon: "https://www.framer.com/images/favicons/favicon.png", color: "#0055ff" },
            { name: "Prisma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg", color: "#2d3748" },
            { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "#000000" },
            { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "#339933" },
            { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", color: "#000000" },
            { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", color: "#777bb4" },
            { name: "Laravel", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/250px-Laravel.svg.png", color: "#ff2d20" },
            { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", color: "#4169e1" },
            { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", color: "#4479a1" },
            { name: "SQLite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg", color: "#003b57" },
            { name: "Oracle Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg", color: "#f80000" },
            { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", color: "#ffca28" },
            { name: "Supabase", icon: "https://avatars.githubusercontent.com/u/54469796?s=200&v=4", color: "#3ecf8e" },
            { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", color: "#2496ed" },
            { name: "Npm", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg", color: "#cb3837" },
            { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "#f05032" },
            { name: "Github", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", color: "#181717" },
            { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", color: "#02569b" },
            { name: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg", color: "#0175c2" },
            { name: "Cloudinary", icon: "https://res.cloudinary.com/demo/image/upload/cloudinary_icon.png", color: "#3448c5" },
            { name: "OpenStreetMap", icon: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Openstreetmap_logo.svg", color: "#7ebc6f" },
            { name: "Vercel", icon: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png", color: "#000000" },
          ].map((skill, i) => (
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
