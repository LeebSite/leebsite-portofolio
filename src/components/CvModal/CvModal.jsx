import React from "react";
import { FiX, FiDownload, FiExternalLink, FiFileText, FiEye, FiCheckCircle } from "react-icons/fi";
import { useCvModal } from "../../context/CvModalContext";
import { useLanguage } from "../../context/LanguageContext";
import "./CvModal.css";

export default function CvModal() {
  const { isCvModalOpen, closeCvModal } = useCvModal();
  const { t } = useLanguage();

  if (!isCvModalOpen) return null;

  const cvPdfUrl = "/assets/CV.pdf";

  return (
    <div className="cv-modal-overlay" onClick={closeCvModal} role="dialog" aria-modal="true">
      <div className="cv-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cv-modal-header">
          <div className="cv-modal-header__info">
            <div className="cv-modal-header__icon-box">
              <FiFileText size={20} />
            </div>
            <div>
              <div className="cv-modal-header__title-row">
                <h3 className="cv-modal-header__title">CV - Muhammad Ghalib Pradipa</h3>
                <span className="cv-modal-header__badge">
                  <FiCheckCircle size={12} /> Verified
                </span>
              </div>
              <p className="cv-modal-header__subtitle">
                {t("cvModal.fileInfo") || "Curriculum Vitae • Software & Data Engineer"}
              </p>
            </div>
          </div>

          <div className="cv-modal-header__actions">
            {/* Open in New Tab */}
            <a
              href={cvPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cv-modal-btn cv-modal-btn--secondary"
              title={t("cvModal.openInNewTab") || "Buka di Tab Baru"}
            >
              <FiExternalLink size={15} />
              <span className="btn-text">{t("cvModal.openInNewTab") || "Tab Baru"}</span>
            </a>

            {/* Direct Download */}
            <a
              href={cvPdfUrl}
              download="CV Muhammad Ghalib Pradipa.pdf"
              className="cv-modal-btn cv-modal-btn--primary"
              title={t("nav.downloadCv") || "Unduh CV"}
            >
              <FiDownload size={15} />
              <span className="btn-text">{t("nav.downloadCv") || "Unduh CV"}</span>
            </a>

            {/* Close Button */}
            <button
              onClick={closeCvModal}
              className="cv-modal-btn cv-modal-btn--close"
              aria-label="Tutup modal"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Body / PDF Viewer */}
        <div className="cv-modal-body">
          <iframe
            src={`${cvPdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            className="cv-modal-iframe"
            title="Curriculum Vitae - Muhammad Ghalib Pradipa"
          />

          {/* Mobile Fallback Overlay if browser does not render iframe PDF */}
          <div className="cv-modal-fallback">
            <div className="cv-modal-fallback__card">
              <FiFileText size={36} className="cv-modal-fallback__icon" />
              <h4>{t("cvModal.previewHeading") || "Pratinjau Dokumen PDF"}</h4>
              <p>
                {t("cvModal.fallbackDesc") || "Jika pratinjau tidak termuat di browser Anda, gunakan tombol di bawah:"}
              </p>
              <div className="cv-modal-fallback__actions">
                <a
                  href={cvPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cv-modal-btn cv-modal-btn--secondary"
                >
                  <FiExternalLink size={15} /> {t("cvModal.openInNewTab") || "Buka di Tab Baru"}
                </a>
                <a
                  href={cvPdfUrl}
                  download="CV Muhammad Ghalib Pradipa.pdf"
                  className="cv-modal-btn cv-modal-btn--primary"
                >
                  <FiDownload size={15} /> {t("nav.downloadCv") || "Unduh CV Langsung"}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="cv-modal-footer">
          <div className="cv-modal-footer__meta">
            <span className="meta-item">📄 PDF Document</span>
            <span className="meta-dot">•</span>
            <span className="meta-item">⚡ High Resolution</span>
            <span className="meta-dot">•</span>
            <span className="meta-item">💼 Software & Data Engineer</span>
          </div>
          <div className="cv-modal-footer__actions">
            <button onClick={closeCvModal} className="cv-modal-btn cv-modal-btn--secondary">
              {t("cvModal.close") || "Tutup"}
            </button>
            <a
              href={cvPdfUrl}
              download="CV Muhammad Ghalib Pradipa.pdf"
              className="cv-modal-btn cv-modal-btn--primary"
            >
              <FiDownload size={15} /> {t("nav.downloadCv") || "Unduh CV"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
