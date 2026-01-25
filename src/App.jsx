import { useRef, useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import ShinyText from "./components/ShinyText/ShinyText";
import BlurText from "./components/BlurText/BlurText";
import ScrambledText from "./components/ScrambledText/ScrambledText";
import SplitText from "./components/SplitText/SplitText";
import GlassIcons from "./components/GlassIcons/GlassIcons";
import { listTools, listProyek } from "./data";
import ChromaGrid from "./components/ChromaGrid/ChromaGrid";
import ProjectModal from "./components/ProjectModal/ProjectModal"; // <-- IMPORT MODAL
import Aurora from "./components/Aurora/Aurora";
import AOS from 'aos';
import ChatRoom from "./components/ChatRoom";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import Experience from "./components/Experience/Experience";
import 'aos/dist/aos.css';
import Lenis from 'lenis'; // You can also use <link> for styles
// ..
AOS.init({
  once: true, // Fix: Changed to true to prevent layout shifts on scroll
  mirror: false,
  offset: 50,
  anchorPlacement: "top-bottom",
  duration: 1000,
});

function App() {
  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Setup Smooth Scroll (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  const [selectedProject, setSelectedProject] = useState(null); // null = modal tertutup

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };
  // -------------------------



  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-screen -z-10 overflow-hidden">
        <Aurora
          colorStops={["#577870", "#1F97A6", "#127B99"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div id="home" className="hero grid md:grid-cols-2 items-center pt-24 xl:gap-0 gap-6 grid-cols-1">
          <div className="animate__animated animate__fadeInUp">
            <div className="flex items-center gap-3 mb-6 bg bg-zinc-800 w-fit p-4 rounded-2xl">
              <img src="./assets/ghalib.png" alt="Ghalib Icon" width="40" height="40" className="w-10 rounded-md" />
              <q>If I want, I will. #PRINSIP</q>
            </div>
            <h1 className="text-5xl font-bold mb-6 min-h-[1.2em]">
              <ShinyText text="Hai, Saya Muhammad Ghalib Pradipa" disabled={false} speed={3} className='custom-class' />
            </h1>
            <BlurText
              text="Saya adalah mahasiswa Teknik Informatika tingkat akhir dengan minat yang kuat dalam pengembangan web, sistem backend, analisis data, dan aplikasi berbasis AI. Saya senang membangun produk digital yang modern, scalable, dan berdampak dengan menggabungkan kode yang clean, arsitektur solid, dan pengalaman pengguna yang thoughtful."
              delay={150}
              animateBy="words"
              direction="top"
              className=" mb-6"
            />
            <div className="flex items-center sm:gap-4 gap-2">
              <a
                href="./assets/CV.pdf"
                download="CV Muhammad Ghalib Pradipa.pdf"
                className="font-semibold bg-[#1a1a1a] p-4 px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors"
              >
                <ShinyText text="Unduh CV" disabled={false} speed={3} className="custom-class" />
              </a>

              <a href="#project" className="font-semibold bg-[#1a1a1a] p-4 px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors">
                <ShinyText text="Jelajahi Proyek Saya" disabled={false} speed={3} className="custom-class" />
              </a>
            </div>

          </div>
          <div className="w-full flex justify-center md:justify-end animate__animated animate__fadeInUp">
            <ProfileCard
              name="M Ghalib Pradipa"
              title="Pengembang Web"
              handle="ghalibpradipa"
              status="Online"
              contactText="Hubungi Saya"
              avatarUrl="./assets/ghalib1.png"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => window.location.href = 'mailto:mhd.ghalibpradipa@gmail.com?subject=Hello from LeebSite&body=Hi Ghalib,'}
            />
          </div>
        </div>
        {/* tentang */}
        <div className="mt-15 mx-auto w-full max-w-[1600px] rounded-3xl border-[5px] border-violet-500/40 shadow-[0_0_30px_rgba(168,85,247,0.4)] bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] p-6" id="about">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-0 px-8" data-aos="fade-up" data-aos-duration="1000" >
            <div className="basis-full md:basis-7/12 pr-0 md:pr-8 border-b md:border-b-0 md:border-r border-violet-500/30">
              {/* Kolom kiri */}
              <div className="flex-1 text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-5" data-aos="fade-up">
                  Tentang Saya
                </h2>

                <BlurText
                  text="Saya Muhammad Ghalib Pradipa, mahasiswa Teknik Informatika tingkat akhir dan calon software engineer yang fokus membangun aplikasi yang fungsional, scalable, dan berbasis data. Pengalaman saya mencakup pengembangan web, backend engineering, RESTful API, desain database, dan arsitektur sistem, dengan eksposur yang terus berkembang dalam analisis data, machine learning, dan sistem berbasis GIS. Saya telah mengerjakan berbagai proyek akademik dan personal mulai dari sistem CRUD, aplikasi Android, integrasi API, hingga implementasi berbasis analitik dan AI. Saya senang mempelajari teknologi baru, menyelesaikan masalah dunia nyata, dan mengubah kebutuhan kompleks menjadi solusi digital yang efisien. Saat ini, saya mempersiapkan diri untuk peran profesional dan magang di mana saya dapat berkontribusi, berkembang, dan memberikan dampak yang berarti melalui teknologi."
                  delay={30}
                  animateBy="words"
                  direction="top"
                  className="text-base md:text-lg leading-relaxed mb-10 text-gray-300"
                />

                <div className="flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left gap-y-8 sm:gap-y-0 mb-4 w-full">
                  <div data-aos="fade-up" data-aos-delay="200">
                    <h1 className="text-3xl md:text-4xl mb-1">
                      10<span className="text-violet-500">+</span>
                    </h1>
                    <p>Proyek Selesai</p>
                  </div>
                  <div data-aos="fade-up" data-aos-delay="400">
                    <h1 className="text-3xl md:text-4xl mb-1">
                      4<span className="text-violet-500">+</span>
                    </h1>
                    <p>Tahun Belajar & Pengembangan</p>
                  </div>
                  <div data-aos="fade-up" data-aos-delay="600">
                    <h1 className="text-3xl md:text-4xl mb-1">
                      3.70<span className="text-violet-500">/4.00</span>
                    </h1>
                    <p>GPA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Kolom kanan */}
            <div className="basis-full md:basis-5/12 pl-0 md:pl-8 flex justify-center items-center">
              <MusicPlayer />
            </div>
          </div>

        </div>

        {/* Experience Section */}
        <Experience />



        <div id="tools" className="tools mt-32">
          <h1 className="text-4xl/snug font-bold mb-4" data-aos="fade-up">Alat & Teknologi</h1>
          <p className="w-2/5 text-base/loose opacity-50" data-aos="fade-up" data-aos-delay="300">Keahlian Profesional Saya</p>
          <div className="tools-box mt-14 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">

            {listTools.map((tool) => (
              <div
                key={tool.id} data-aos="fade-up" data-aos-delay={tool.dad}
                className="flex items-center gap-4 p-4 border border-zinc-700 rounded-xl bg-zinc-900/60 backdrop-blur-md hover:bg-zinc-800/80 transition-all duration-300 group shadow-lg"
              >
                <img
                  src={tool.gambar}
                  alt="Tools Image"
                  width="64"
                  height="64"
                  className="w-16 h-16 object-contain bg-zinc-800 p-2 rounded-lg group-hover:bg-zinc-900 transition-all duration-300"
                />
                <div className="flex flex-col overflow-hidden">
                  <div className="truncate">
                    <ShinyText
                      text={tool.nama}
                      disabled={false}
                      speed={3}
                      className="text-lg font-semibold block"
                    />
                  </div>
                  <p className="text-sm text-zinc-400 truncate">{tool.ket}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* tentang */}

        {/* Proyek */}
        <div className="proyek mt-32 py-10" id="project"></div>
        <h1 className="text-center text-4xl font-bold mb-2" data-aos="fade-up">Proyek</h1>
        <p className="text-base/loose text-center opacity-50" data-aos="fade-up" data-aos-delay="300">Menampilkan pilihan proyek yang mencerminkan keahlian, kreativitas, dan passion saya dalam membangun pengalaman digital yang bermakna.</p>
        <div className="proyek-box mt-14" >

          <div style={{ height: 'auto', position: 'relative' }} data-aos="fade-up" data-aos-delay="400">
            <ChromaGrid
              items={listProyek}
              onItemClick={handleProjectClick} // Kirim fungsi untuk handle klik
              radius={500}
              damping={0.45}
              fadeOut={0.6}
              ease="power3.out"
            />
          </div>
        </div>
        {/* Proyek */}


        {/* Kontak */}
        <div className="kontak mt-32 sm:p-10 p-0" id="contact">
          <h1
            className="text-4xl mb-2 font-bold text-center"
            data-aos="fade-up"
          >
            Kontak & Chat
          </h1>
          <p
            className="text-base/loose text-center mb-10 opacity-50"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Hubungi saya atau chat secara real-time
          </p>

          {/* Container dua kolom */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Chat Room di kiri */}
            <div className="flex-1 bg-zinc-800 p-6 rounded-md" data-aos="fade-up" data-aos-delay="400">
              <ChatRoom />
            </div>

            {/* Contact Form di kanan */}
            <div className="flex-1">
              <form
                action="https://formsubmit.co/rissoppa21@gmail.com"
                method="POST"
                className="bg-zinc-800 p-10 w-full rounded-md"
                autoComplete="off"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="font-semibold">Nama Lengkap</label>
                    <input
                      id="name"
                      type="text"
                      name="Name"
                      placeholder="Masukkan Nama..."
                      autoComplete="name"
                      className="border border-zinc-500 p-2 rounded-md"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-semibold">Email</label>
                    <input
                      id="email"
                      type="email"
                      name="Email"
                      placeholder="Masukkan Email..."
                      autoComplete="email"
                      className="border border-zinc-500 p-2 rounded-md"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-semibold">Pesan</label>
                    <textarea
                      name="message"
                      id="message"
                      cols="45"
                      rows="7"
                      placeholder="Tulis pesan Anda..."
                      className="border border-zinc-500 p-2 rounded-md"
                      required
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="font-semibold bg-[#1a1a1a] p-4 px-6 rounded-full w-full cursor-pointer border border-gray-700 hover:bg-[#222] transition-colors"
                    >
                      <ShinyText text="Kirim" disabled={false} speed={3} className="custom-class" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Kontak */}
      </main>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </>
  )
}

export default App
