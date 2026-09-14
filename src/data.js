const HeroImage = "/assets/hero-img.webp";

const Image = {
  HeroImage,
};

export default Image;

const Tools1 = "/assets/tools/vscode.png";
const Tools2 = "/assets/tools/reactjs.png";
const Tools3 = "/assets/tools/nextjs.png";
const Tools4 = "/assets/tools/tailwind.png";
const Tools5 = "/assets/tools/bootstrap.png";
const Tools6 = "https://www.jetbrains.com/guide/assets/fastapi-6837327b.svg";
const Tools7 = "/assets/tools/nodejs.png";
const Tools8 = "/assets/tools/github.png";
const Tools9 = "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg";
const Tools10 = "/assets/tools/canva.png";
const Tools11 = "/assets/tools/figma.png";
const Tools12 = "/assets/tools/kotlin.png";
const Tools13 = "/assets/tools/firebase.png";
const Tools14 = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/250px-Laravel.svg.png";
const Tools15 = "https://www.svgrepo.com/show/354202/postman-icon.svg";
const Tools16 = "/assets/tools/ts.png";
const Tools17 = "/assets/tools/php.png";
const Tools18 = "/assets/tools/vite.png";
const Tools19 = "/assets/tools/mysql.png";
const Tools20 = "https://s3-ap-southeast-1.amazonaws.com/homepage-media/wp-content/uploads/2020/03/04092434/NET_Core_Logo.png";
const Tools21 = "https://cloudeereviews.com/images/docker-logo.png";
const Tools22 = "/assets/tools/js.png";
const Tools23 = "/assets/tools/html.png";
const Tools24 = "/assets/tools/css.png";


export const listTools = [
  {
    id: 1,
    gambar: Tools1,
    nama: "Visual Studio Code",
    ket: "Code Editor",
    dad: "100",
  },
  {
    id: 2,
    gambar: Tools2,
    nama: "React JS",
    ket: "Framework",
    dad: "200",
  },
  {
    id: 3,
    gambar: Tools3,
    nama: "Next JS",
    ket: "Framework",
    dad: "300",
  },
  {
    id: 4,
    gambar: Tools4,
    nama: "Tailwind CSS",
    ket: "Framework",
    dad: "400",
  },
  {
    id: 5,
    gambar: Tools5,
    nama: "Bootstrap",
    ket: "Framework",
    dad: "500",
  },
  {
    id: 6,
    gambar: Tools6,
    nama: "FastAPI",
    ket: "Framework",
    dad: "600",
  },
  {
    id: 7,
    gambar: Tools7,
    nama: "Node JS",
    ket: "Javascript Runtime",
    dad: "700",
  },
  {
    id: 8,
    gambar: Tools8,
    nama: "Github",
    ket: "Repository",
    dad: "800",
  },
  {
    id: 9,
    gambar: Tools9,
    nama: "PostgreSQL",
    ket: "Database",
    dad: "900",
  },
  {
    id: 10,
    gambar: Tools10,
    nama: "Canva",
    ket: "Design App",
    dad: "1000",
  },
  {
    id: 11,
    gambar: Tools11,
    nama: "Figma",
    ket: "Design App",
    dad: "1100",
  },
  {
    id: 12,
    gambar: Tools12,
    nama: "Kotlin",
    ket: "Language",
    dad: "1200",
  },
  {
    id: 13,
    gambar: Tools13,
    nama: "Firebase",
    ket: "Framework",
    dad: "1300",
  },
  {
    id: 14,
    gambar: Tools14,
    nama: "Laravel",
    ket: "Framework",
    dad: "1400",
  },
  {
    id: 15,
    gambar: Tools15,
    nama: "Postman",
    ket: "API Testing",
    dad: "1500",
  },
  {
    id: 16,
    gambar: Tools16,
    nama: "TypeScript",
    ket: "Language",
    dad: "1600",
  },
  {
    id: 17,
    gambar: Tools17,
    nama: "PHP",
    ket: "Language",
    dad: "1700",
  },
  {
    id: 18,
    gambar: Tools18,
    nama: "Vite",
    ket: "Framework",
    dad: "1800",
  },
  {
    id: 19,
    gambar: Tools19,
    nama: "MySql",
    ket: "Database",
    dad: "1900",
  },
  {
    id: 20,
    gambar: Tools20,
    nama: ".NET",
    ket: "Framework",
    dad: "2000",
  },
  {
    id: 21,
    gambar: Tools21,
    nama: "Docker",
    ket: "Containerization",
    dad: "2100",
  },
  {
    id: 22,
    gambar: Tools22,
    nama: "JavaScript",
    ket: "Language",
    dad: "2200",
  },
  {
    id: 23,
    gambar: Tools23,
    nama: "HTML",
    ket: "Language",
    dad: "2300",
  },
  {
    id: 24,
    gambar: Tools24,
    nama: "CSS",
    ket: "Language",
    dad: "2400" ,
  },
];

