import { useState, useEffect } from "react";
import { auth, loginWithGoogle, logout, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
    getDocs,
    deleteDoc
} from "firebase/firestore";

const OWNER_EMAIL = "mhd.ghalibpradipa@gmail.com";

export default function ChatRoom() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isOwner, setIsOwner] = useState(false);
    const [deleting, setDeleting] = useState(false);

    // Fungsi untuk menghapus semua pesan (khusus owner)
    const clearAllMessages = async () => {
        if (!isOwner) return;

        const confirmed = window.confirm(
            "Apakah Anda yakin ingin menghapus SEMUA pesan? Tindakan ini tidak dapat dibatalkan!"
        );

        if (!confirmed) return;

        setDeleting(true);
        try {
            const q = query(collection(db, "messages"));
            const snapshot = await getDocs(q);

            const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
            await Promise.all(deletePromises);

            alert(`Berhasil menghapus ${snapshot.docs.length} pesan!`);
        } catch (error) {
            console.error("Error deleting messages:", error);
            alert("Gagal menghapus pesan. Silakan coba lagi atau gunakan Firebase Console.");
        } finally {
            setDeleting(false);
        }
    };

    // Cek login
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setIsOwner(u?.email === OWNER_EMAIL);
        });
        return () => unsub();
    }, []);

    // Ambil pesan real-time - SEMUA PESAN PUBLIC
    useEffect(() => {
        if (!user) return;

        // Semua user (termasuk owner) melihat SEMUA pesan
        const q = query(
            collection(db, "messages"),
            orderBy("createdAt")
        );

        const unsub = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsub();
    }, [user]);

    // Kirim pesan
    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        await addDoc(collection(db, "messages"), {
            text: message,
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            createdAt: serverTimestamp()
        });
        setMessage("");
    };

    return (
        <div className="bg-zinc-900 border border-gray-700 p-6 rounded-xl shadow-lg max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-4 text-white">
                💬 Ruang Chat Publik
            </h2>

            {!user ? (
                <div className="flex flex-col items-center justify-center gap-4 py-8">
                    <div className="text-center mb-4">
                        <p className="text-white text-lg mb-2">Selamat datang di Ruang Chat Publik!</p>
                        <p className="text-sm text-gray-400">
                            Login dengan Google untuk bergabung dalam percakapan
                        </p>
                    </div>
                    <button
                        onClick={loginWithGoogle}
                        className="flex items-center gap-3 bg-white text-gray-800 px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition transform hover:scale-105"
                    >
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google logo"
                            width="24"
                            height="24"
                            className="w-6 h-6"
                        />
                        <span className="font-semibold">Login dengan Google</span>
                    </button>
                </div>
            ) : (
                <>
                    {/* Header user */}
                    <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                        <div className="flex items-center gap-3">
                            <img src={user.photoURL} alt="avatar" width="40" height="40" className="w-10 h-10 rounded-full border-2 border-violet-500" />
                            <div>
                                <span className="text-white font-semibold block">{user.displayName}</span>
                                {isOwner && <span className="text-xs text-violet-400">👑 Pemilik</span>}
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="bg-red-600 px-4 py-2 rounded-full text-white hover:bg-red-700 transition text-sm font-medium"
                        >
                            Keluar
                        </button>
                    </div>

                    {/* Owner Control Panel */}
                    {isOwner && messages.length > 0 && (
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={clearAllMessages}
                                disabled={deleting}
                                className="bg-red-600/20 border border-red-500/50 px-4 py-2 rounded-lg text-red-400 hover:bg-red-600/30 hover:text-red-300 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {deleting ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Menghapus...
                                    </>
                                ) : (
                                    <>
                                        🗑️ Hapus Semua Pesan
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {/* Info box - Public Chat Notice */}
                    <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-3 mb-4">
                        <p className="text-sm text-blue-200 text-center">
                            <span className="font-semibold">🌐 Chat Publik:</span> Semua orang dapat melihat semua pesan di ruang ini
                        </p>
                    </div>

                    {/* Area pesan */}
                    <div className="h-72 overflow-y-auto border border-gray-700 p-3 rounded-lg bg-zinc-800 mb-4 space-y-3 scroll-smooth">
                        {messages.length === 0 ? (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                <div className="text-center">
                                    <p className="text-lg mb-2">🎉 Belum ada pesan!</p>
                                    <p className="text-sm">Jadilah yang pertama memulai percakapan</p>
                                </div>
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex gap-2 ${msg.uid === user?.uid ? "justify-end" : "justify-start"}`}
                                >
                                    {msg.uid !== user?.uid && (
                                        <img
                                            src={msg.photoURL || "https://via.placeholder.com/40"}
                                            alt="avatar"
                                            width="32"
                                            height="32"
                                            className="w-8 h-8 rounded-full flex-shrink-0"
                                        />
                                    )}
                                    <div
                                        className={`p-3 rounded-lg max-w-[75%] break-words ${msg.uid === user?.uid
                                            ? "bg-violet-600 text-white rounded-br-none"
                                            : msg.email === OWNER_EMAIL
                                                ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-bl-none"
                                                : "bg-gray-700 text-white rounded-bl-none"
                                            }`}
                                    >
                                        <div className="text-xs opacity-70 mb-1 font-semibold">
                                            {msg.displayName}
                                            {msg.email === OWNER_EMAIL && " 👑"}
                                        </div>
                                        <div className="text-sm">{msg.text}</div>
                                    </div>
                                    {msg.uid === user?.uid && (
                                        <img
                                            src={msg.photoURL || "https://via.placeholder.com/40"}
                                            alt="avatar"
                                            width="32"
                                            height="32"
                                            className="w-8 h-8 rounded-full flex-shrink-0"
                                        />
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    {/* Form kirim pesan */}
                    <form onSubmit={sendMessage} className="flex gap-2 flex-wrap sm:flex-nowrap w-full">
                        <input
                            type="text"
                            name="chat-message"
                            aria-label="Tulis pesan"
                            autoComplete="off"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tulis pesan..."
                            className="flex-1 min-w-0 p-3 rounded-lg bg-zinc-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                        />
                        <button
                            type="submit"
                            disabled={!message.trim()}
                            className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 rounded-lg text-white hover:from-violet-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto font-semibold transition transform hover:scale-105 active:scale-95"
                        >
                            Kirim
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}
