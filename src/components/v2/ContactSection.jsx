import { useState, useEffect, useRef } from "react";
import { LuMail, LuMapPin, LuLinkedin, LuGithub, LuFileText, LuSend, LuInstagram, LuMessageSquare, LuLogOut, LuTrash2 } from "react-icons/lu";
import { auth, loginWithGoogle, logout, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, getDocs, deleteDoc
} from "firebase/firestore";
import "./ContactSection.css";

const OWNER_EMAIL = "mhd.ghalibpradipa@gmail.com";

function PublicChatRoom() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setIsOwner(u?.email === OWNER_EMAIL);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    });
    return () => unsub();
  }, [user]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await addDoc(collection(db, "messages"), {
      text: message, uid: user.uid, email: user.email,
      displayName: user.displayName, photoURL: user.photoURL, createdAt: serverTimestamp(),
    });
    setMessage("");
  };

  const clearAllMessages = async () => {
    if (!isOwner || !window.confirm("Hapus semua pesan?")) return;
    setDeleting(true);
    try {
      const snapshot = await getDocs(query(collection(db, "messages")));
      await Promise.all(snapshot.docs.map((d) => deleteDoc(d.ref)));
    } finally { setDeleting(false); }
  };

  if (!user) {
    return (
      <div className="chat-login">
        <LuMessageSquare className="chat-login__icon" size={32} />
        <p className="chat-login__title">Ruang Chat Publik</p>
        <p className="chat-login__desc">Login dengan Google untuk bergabung dan menyapa saya secara langsung!</p>
        <button onClick={loginWithGoogle} className="chat-login__btn">
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
          <button onClick={logout} className="chat-room__logout-btn"><LuLogOut size={14} /> Keluar</button>
        </div>
      </div>
      <div className="chat-room__notice">🌐 Chat Publik — semua orang dapat melihat pesan di sini</div>
      <div className="chat-room__messages">
        {messages.length === 0 ? (
          <div className="chat-room__empty"><p>Belum ada pesan. Jadilah yang pertama! 🎉</p></div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.uid === user?.uid;
            const isOwnerMsg = msg.email === OWNER_EMAIL;
            return (
              <div key={msg.id} className={chat-msg }>
                {!isMe && <img src={msg.photoURL || "https://via.placeholder.com/32"} alt="avatar" className="chat-msg__avatar" />}
                <div className={chat-msg__bubble }>
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

export default function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-section__header">
        <h1 className="contact-section__title">Kontak</h1>
        <p className="contact-section__subtitle">Hubungi saya untuk kolaborasi atau obrolan singkat.</p>
      </div>
      <div className="contact-section__divider" />
      <div className="contact-layout">
        <div className="contact-info">
          <div className="contact-info__item">
            <span className="contact-info__icon"><LuMail /></span>
            <div>
              <p className="contact-info__label">Email</p>
              <a href="mailto:mhd.ghalibpradipa@gmail.com" className="contact-info__value">mhd.ghalibpradipa@gmail.com</a>
            </div>
          </div>
          <div className="contact-info__item">
            <span className="contact-info__icon"><LuMapPin /></span>
            <div>
              <p className="contact-info__label">Lokasi</p>
              <p className="contact-info__value">Pekanbaru, Riau, Indonesia</p>
              <span className="contact-relocation-badge">Open to Relocation</span>
            </div>
          </div>
          <div className="contact-info__item">
            <span className="contact-info__icon"><LuLinkedin /></span>
            <div>
              <p className="contact-info__label">LinkedIn</p>
              <a href="https://www.linkedin.com/in/ghalibpradipaa" target="_blank" rel="noopener noreferrer" className="contact-info__value">Muhammad Ghalib Pradipa</a>
            </div>
          </div>
          <div className="contact-info__item">
            <span className="contact-info__icon"><LuGithub /></span>
            <div>
              <p className="contact-info__label">GitHub</p>
              <a href="https://github.com/LeebSite" target="_blank" rel="noopener noreferrer" className="contact-info__value">LeebSite</a>
            </div>
          </div>
          <div className="contact-info__item">
            <span className="contact-info__icon"><LuInstagram /></span>
            <div>
              <p className="contact-info__label">Instagram</p>
              <a href="https://instagram.com/gpradiipaa" target="_blank" rel="noopener noreferrer" className="contact-info__value">@gpradiipaa</a>
            </div>
          </div>
          <a href="/assets/CV.pdf" download="CV Muhammad Ghalib Pradipa.pdf" className="contact-download-btn">
            <LuFileText size={18} /> Unduh CV
          </a>
        </div>
        <form action="https://formsubmit.co/mhd.ghalibpradipa@gmail.com" method="POST" className="contact-form" autoComplete="off">
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="Pesan dari Portfolio v2" />
          <div className="contact-form__group">
            <label htmlFor="cf-name" className="contact-form__label">Nama Lengkap</label>
            <input id="cf-name" type="text" name="Name" placeholder="Masukkan nama Anda..." className="contact-form__input" required />
          </div>
          <div className="contact-form__group">
            <label htmlFor="cf-email" className="contact-form__label">Email</label>
            <input id="cf-email" type="email" name="Email" placeholder="Masukkan email Anda..." className="contact-form__input" required />
          </div>
          <div className="contact-form__group">
            <label htmlFor="cf-message" className="contact-form__label">Pesan</label>
            <textarea id="cf-message" name="message" rows="5" placeholder="Tulis pesan Anda..." className="contact-form__textarea" required />
          </div>
          <button type="submit" className="contact-form__btn">Kirim Pesan <LuSend style={{ marginLeft: '6px' }} /></button>
        </form>
      </div>
      <div className="contact-section__divider" style={{ marginTop: '32px' }} />
      <div className="contact-chat-wrapper">
        <div className="contact-chat-header">
          <h2 className="contact-chat-title"><LuMessageSquare style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />Ruang Chat Publik</h2>
          <p className="contact-chat-desc">Sapa saya atau ngobrol dengan pengunjung lain secara langsung.</p>
        </div>
        <PublicChatRoom />
      </div>
    </section>
  );
}
