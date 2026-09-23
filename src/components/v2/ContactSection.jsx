import React, { useState, useEffect, useRef } from "react";
import "./ContactSection.css";
import {
  LuMail,
  LuMapPin,
  LuLinkedin,
  LuGithub,
  LuInstagram,
  LuSend,
  LuMessageSquare,
  LuLogOut,
  LuTrash2,
  LuFileText,
  LuEye,
  LuCheck,
  LuCopy,
  LuSparkles
} from "react-icons/lu";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { auth, db, loginWithGoogle, logout } from "../../data/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";
import { useLanguage } from "../../context/LanguageContext";
import { useCvModal } from "../../context/CvModalContext";

const OWNER_EMAIL = "mhd.ghalibpradipa@gmail.com";

function PublicChatRoom() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [deleting, setDeleting] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "chats"), orderBy("timestamp", "asc"));
    const unsubChat = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setMessages(msgs);
    });
    return () => unsubChat();
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !user) return;
    try {
      await addDoc(collection(db, "chats"), {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        text: message.trim(),
        timestamp: serverTimestamp()
      });
      setMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  const clearAllMessages = async () => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus semua pesan chat?")) return;
    setDeleting(true);
    try {
      const snap = await getDocs(collection(db, "chats"));
      const deletes = snap.docs.map((d) => deleteDoc(doc(db, "chats", d.id)));
      await Promise.all(deletes);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const isOwner = user?.email === OWNER_EMAIL;

  if (!user) {
    return (
      <div className="chat-login">
        <LuMessageSquare className="chat-login__icon" size={32} />
        <p className="chat-login__title">Ruang Chat Publik</p>
        <p className="chat-login__desc">Login dengan Google untuk bergabung dan menyapa saya secara langsung!</p>
        <button onClick={handleLogin} className="chat-login__btn">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" height="18" />
          Login dengan Google
        </button>
      </div>
    );
  }

  return (
    <div className="chat-room">
      <div className="chat-room__header">
        <div className="chat-room__user">
          <img src={user.photoURL} alt="avatar" className="chat-room__avatar" />
          <div>
            <span className="chat-room__username">{user.displayName}</span>
            {isOwner && <span className="chat-room__owner-badge">Pemilik</span>}
          </div>
        </div>
        <div className="chat-room__controls">
          {isOwner && messages.length > 0 && (
            <button onClick={clearAllMessages} disabled={deleting} className="chat-room__delete-btn" title="Hapus semua pesan">
              <LuTrash2 size={14} />
            </button>
          )}
          <button onClick={handleLogout} className="chat-room__logout-btn"><LuLogOut size={14} /> Keluar</button>
        </div>
      </div>
      <div className="chat-room__notice">💬 Chat Publik - semua orang dapat melihat pesan di sini</div>
      <div className="chat-room__messages">
        {messages.length === 0 ? (
          <div className="chat-room__empty"><p>Belum ada pesan. Jadilah yang pertama! 👋</p></div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.uid === user?.uid;
            const isOwnerMsg = msg.email === OWNER_EMAIL;
            const wrapClass = "chat-msg " + (isMe ? "chat-msg--me" : "chat-msg--other");
            const bubbleClass = "chat-msg__bubble " + (isOwnerMsg ? "chat-msg__bubble--owner" : isMe ? "chat-msg__bubble--me" : "");
            return (
              <div key={msg.id} className={wrapClass}>
                {!isMe && <img src={msg.photoURL || "https://via.placeholder.com/32"} alt="avatar" className="chat-msg__avatar" />}
                <div className={bubbleClass}>
                  <span className="chat-msg__name">{msg.displayName}{isOwnerMsg && " 👑"}</span>
                  <p className="chat-msg__text">{msg.text}</p>
                </div>
                {isMe && <img src={msg.photoURL || "https://via.placeholder.com/32"} alt="avatar" className="chat-msg__avatar" />}
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={sendMessage} className="chat-room__form">
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tulis pesan..." className="chat-room__input" autoComplete="off" />
        <button type="submit" disabled={!message.trim()} className="chat-room__send-btn"><LuSend size={16} /></button>
      </form>
    </div>
  );
}

// Quick Subject Options for Recruiters & Clients
const SUBJECT_OPTIONS = [
  { id: "hiring", labelId: "💼 Peluang Kerja / Hiring", labelEn: "💼 Job Opportunity / Hiring" },
  { id: "project", labelId: "🚀 Proyek Freelance / App", labelEn: "🚀 Freelance / Project" },
  { id: "collab", labelId: "🤝 Kolaborasi Teknis", labelEn: "🤝 Tech Collaboration" },
  { id: "general", labelId: "💬 Sapaan & Diskusi", labelEn: "💬 General Inquiry" },
];

export default function ContactSection() {
  const { openCvModal } = useCvModal();
  const { isEn, t } = useLanguage();

  // Direct Email Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: isEn ? "💼 Job Opportunity / Hiring" : "💼 Peluang Kerja / Hiring",
    message: ""
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Validate form fields in real-time
  const validate = (values) => {
    const errs = {};
    if (!values.name || values.name.trim().length < 2) {
      errs.name = isEn ? "Name must be at least 2 characters." : "Nama minimal 2 karakter.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email || !emailRegex.test(values.email.trim())) {
      errs.email = isEn ? "Please enter a valid email address." : "Masukkan alamat email yang valid.";
    }

    if (!values.message || values.message.trim().length < 10) {
      errs.message = isEn ? "Message must be at least 10 characters." : "Pesan minimal 10 karakter.";
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    if (touched[name]) {
      const newErrors = validate(newFormData);
      setErrors(newErrors);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(formData);
    setErrors(newErrors);
  };

  const handleSelectSubject = (subj) => {
    const newFormData = { ...formData, subject: subj };
    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setFormStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("https://formsubmit.co/ajax/mhd.ghalibpradipa@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: `[Portfolio Direct Message] ${formData.subject} - from ${formData.name}`,
          message: formData.message,
          _template: "table"
        })
      });

      if (response.ok) {
        setFormStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: isEn ? "💼 Job Opportunity / Hiring" : "💼 Peluang Kerja / Hiring",
          message: ""
        });
        setTouched({});
        setErrors({});
      } else {
        throw new Error("Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setFormStatus("error");
      setErrorMessage(
        isEn
          ? "Failed to deliver message. Please try again or send directly via email."
          : "Gagal mengirim pesan. Silakan coba lagi atau kirim langsung melalui email."
      );
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mhd.ghalibpradipa@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-section__header">
        <h1 className="contact-section__title">{t("contact.title") || "Kontak"}</h1>
        <p className="contact-section__subtitle">
          {isEn
            ? "Let's connect for job opportunities, freelance projects, or technical collaboration."
            : "Mari terhubung untuk peluang kerja, proyek freelance, atau diskusi teknis."}
        </p>
      </div>

      <div className="contact-section__divider" />

      <div className="contact-layout">
        {/* Left Side: Contact Information & Socials */}
        <div className="contact-info">
          <div className="contact-info__item">
            <span className="contact-info__icon"><LuMail /></span>
            <div className="contact-info__details">
              <p className="contact-info__label">Email Langsung</p>
              <div className="contact-email-row">
                <a href="mailto:mhd.ghalibpradipa@gmail.com" className="contact-info__value">
                  mhd.ghalibpradipa@gmail.com
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="contact-copy-btn"
                  title="Salin alamat email"
                >
                  {copiedEmail ? <LuCheck size={13} className="text-emerald-500" /> : <LuCopy size={13} />}
                  <span>{copiedEmail ? (isEn ? "Copied!" : "Tersalin!") : (isEn ? "Copy" : "Salin")}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="contact-info__item">
            <span className="contact-info__icon"><LuMapPin /></span>
            <div>
              <p className="contact-info__label">Lokasi</p>
              <p className="contact-info__value">Pekanbaru, Riau, Indonesia</p>
              <span className="contact-relocation-badge">Open to Relocation & Remote</span>
            </div>
          </div>

          <div className="contact-info__item">
            <span className="contact-info__icon"><LuLinkedin /></span>
            <div>
              <p className="contact-info__label">LinkedIn</p>
              <a href="https://www.linkedin.com/in/ghalibpradipaa" target="_blank" rel="noopener noreferrer" className="contact-info__value">
                Muhammad Ghalib Pradipa
              </a>
            </div>
          </div>

          <div className="contact-info__item">
            <span className="contact-info__icon"><LuGithub /></span>
            <div>
              <p className="contact-info__label">GitHub</p>
              <a href="https://github.com/LeebSite" target="_blank" rel="noopener noreferrer" className="contact-info__value">
                LeebSite
              </a>
            </div>
          </div>

          <div className="contact-info__item">
            <span className="contact-info__icon"><LuInstagram /></span>
            <div>
              <p className="contact-info__label">Instagram</p>
              <a href="https://instagram.com/gpradiipaa" target="_blank" rel="noopener noreferrer" className="contact-info__value">
                @gpradiipaa
              </a>
            </div>
          </div>

          {/* CV Action Buttons */}
          <div className="contact-cv-actions">
            <button
              type="button"
              onClick={openCvModal}
              className="contact-preview-btn"
            >
              <LuEye size={18} /> {t("cvModal.previewCv") || "Lihat Sekilas CV"}
            </button>
            <a
              href="/assets/CV.pdf"
              download="CV Muhammad Ghalib Pradipa.pdf"
              className="contact-download-btn"
            >
              <LuFileText size={18} /> {t("nav.downloadCv") || "Unduh CV"}
            </a>
          </div>
        </div>

        {/* Right Side: Direct Email Form with Instant Validation */}
        <div className="contact-form-wrapper">
          <div className="contact-form-header">
            <h3 className="contact-form-title">
              <LuSend className="contact-form-title-icon" />
              {isEn ? "Direct to Inbox Message" : "Kirim Pesan Langsung ke Inbox"}
            </h3>
            <p className="contact-form-desc">
              {isEn
                ? "Send a private inquiry directly to my email with instant validation."
                : "Kirim pesan privat langsung ke email saya tanpa perantara."}
            </p>
          </div>

          {formStatus === "success" ? (
            <div className="contact-success-card">
              <div className="contact-success-icon-box">
                <FiCheckCircle size={38} />
              </div>
              <h4 className="contact-success-title">
                {isEn ? "Message Sent Successfully!" : "Pesan Berhasil Terkirim!"}
              </h4>
              <p className="contact-success-desc">
                {isEn
                  ? "Thank you for reaching out. Your message has been delivered directly to my email. I will get back to you shortly!"
                  : "Terima kasih telah menghubungi. Pesan Anda telah terkirim langsung ke email saya. Saya akan segera membalasnya!"}
              </p>
              <button
                type="button"
                onClick={() => setFormStatus("idle")}
                className="contact-reset-btn"
              >
                <LuSparkles size={16} />
                {isEn ? "Send Another Message" : "Kirim Pesan Lain"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              {/* Quick Subject Chips */}
              <div className="contact-form__group">
                <label className="contact-form__label">
                  {isEn ? "Purpose / Topic" : "Keperluan / Topik Pesan"}
                </label>
                <div className="contact-subject-chips">
                  {SUBJECT_OPTIONS.map((opt) => {
                    const label = isEn ? opt.labelEn : opt.labelId;
                    const isSelected = formData.subject === label;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        className={`contact-subject-chip ${isSelected ? "active" : ""}`}
                        onClick={() => handleSelectSubject(label)}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name Input */}
              <div className="contact-form__group">
                <label htmlFor="cf-name" className="contact-form__label">
                  {isEn ? "Your Full Name" : "Nama Lengkap"} <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  id="cf-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={isEn ? "e.g. John Doe" : "Masukkan nama lengkap Anda..."}
                  className={`contact-form__input ${touched.name && errors.name ? "is-error" : ""}`}
                  disabled={formStatus === "submitting"}
                  required
                />
                {touched.name && errors.name && (
                  <span className="contact-form__error">
                    <FiAlertCircle size={13} /> {errors.name}
                  </span>
                )}
              </div>

              {/* Email Input */}
              <div className="contact-form__group">
                <label htmlFor="cf-email" className="contact-form__label">
                  {isEn ? "Your Email Address" : "Alamat Email Anda"} <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  id="cf-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={isEn ? "e.g. name@company.com" : "contoh: nama@perusahaan.com"}
                  className={`contact-form__input ${touched.email && errors.email ? "is-error" : ""}`}
                  disabled={formStatus === "submitting"}
                  required
                />
                {touched.email && errors.email && (
                  <span className="contact-form__error">
                    <FiAlertCircle size={13} /> {errors.email}
                  </span>
                )}
              </div>

              {/* Message Textarea */}
              <div className="contact-form__group">
                <div className="contact-form__label-row">
                  <label htmlFor="cf-message" className="contact-form__label">
                    {isEn ? "Message" : "Pesan"} <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <span className="contact-char-count">
                    {formData.message.length} / 10 min
                  </span>
                </div>
                <textarea
                  id="cf-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={isEn ? "Tell me about your project, opportunity, or inquiry..." : "Tuliskan detail tawaran kerja, proyek, atau pesan Anda..."}
                  className={`contact-form__textarea ${touched.message && errors.message ? "is-error" : ""}`}
                  disabled={formStatus === "submitting"}
                  required
                />
                {touched.message && errors.message && (
                  <span className="contact-form__error">
                    <FiAlertCircle size={13} /> {errors.message}
                  </span>
                )}
              </div>

              {/* Error Message Banner if submission failed */}
              {formStatus === "error" && (
                <div className="contact-error-banner">
                  <FiAlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="contact-form__btn"
              >
                {formStatus === "submitting" ? (
                  <>
                    <span className="contact-spinner" />
                    <span>{isEn ? "Delivering Message..." : "Mengirim Pesan..."}</span>
                  </>
                ) : (
                  <>
                    <span>{isEn ? "Send Direct Message" : "Kirim Pesan Langsung"}</span>
                    <LuSend size={15} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="contact-section__divider" style={{ marginTop: "36px" }} />

      {/* Public Community Chat Room */}
      <div className="contact-chat-wrapper">
        <div className="contact-chat-header">
          <h2 className="contact-chat-title">
            <LuMessageSquare style={{ display: "inline", marginRight: "8px", verticalAlign: "middle" }} />
            Ruang Chat Publik
          </h2>
          <p className="contact-chat-desc">Sapa saya atau tinggalkan jejak bersama pengunjung lain secara publik.</p>
        </div>
        <PublicChatRoom />
      </div>
    </section>
  );
}
