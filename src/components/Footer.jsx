import "remixicon/fonts/remixicon.css";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-wrapper">
      {/* Aurora Background Effect */}
      <div className="footer-aurora"></div>
      <div className="footer-border-gradient"></div>

      {/* Main Footer Grid */}
      <div className="footer-grid container mx-auto px-6">

        {/* Brand & About Section */}
        <div className="footer-brand">
          <h2 className="footer-logo">LeebSite</h2>
          <p className="footer-tagline">
            Portfolio Muhammad Ghalib Pradipa. Software Engineer & Web Developer yang berfokus pada teknologi modern dan inovasi digital.
          </p>
          <div className="footer-location">
            <i className="ri-map-pin-fill"></i>
            <span>Pekanbaru, Riau, Indonesia</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="#home" onClick={(e) => { e.preventDefault(); document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }); }}>
            Home
          </a>
          <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }}>
            About Me
          </a>
          <a href="#project" onClick={(e) => { e.preventDefault(); document.getElementById("project")?.scrollIntoView({ behavior: "smooth" }); }}>
            Projects
          </a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>
            Contact
          </a>
        </div>

        {/* Social Media */}
        <div className="footer-social">
          <h3>Connect With Me</h3>
          <div className="social-icons">
            <a
              href="https://github.com/LeebSite"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="GitHub"
            >
              <i className="ri-github-fill"></i>
            </a>
            <a
              href="https://www.instagram.com/gpradiipaa"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Instagram"
            >
              <i className="ri-instagram-fill"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/ghalibpradipaa"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="LinkedIn"
            >
              <i className="ri-linkedin-fill"></i>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="footer-bottom container mx-auto px-6">
        <p className="footer-copyright">
          © {currentYear} <span>Muhammad Ghalib Pradipa</span>. All rights reserved.
        </p>
        <div className="footer-credits">
          <span>Built with React & Vite</span>
          <a href="mailto:mhd.ghalibpradipa@gmail.com">Get in Touch</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
