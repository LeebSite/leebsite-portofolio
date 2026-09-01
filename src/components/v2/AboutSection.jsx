import { LuGraduationCap, LuWrench, LuCode, LuDatabase, LuPalette, LuUsers } from "react-icons/lu";
import "./AboutSection.css";

export default function AboutSection() {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', x + 'px');
    e.currentTarget.style.setProperty('--mouse-y', y + 'px');
  };
  return (
    <section id="about" className="about-section">
      <div className="about-section__header">
        <h1 className="about-section__title">Tentang</h1>
        <p className="about-section__subtitle">Pengenalan singkat mengenai siapa saya.</p>
      </div>

      <div className="about-section__divider" />

      <div className="about-section__bio">
        <p>
          Seorang <span className="about-section__highlight--blue">Fresh Graduate Teknik Informatika</span> yang berfokus sebagai <span className="about-section__highlight--blue">Full-Stack Software dan Data Engineer</span> dengan rekam jejak yang kuat dalam membangun aplikasi web skala enterprise dan mengoptimalkan alur kerja data skala besar. Fondasi teknis saya dibangun melalui pengalaman industri langsung di berbagai instansi nasional tingkat atas, termasuk PT Kilang Pertamina Internasional, Bank Indonesia, dan Kemendikdasmen.
        </p>
        <p className="mt-4">
          Melalui peran-peran tersebut, saya mengembangkan keahlian yang komprehensif di bidang software engineering dan analisis data. Keahlian utama saya mencakup pengembangan arsitektur web yang scalable menggunakan <span className="about-section__highlight--blue">ASP.NET Core (C#) dan Laravel</span>, serta perancangan otomasi data pipeline dan pemrosesan data kompleks untuk lebih dari 20.000 baris metrik ekonomi menggunakan <span className="about-section__highlight--blue">Python dan SQL/Excel tingkat lanjut</span>.
        </p>
        <p className="mt-4">
          Nilai tambah yang membedakan saya adalah kombinasi antara eksekusi teknis dan kepemimpinan strategis. Saat menjabat sebagai Wakil Ketua HIMATIF UIN SUSKA, saya mengasah kemampuan dalam memimpin tim lintas divisi, mengorkestrasi 10+ program skala besar, dan menyelesaikan hambatan operasional. Saya memahami bahwa menulis kode yang bersih (<span className="about-section__highlight--amber">clean code</span>) sama pentingnya dengan komunikasi yang efektif dan pemahaman terhadap tujuan bisnis.
        </p>
        <div className="about-section__competencies" style={{ marginTop: '32px' }}>
          <h3 className="about-section__sub-title" style={{ marginBottom: '16px' }}>
            <LuWrench className="about-section__icon-inline" /> Kompetensi Inti & Teknologi
          </h3>
          <div className="competencies-grid">
            <div className="comp-card" onMouseMove={handleMouseMove}>
              <div className="comp-card__icon"><LuCode /></div>
              <h4 className="comp-card__title">Pengembangan Perangkat Lunak</h4>
              <p className="comp-card__desc">C#, ASP.NET Core, PHP, Laravel, JavaScript (React, Next.js, Node.js)</p>
            </div>
            <div className="comp-card" onMouseMove={handleMouseMove}>
              <div className="comp-card__icon"><LuDatabase /></div>
              <h4 className="comp-card__title">Data & AI Engineering</h4>
              <p className="comp-card__desc">Python, SQL Tingkat Lanjut, Otomasi Data Pipeline, Audit Data Skala Besar</p>
            </div>
            <div className="comp-card" onMouseMove={handleMouseMove}>
              <div className="comp-card__icon"><LuPalette /></div>
              <h4 className="comp-card__title">Desain & UI/UX</h4>
              <p className="comp-card__desc">User-Centered Design, Wireframing, Integrasi Front-end</p>
            </div>
            <div className="comp-card" onMouseMove={handleMouseMove}>
              <div className="comp-card__icon"><LuUsers /></div>
              <h4 className="comp-card__title">Soft Skills</h4>
              <p className="comp-card__desc">Kepemimpinan Teknis, Manajemen Proyek, Pemecahan Masalah Strategis</p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-section__divider" />

      {/* Education */}
      <div className="about-section__edu-block">
        <h2 className="about-section__sub-title"><LuGraduationCap className="about-section__icon-inline" /> Pendidikan</h2>
        <p className="about-section__section-subtitle">Perjalanan pendidikan saya.</p>

        <div className="edu-card">
          <div className="edu-card__logo-wrapper">
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjfvDbFXCj-rhZkD4imXKAbCGRaRAkdHIndPbLFP_vveRj6gCoNJkiHAeP50Uhq9bKKTqp3-5cGWMC7nBmMpg7h03Asj1dMlCgmysCIOBSPOj9ER6n1uQ9SUZNTmKza3OIa57YFrwadjMHDOuYwa9j5rDB7C2oPQZTiYGH0_dXvIdaCWMZKUfhxQ9IOog/s1560/Logo%20Universitas%20Islam%20Negeri%20Sultan%20Syarif%20Kasim%20Riau%20(UIN%20Suska%20Riau).png"
              alt="UIN Suska Riau"
              className="edu-card__logo"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/48x48?text=UIN";
              }}
            />
          </div>
          <div className="edu-card__info">
            <h3 className="edu-card__school">UIN Sultan Syarif Kasim Riau</h3>
            <p className="edu-card__degree">
              Bachelor's degree &nbsp;•&nbsp; Informatics, (S.Kom) &nbsp;•&nbsp;{" "}
              <strong>GPA: 3.66/4.00</strong>
            </p>
            <p className="edu-card__period">2022 – Present &nbsp;&nbsp; Pekanbaru, Indonesia</p>
          </div>
        </div>
      </div>

      <div className="about-section__divider" />

      {/* Quick Stats */}
      <div className="about-section__stats">
        <div className="about-stat">
          <span className="about-stat__value">10<span className="about-stat__plus">+</span></span>
          <span className="about-stat__label">Proyek Selesai</span>
        </div>
        <div className="about-stat">
          <span className="about-stat__value">3<span className="about-stat__plus">+</span></span>
          <span className="about-stat__label">Tahun Pengalaman</span>
        </div>
        <div className="about-stat">
          <span className="about-stat__value">3.66<span className="about-stat__plus">/4.00</span></span>
          <span className="about-stat__label">GPA</span>
        </div>
        <div className="about-stat">
          <span className="about-stat__value">10<span className="about-stat__plus">+</span></span>
          <span className="about-stat__label">Sertifikasi</span>
        </div>
      </div>
    </section>
  );
}
