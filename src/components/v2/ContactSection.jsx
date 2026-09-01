import { LuMail, LuMapPin, LuLinkedin, LuGithub, LuFileText, LuSend } from "react-icons/lu";
import "./ContactSection.css";

export default function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-section__header">
        <h1 className="contact-section__title">Kontak</h1>
        <p className="contact-section__subtitle">Hubungi saya untuk kolaborasi atau obrolan singkat.</p>
      </div>

      <div className="contact-section__divider" />

      <div className="contact-layout">
        {/* Info */}
        <div className="contact-info">
          <div className="contact-info__item">
            <span className="contact-info__icon"><LuMail color="#a1a1aa" /></span>
            <div>
              <p className="contact-info__label">Email</p>
              <a href="mailto:mhd.ghalibpradipa@gmail.com" className="contact-info__value">
                mhd.ghalibpradipa@gmail.com
              </a>
            </div>
          </div>
          <div className="contact-info__item">
            <span className="contact-info__icon"><LuMapPin color="#a1a1aa" /></span>
            <div>
              <p className="contact-info__label">Lokasi</p>
              <p className="contact-info__value">Karawang, Indonesia</p>
            </div>
          </div>
          <div className="contact-info__item">
            <span className="contact-info__icon"><LuLinkedin color="#a1a1aa" /></span>
            <div>
              <p className="contact-info__label">LinkedIn</p>
              <a
                href="https://www.linkedin.com/in/muhammad-ghalib-pradipa"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info__value"
              >
                muhammad-ghalib-pradipa
              </a>
            </div>
          </div>
          <div className="contact-info__item">
            <span className="contact-info__icon"><LuGithub color="#a1a1aa" /></span>
            <div>
              <p className="contact-info__label">GitHub</p>
              <a
                href="https://github.com/LeebSite"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info__value"
              >
                LeebSite
              </a>
            </div>
          </div>

          {/* Download CV */}
          <a
            href="/assets/CV.pdf"
            download="CV Muhammad Ghalib Pradipa.pdf"
            className="contact-download-btn"
          >
            <LuFileText size={18} /> Unduh CV
          </a>
        </div>

        {/* Form */}
        <form
          action="https://formsubmit.co/mhd.ghalibpradipa@gmail.com"
          method="POST"
          className="contact-form"
          autoComplete="off"
        >
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="Pesan dari Portfolio v2" />

          <div className="contact-form__group">
            <label htmlFor="cf-name" className="contact-form__label">Nama Lengkap</label>
            <input
              id="cf-name"
              type="text"
              name="Name"
              placeholder="Masukkan nama Anda..."
              className="contact-form__input"
              required
            />
          </div>
          <div className="contact-form__group">
            <label htmlFor="cf-email" className="contact-form__label">Email</label>
            <input
              id="cf-email"
              type="email"
              name="Email"
              placeholder="Masukkan email Anda..."
              className="contact-form__input"
              required
            />
          </div>
          <div className="contact-form__group">
            <label htmlFor="cf-message" className="contact-form__label">Pesan</label>
            <textarea
              id="cf-message"
              name="message"
              rows="5"
              placeholder="Tulis pesan Anda..."
              className="contact-form__textarea"
              required
            />
          </div>
          <button type="submit" className="contact-form__btn">
            Kirim Pesan <LuSend style={{ marginLeft: '6px' }} />
          </button>
        </form>
      </div>
    </section>
  );
}
