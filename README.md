# Portofolio Web — Muhammad Ghalib Pradipa

Portofolio pribadi Muhammad Ghalib Pradipa — Fresh Graduate S1 Teknik Informatika (UIN Sultan Syarif Kasim Riau). Single-page application yang dibangun dengan React + Vite.

🌐 **Live:** [www.leebsite.my.id](https://www.leebsite.my.id/)

## Halaman

| Route | Halaman |
| --- | --- |
| `/` | Home |
| `/about` | Tentang Saya |
| `/experience` | Pengalaman |
| `/projects` | Proyek |
| `/projects/:id` | Detail Proyek |
| `/journey` | Perjalanan |
| `/achievements` | Pencapaian |
| `/contact` | Kontak |

## Fitur

- **Bilingual (ID/EN)** — seluruh konten tersedia dalam Bahasa Indonesia dan Inggris.
- **Dark mode** — tema gelap near-black, bisa di-toggle dari drawer mobile dan command palette.
- **Animasi Framer Motion** — reveal saat scroll, scroll progress bar, dan transisi antar halaman.
- **SEO per-route** — title, canonical, Open Graph, dan JSON-LD berbeda tiap halaman (react-helmet-async), dilengkapi `sitemap.xml` dan `robots.txt`.
- **Mobile single-scroll** — di layar kecil semua section tampil dalam satu scroll berkelanjutan; layout desktop tidak berubah.
- **Widget statistik GitHub** di halaman About.

## Tech Stack

- **React 19** + **Vite 7**
- **React Router v7**
- **Tailwind CSS v4**
- **Framer Motion** + **Motion**
- **react-helmet-async** (SEO)
- **Firebase** (Auth/Firestore via browser SDK)
- **ESLint 9**

## Struktur Project

```
public/                  # file statis: favicon, assets, sitemap.xml, robots.txt, CV.pdf
src/
  main.jsx               # entry point
  AppV2.jsx              # app shell + routing (layout v2)
  AppV2.css
  components/
    v2/                  # halaman: Home, About, Experience, Projects, Journey, Achievements, Contact
    Sidebar/             # sidebar desktop
    MobileHeader/        # header + drawer mobile
    SEO.jsx              # SEO per-route (Helmet)
    motion/              # Reveal, CountUp
    GitHubStatsWidget/   # statistik GitHub di About
  context/               # LanguageContext, CommandPaletteContext, CvModalContext
  data/
    data.js              # data proyek, pengalaman, dsb.
    translations.js      # kamus ID/EN
    firebase.js          # konfigurasi Firebase
  index.css
vercel.json              # redirect 301 ke leebsite.my.id + SPA fallback
vite.config.js
eslint.config.js
```

## Cara Menjalankan

```bash
# Clone repository
git clone https://github.com/LeebSite/leebsite-portofolio.git
cd leebsite-portofolio

# Install dependencies
npm install

# Jalankan dev server (hot reload)
npm run dev

# Build production
npm run build

# Preview hasil build
npm run preview

# Lint
npm run lint
```

## Deployment

Deploy otomatis via **Vercel** dari branch `main`. Domain utama `www.leebsite.my.id`; `leebsite.vercel.app` di-redirect permanen (301) ke domain utama.

## Kontak

- **Website:** [www.leebsite.my.id](https://www.leebsite.my.id/)
- **Email:** [mhd.ghalibpradipa@gmail.com](mailto:mhd.ghalibpradipa@gmail.com)
- **LinkedIn:** [linkedin.com/in/ghalibpradipaa](https://www.linkedin.com/in/ghalibpradipaa)
- **GitHub:** [github.com/LeebSite](https://github.com/LeebSite)
- **Instagram:** [@gpradiipaa](https://www.instagram.com/gpradiipaa)