const Proyek1 = "/assets/proyek/projek1.png";
const Proyek2 = "/assets/proyek/projek2.png";
const Proyek3 = "/assets/proyek/projek3.png";
const Proyek4 = "/assets/proyek/projek4.png";
const Proyek5 = "/assets/proyek/projek5.png";
const Proyek6 = "/assets/proyek/projek6.png";

// Detail images for modal
const Proyek1Detail = "/assets/proyek/projek1f.png";
const Proyek2Detail = "/assets/proyek/projek2f.png";
const Proyek3Detail = "/assets/proyek/projek3f.png";
const Proyek4Detail = "/assets/proyek/projek4f.png";
const Proyek5Detail = "/assets/proyek/projek5f.png";
const Proyek6Detail = "/assets/proyek/projek6f.png";

export const listProyek = [
  {
    id: 1,
    title: "StrokePredict AI",
    subtitle: "Deteksi & Segmentasi Risiko Stroke Berbasis AI",
    categories: ["Website", "Associated"],
    tech: ["React.js", "FastAPI", "Python", "XGBoost", "K-Means", "SHAP", "Docker Compose"],
    featured: true,
    borderColor: "#14b8a6",
    fullDescription: "Aplikasi web healthcare analytics independen yang mengintegrasikan pemodelan Machine Learning ke dalam arsitektur modern secara end-to-end. Memanfaatkan algoritma K-Means Clustering untuk segmentasi karakteristik pasien dan XGBoost untuk klasifikasi probabilitas risiko stroke secara presisi. Inovasi utama sistem ini adalah implementasi kerangka kerja Explainable AI (SHAP) yang menerjemahkan model 'black box' AI menjadi visualisasi kontribusi fitur yang transparan dan dapat dipertanggungjawabkan secara klinis.",
    image: "/assets/projects/strokepredict.jpg",
    url: "#",
    link: "#"
  },
  {
    id: 2,
    title: "Laman Portal Balai Bahasa Prov Riau",
    subtitle: "Modernisasi Sistem & Migrasi Basis Data Pemerintahan",
    categories: ["Website"],
    tech: ["Laravel", "PHP", "WordPress", "MySQL", "Bootstrap"],
    featured: true,
    borderColor: "#2563eb",
    fullDescription: "Platform digital terintegrasi yang berfungsi sebagai pusat layanan informasi dan kebahasaan masyarakat Balai Bahasa Provinsi Riau. Proyek ini mencakup modernisasi infrastruktur teknologi instansi melalui ekstraksi basis data berskala besar dan migrasi arsitektur secara menyeluruh dari platform legacy (WordPress) ke ekosistem Laravel (PHP). Melibatkan pembedahan Entity Relationship Diagram (ERD) dan penulisan logika controller baru untuk memastikan integritas perpindahan ribuan data tanpa resiko kehilangan data (zero data loss).",
    image: "/assets/projects/balaibahasa.jpg",
    url: "#",
    link: "#"
  },
  {
    id: 3,
    title: "Sembari",
    subtitle: "Platform Perpustakaan Digital Interaktif & Mendongeng Anak",
    categories: ["Website"],
    tech: ["Laravel", "PHP", "Tailwind CSS", "JavaScript", "MySQL", "Flipbook Engine"],
    featured: true,
    borderColor: "#8b5cf6",
    fullDescription: "Platform perpustakaan digital berbasis web yang dirancang untuk meningkatkan minat baca anak usia 7 hingga 15 tahun serta memfasilitasi kegiatan mendongeng bersama orang tua. Aplikasi ini menyajikan buku cerita bergambar dan cerita rakyat nusantara dengan dukungan multi-bahasa (Indonesia dan bahasa daerah), navigasi ramah anak, serta mesin pembaca interaktif (flipbook). Dilengkapi fitur Portal Publik open-access dengan Katalog & Filter Pintar multi-kriteria (Jenjang Usia 7–9 th, 10–12 th, 13–15 th, Kategori, Bahasa Daerah, dan Asal Daerah), Mesin Pembaca Flipbook Interaktif dengan transisi membalik kertas realistis (realistic page-flip), navigasi sentuh (swipe gesture) untuk tablet/iPad, tombol layar, pintasan keyboard, serta pelacakan metrik statistik pembaca (views count) secara real-time.",
    image: "/assets/projects/sembari.png",
    url: "#",
    link: "#"
  },
  {
    id: 4,
    title: "Scapegis - AI-Powered WebGIS Platform",
    subtitle: "Sistem Informasi Geografis Tata Ruang Kota Pekanbaru",
    categories: ["Website", "Associated"],
    tech: ["WebGIS", "RESTful API", "NLP", "AI", "Fullstack Web"],
    featured: true,
    borderColor: "#6366f1",
    fullDescription: "Platform Sistem Informasi Geografis berbasis web (WebGIS) berskala penuh untuk optimalisasi visualisasi dan manajemen data keruangan. Mengintegrasikan basis data spasial kompleks dengan arsitektur full-stack dan RESTful API. Fitur terobosan mencakup implementasi AI-assisted GIS Chat Agent menggunakan pemrosesan bahasa alami (NLP) yang memungkinkan eksekusi kueri dan analisis geospasial secara otomatis hanya melalui perintah teks.",
    image: "/assets/projects/scapegis.jpg",
    url: "#",
    link: "#"
  },
  {
    id: 5,
    title: "Sistem Informasi Magang IT (SIMIT)",
    subtitle: "Platform Manajemen Magang Enterprise PT KPI RU II",
    categories: ["Website"],
    tech: ["ASP.NET Core", "C#", "Clean Architecture", "SQL Server"],
    featured: true,
    borderColor: "#0ea5e9",
    fullDescription: "Aplikasi berbasis web untuk mengelola dan memantau kegiatan magang mahasiswa secara terintegrasi di PT Kilang Pertamina Internasional RU II Dumai. Mendukung pengelolaan data mahasiswa, pencatatan logbook aktivitas harian, serta evaluasi digital. Dikembangkan menggunakan Solution Template Pertamina berbasis ASP.NET Core dengan penerapan prinsip Clean Architecture untuk memastikan sistem terstruktur, andal, dan memenuhi standar industri korporat.",
    image: "/assets/projects/simit.jpg",
    url: "#",
    link: "#"
  },
  {
    id: 6,
    title: "AfterSunset Idn",
    subtitle: "Aplikasi POS & Analisis Keuangan UMKM",
    categories: ["Website"],
    tech: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    featured: false,
    borderColor: "#f97316",
    fullDescription: "Aplikasi Point of Sale (POS) dan manajemen finansial berbasis web yang dirancang khusus untuk optimasi alur kerja usaha UMKM lokal. Mengotomatisasi sistem kasir, manajemen stok inventaris, pendataan pelanggan, serta menghasilkan laporan analisis pendapatan berkala. Sistem ini meminimalisir antrean pelanggan dan mempercepat proses transaksi operasional bisnis makanan dan minuman.",
    image: "/assets/projects/aftersunsetidn.png",
    url: "#",
    link: "#"
  },
  {
    id: 7,
    title: "Waddle App",
    subtitle: "Aplikasi Produktivitas & Manajemen Kesehatan Mental",
    categories: ["UI/UX Design", "Mobile"],
    tech: ["Canva", "Figma"],
    featured: true,
    borderColor: "#22d3ee",
    fullDescription: "Sebuah aplikasi yang dirancang untuk mengedukasi dan produktivitas berbasis mobile yang dirancang untuk membantu pelajar dan mahasiswa dalam mengelola waktu belajar secara efektif sekaligus menjaga kesehatan mental dan fisik selama proses belajar. Sebagai solusi permasalahan meningkatnya stres akademik, kelelahan mental (burnout), serta rendahnya kesadaran akan pentingnya keseimbangan antara belajar dan istirahat.",
    image: "/assets/projects/waddle.png",
    url: "#",
    link: "#"
  },
  {
    id: 8,
    title: "GLCM Feature Extraction untuk KNN",
    subtitle: "Klasifikasi Citra Tanda Tangan Otomatis",
    categories: ["Associated"],
    tech: ["Python", "OpenCV", "KNN", "GLCM", "Google Colab"],
    featured: false,
    borderColor: "#eab308",
    fullDescription: "Skrip machine learning dan pemrosesan citra yang dirancang untuk melatih model K-Nearest Neighbors (KNN). Program ini mengimplementasikan metode ekstraksi fitur Gray Level Co-Occurrence Matrix (GLCM) menggunakan bahasa Python dan pustaka OpenCV untuk mengklasifikasikan pola citra tanda tangan secara otomatis dengan metrik jarak Euclidean.",
    image: "/assets/projects/glcm.png",
    url: "#",
    link: "#"
  },
  {
    id: 9,
    title: "Quran Kareem",
    subtitle: "Platform Interaktif Pembelajaran Al-Qur'an",
    categories: ["UI/UX Design", "Mobile"],
    tech: ["Figma", "UI/UX Design"],
    featured: false,
    borderColor: "#059669",
    fullDescription: "Quran Kareem merupakan aplikasi Al-Qur'an berbasis mobile yang dirancang untuk pengguna dalam memudahkan membaca Al-Quran. Sama seperti aplikasi Al-Quran lainnya, namun memiliki tampilan yang lebih menarik dan dibekali modul serta latihan membaca Al-Quran dengan makhraj dan tajwid yang benar sehingga dapat memudahkan pengguna berbagai kalangan umur dalam mempelajari dan memahami Al-Quran lebih dalam.",
    image: "/assets/projects/qurankareem.png",
    url: "#",
    link: "#"
  },
  {
    id: 10,
    title: "Website Raudhatul Jannah",
    subtitle: "Company Profile Masjid Raudhatul Jannah",
    categories: ["Website"],
    tech: ["HTML5", "CSS3", "Bootstrap"],
    featured: false,
    borderColor: "#6b7280",
    fullDescription: "Pengembangan antarmuka website profil (Company Profile) untuk Masjid Raudhatul Jannah Kota Pekanbaru. Dibangun menggunakan fundamental HTML5 dan styling CSS Bootstrap guna menyajikan informasi seputar sejarah institusi, galeri, jadwal kegiatan, dan informasi donasi masjid dalam sebuah antarmuka web yang bersih dan responsif.",
    image: "/assets/projects/raudhatuljannah.png",
    url: "#",
    link: "#"
  }
];

