import "./AchievementsSection.css";
import { listCertifications } from "../../data";

export default function AchievementsSection() {
  return (
    <section id="achievements" className="achievements-section">
      <div className="achievements-section__header">
        <h1 className="achievements-section__title">Pencapaian</h1>
        <p className="achievements-section__subtitle">Sertifikasi dan penghargaan yang saya raih.</p>
      </div>

      <div className="achievements-section__divider" />

      <div className="cert-list">
        {listCertifications.map((cert) => (
          <div key={cert.id} className="cert-card">
            <div className="cert-card__logo-wrapper">
              <img
                src={cert.logo}
                alt={cert.issuer}
                className="cert-card__logo"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
            <div className="cert-card__body">
              <h3 className="cert-card__title">{cert.title}</h3>
              <p className="cert-card__issuer">{cert.issuer}</p>
              <p className="cert-card__date">{cert.date}</p>
              <div className="cert-card__skills">
                {cert.skills.map((s, i) => (
                  <span key={i} className="cert-skill-tag">{s}</span>
                ))}
              </div>
              {cert.credentialLink && cert.credentialLink !== "#" && (
                <a
                  href={cert.credentialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-card__link"
                >
                  Lihat Sertifikat →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
