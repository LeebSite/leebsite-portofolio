import "./AboutSection.css";

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-section__header">
        <h1 className="about-section__title">Tentang</h1>
        <p className="about-section__subtitle">Pengenalan singkat mengenai siapa saya.</p>
      </div>

      <div className="about-section__divider" />

      <div className="about-section__bio">
        <p>
          Saya <span className="about-section__highlight--blue">Muhammad Ghalib Pradipa</span>,{" "}
          Insinyur Perangkat Lunak berbasis di Karawang yang berdedikasi untuk
          membangun solusi <span className="about-section__highlight--blue">digital yang berdampak</span>. Saya
          berspesialisasi dalam pengembangan platform web dan aplikasi seluler
          menggunakan tumpukan teknologi modern, termasuk{" "}
          <span className="about-section__highlight--blue">React/Next.js, TypeScript</span>, dan
          pengembangan seluler multi-platform dengan{" "}
          <span className="about-section__highlight--blue">Flutter & React Native</span>.
        </p>
        <p className="mt-4">
          Fokus utama saya adalah menciptakan arsitektur perangkat lunak yang tidak
          hanya berfungsi, namun juga terstruktur dengan baik, dapat dipelihara,
          dan terukur untuk memenuhi kebutuhan bisnis. Saya percaya bahwa kode
          berkualitas tinggi harus berjalan seiring dengan{" "}
          <span className="about-section__highlight--amber">efisiensi sistem</span> dan{" "}
          <span className="about-section__highlight--amber">kejelasan logika</span>.
        </p>
        <p className="mt-4">
          Saya memadukan keahlian teknis dengan komunikasi proaktif, pemikiran kritis, dan manajemen waktu
          yang efektif. Saya berkembang dalam lingkungan kolaboratif dan memanfaatkan keterampilan
          kepemimpinan untuk memastikan setiap proyek memberikan{" "}
          <span className="about-section__highlight--blue">hasil optimal</span> dan dampak nyata.
        </p>
      </div>

      <div className="about-section__divider" />

      {/* Education */}
      <div className="about-section__edu-block">
        <h2 className="about-section__sub-title">🎓 Pendidikan</h2>
        <p className="about-section__section-subtitle">Perjalanan pendidikan saya.</p>

        <div className="edu-card">
          <div className="edu-card__logo-wrapper">
            <img
              src="https://upload.wikimedia.org/wikipedia/id/5/5e/Logo_UIN_Suska_Riau.png"
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
              <strong>GPA: 3.70/4.00</strong>
            </p>
            <p className="edu-card__period">2022 – Present &nbsp;&nbsp; Pekanbaru, Indonesia 🌐</p>
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
          <span className="about-stat__value">2<span className="about-stat__plus">+</span></span>
          <span className="about-stat__label">Tahun Pengalaman</span>
        </div>
        <div className="about-stat">
          <span className="about-stat__value">3.70<span className="about-stat__plus">/4.00</span></span>
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
