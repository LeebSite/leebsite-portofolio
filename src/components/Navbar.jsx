import { useState, useEffect } from "react";
import { FiMenu, FiX, FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";

const Navbar = ({ hidden = false }) => {
  if (hidden) return null;

  const [active, setActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Tools", href: "#tools" },
    { name: "Project", href: "#project" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* 
        Navbar Container 
        - Mobile: Transparent (no background)
        - Desktop: Background muncul saat scroll (active)
      */}
      <nav
        className={`navbar fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 ${active && !isOpen ? "md:bg-black/80 md:backdrop-blur-md md:shadow-lg" : ""
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo 
              - Klik logo scroll ke top
          */}
          <div className="logo z-50 hidden md:block">
            <h1
              className={`text-2xl font-bold transition-all duration-300 cursor-pointer ${isOpen ? 'text-white' : 'text-white/90 drop-shadow-md'}`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              LeebSite
            </h1>
          </div>

          {/* Desktop Menu (Hidden on Mobile) */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-medium text-zinc-300 hover:text-white transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-500 transition-all group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Toggle Button (Floating Circle) 
              - Tampil sebagai lingkaran putih
              - Tetap terlihat clean
          */}
          <button
            className={`md:hidden z-50 flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300 focus:outline-none hover:scale-105 active:scale-95 ml-auto ${isOpen
              ? "bg-transparent text-white border border-white/20"  // Saat menu buka: blend dengan background
              : "bg-white text-black"                               // Saat menu tutup: Lingkaran Putih Mencolok
              }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <FiX size={24} /> : (
              // Icon Hamburger Custom (Garis miring ala referensi)
              <div className="flex flex-col gap-1.5 items-center justify-center">
                <span className="block w-5 h-0.5 bg-black rounded-full"></span>
                <span className="block w-5 h-0.5 bg-black rounded-full"></span>
              </div>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu Overlay */}
      <div className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center transition-all duration-500 transform ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
        {/* Background elements decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-[20%] -right-[20%] w-[80%] h-[80%] bg-violet-600/30 rounded-full blur-[100px]"></div>
          <div className="absolute top-[40%] -left-[20%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[100px]"></div>
        </div>

        <ul className="flex flex-col items-center gap-8 z-10">
          {navLinks.map((link, index) => (
            <li
              key={link.name}
              className={`transform transition-all duration-500 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-white to-zinc-400 hover:to-violet-400 tracking-wider uppercase transition-all"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Social Icons */}
        <div className={`absolute bottom-20 flex gap-8 transform transition-all duration-700 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`} style={{ transitionDelay: '600ms' }}>
          <a href="https://github.com/LeebSite" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors text-2xl"><FiGithub /></a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors text-2xl"><FiLinkedin /></a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors text-2xl"><FiInstagram /></a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
