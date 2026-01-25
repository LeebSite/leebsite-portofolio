import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import PreLoader from './components/PreLoader.jsx'
import SEO, { HelmetProvider } from './components/SEO.jsx'
import "animate.css"
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <SEO />
      <PreLoader />
      <div className="container mx-auto px-6">
        <Navbar />
        <App />
        <Footer />
      </div>
    </HelmetProvider>
  </StrictMode>,
)