export const listCertifications = [
  {
    id: 1,
    title: "Google Cloud Certified - Associate Cloud Engineer",
    issuer: "Google Cloud",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg",
    date: "Issued December 2025",
    skills: ["Cloud Computing", "Infrastructure", "GCP"],
    credentialLink: "#",
    delay: "100"
  },
  {
    id: 2,
    title: "Kilang Pertamina RU II Certified - Software Engineer Intern",
    issuer: "PT. Kilang Pertamina RU II",
    logo: "https://kehatipertaminaru2spk.com/static/media/logo_pertamina.4e59198e.png",
    date: "Issued March 2025",
    skills: ["C#", "ASP.NET", "SQL Server", "Clean Architecture", "Entity Framework"],
    credentialLink: "https://drive.google.com/file/d/1UVK0G1ABxsif5_ATGYqaeIaaWKGBkD9x/view?usp=sharing",
    delay: "200"
  },
  {
    id: 3,
    title: "Responsive Web Design Certification",
    issuer: "freeCodeCamp",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/FreeCodeCamp_logo.svg",
    date: "Issued September 2025",
    skills: ["React", "JavaScript", "Responsive Web"],
    credentialLink: "https://www.freecodecamp.org/certification/leebsite/responsive-web-design",
    delay: "300"
  },
  {
    id: 4,
    title: "Cloud Practitioner Essentials (AWS Cloud)",
    issuer: "Dicoding X AWS Certification",
    logo: "https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/commons/new-ui-logo.png",
    date: "Issued February 2025",
    skills: ["AWS Cloud", "Cloud Computing", "Infrastructure", "GCP"],
    credentialLink: "https://www.dicoding.com/certificates/4EXGV3MG1XRL",
    delay: "400"
  },
  {
    id: 5,
    title: "Dicoding Certified - Belajar Dasar Manajemen Proyek",
    issuer: "Dicoding Indonesia",
    logo: "https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/commons/new-ui-logo.png",
    date: "Issued September 2024",
    skills: ["Project Planning", "Agile", "Scrum", "Project Management"],
    credentialLink: "#",
    delay: "500"
  },
  {
    id: 6,
    title: "HackerRank Certified - Frontend Developer (React)",
    issuer: "HackerRank",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
    date: "Issued December 2024",
    skills: ["React", "Hooks", "Redux"],
    credentialLink: "https://www.hackerrank.com/certificates/iframe/39f796ba7aaa",
    delay: "600"
  },
  {
    id: 7,
    title: "Dicoding Certified - Belajar Dasar AI",
    issuer: "Dicoding Indonesia",
    logo: "https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/commons/new-ui-logo.png",
    date: "Issued November 2024",
    skills: ["Artificial Intelligence", "Machine Learning", "Deep Learning", "Python"],
    credentialLink: "https://www.dicoding.com/certificates/NVP74EREOPR0",
    delay: "700"
  },
  {
    id: 8,
    title: "Oracle Certified Professional - Database Programming with PL/SQL",
    issuer: "Oracle",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/1280px-Oracle_logo.svg.png",
    date: "Issued May 2025",
    skills: ["PL/SQL", "Oracle Database","SQL Developer"],
    credentialLink: "https://www.linkedin.com/in/ghalibpradipaa/details/certifications/",
    delay: "800"
  },
  {
    id: 9,
    title: "TensorFlow Developer Certificate",
    issuer: "TensorFlow",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg",
    date: "Issued Apr 2025",
    skills: ["Machine Learning", "Deep Learning", "Python"],
    credentialLink: "#",
    delay: "900"
  },
  {
    id: 10,
    title: "Digital Skill Fair 12.0 - UI/UX Designer Certificate",
    issuer: "Dibimbing.id",
    logo: "https://media.licdn.com/dms/image/v2/C560BAQEs1djkew463Q/company-logo_200_200/company-logo_200_200/0/1630638017935/dibimbing_id_logo?e=2147483647&v=beta&t=NvRdTFnZCTfb7XPi0H4yApp8Oa5yNIkrri5Cs7rXiQo",
    date: "Issued Mar 2025",
    skills: ["UI/UX", "Design", "Figma"],
    credentialLink: "https://drive.google.com/file/d/1W0Q8c9qIFxoGcvecQnmwpAm6HW93pDKv/view?usp=sharing",
    delay: "1000"
  }
];
