import React, { useState } from 'react';
import './Experience.css';
import ShinyText from '../ShinyText/ShinyText';

const Experience = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const experiences = [
        {
            id: 1,
            role: "Software Engineer Intern",
            company: "PT Kilang Pertamina Internasional RU II Dumai",
            period: "3 Februari 2025 - 28 Maret 2025",
            type: "Internship",
            description: "Saya berperan sebagai Software Engineer Intern dengan fokus pada pengembangan dan pemeliharaan aplikasi internal. Terlibat dalam perancangan sistem, pengembangan fitur berbasis web, pengolahan data, serta peningkatan performa dan stabilitas aplikasi. Pengalaman ini memperkuat pemahaman saya terhadap praktik pengembangan perangkat lunak di lingkungan industri energi berskala besar.",
            photos: [
                { src: "/assets/pengalaman/pertamina1.jpg", alt: "Dokumentasi Software Engineer Intern Muhammad Ghalib Pradipa di PT Kilang Pertamina Internasional RU II Dumai - 1" },
                { src: "/assets/pengalaman/pertamina2.jpg", alt: "Dokumentasi Software Engineer Intern Muhammad Ghalib Pradipa di PT Kilang Pertamina Internasional RU II Dumai - 2" },
                { src: "/assets/pengalaman/pertamina3.jpg", alt: "Dokumentasi Software Engineer Intern Muhammad Ghalib Pradipa di PT Kilang Pertamina Internasional RU II Dumai - 3" },
                { src: "/assets/pengalaman/pertamina4.jpg", alt: "Dokumentasi Software Engineer Intern Muhammad Ghalib Pradipa di PT Kilang Pertamina Internasional RU II Dumai - 4" },
                { src: "/assets/pengalaman/pertamina5.jpg", alt: "Dokumentasi Software Engineer Intern Muhammad Ghalib Pradipa di PT Kilang Pertamina Internasional RU II Dumai - 5" }
            ],
            icon: "💼",
            color: "from-blue-500 to-cyan-500"
        },
        {
            id: 2,
            role: "Wakil Ketua Himpunan Mahasiswa",
            company: "HIMATIF – Teknik Informatika UIN Sultan Syarif Kasim Riau",
            period: "Desember 2024 - Desember 2025",
            type: "Organization",
            description: "Menjabat sebagai Wakil Ketua Himpunan Mahasiswa Teknik Informatika (HIMATIF) UIN Sultan Syarif Kasim Riau. Bertanggung jawab dalam membantu ketua memimpin organisasi, mengoordinasikan program kerja, menjaga sinergi antar divisi, serta menjadi penghubung antara mahasiswa, pengurus, dan pihak jurusan. Peran ini melatih kepemimpinan, komunikasi, dan manajemen organisasi.",
            photos: [
                { src: "/assets/pengalaman/organisasi1.jpg", alt: "Dokumentasi Wakil Ketua HIMATIF Muhammad Ghalib Pradipa - 1" },
                { src: "/assets/pengalaman/organisasi2.jpg", alt: "Dokumentasi Wakil Ketua HIMATIF Muhammad Ghalib Pradipa - 2" },
                { src: "/assets/pengalaman/organisasi3.jpg", alt: "Dokumentasi Wakil Ketua HIMATIF Muhammad Ghalib Pradipa - 3" },
                { src: "/assets/pengalaman/organisasi4.jpg", alt: "Dokumentasi Wakil Ketua HIMATIF Muhammad Ghalib Pradipa - 4" }
            ],
            icon: "🎓",
            color: "from-violet-500 to-purple-500"
        },
        {
            id: 3,
            role: "Event & Program Coordinator",
            company: "Riau DevOps – LABSquad Informatics",
            period: "Maret 2024 - Desember 2024",
            type: "Community",
            description: "Berperan sebagai Event & Program Coordinator di komunitas Riau DevOps (LABSquad Informatics). Bertanggung jawab dalam perencanaan, pengelolaan, dan pelaksanaan program serta event teknis, khususnya yang berkaitan dengan DevOps, cloud, dan pengembangan sistem. Pengalaman ini memperluas wawasan saya dalam kolaborasi tim teknis dan pengelolaan event berbasis teknologi.",
            photos: [
                { src: "/assets/pengalaman/riaudevops1.jpg", alt: "Dokumentasi Event Coordinator Riau DevOps Muhammad Ghalib Pradipa - 1" },
                { src: "/assets/pengalaman/riaudevops2.jpg", alt: "Dokumentasi Event Coordinator Riau DevOps Muhammad Ghalib Pradipa - 2" },
                { src: "/assets/pengalaman/riaudevops3.jpg", alt: "Dokumentasi Event Coordinator Riau DevOps Muhammad Ghalib Pradipa - 3" }
            ],
            icon: "🚀",
            color: "from-green-500 to-emerald-500"
        }
    ];

    const openLightbox = (image) => {
        setSelectedImage(image);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    const scrollGallery = (expId, direction) => {
        const gallery = document.getElementById(`gallery-${expId}`);
        if (gallery) {
            const scrollAmount = 300;
            gallery.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="experience-section" id="experience">
            <div className="experience-container">
                {/* Section Header */}
                <div className="experience-header" data-aos="fade-up" data-aos-duration="1000" >
                    <h2 className="text-4xl font-bold mb-4">
                        <ShinyText text="Experience" disabled={false} speed={3} className="custom-class" />
                    </h2>
                    <p className="experience-subtitle">
                        Perjalanan Profesional dan Organisasi Saya
                    </p>
                </div>

                {/* Experience Timeline */}
                <div className="experience-timeline">
                    {experiences.map((exp, index) => (
                        <div
                            key={exp.id}
                            className="experience-card"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            data-aos-delay={index * 200}

                        >
                            {/* Timeline Dot */}
                            <div className="timeline-dot">
                                <span className="timeline-icon">{exp.icon}</span>
                            </div>

                            {/* Card Content */}
                            <div className="experience-card-content">
                                {/* Header */}
                                <div className="experience-card-header">
                                    <div>
                                        <span className={`experience-type bg-gradient-to-r ${exp.color}`}>
                                            {exp.type}
                                        </span>
                                        <h3 className="experience-role">{exp.role}</h3>
                                        <p className="experience-company">{exp.company}</p>
                                        <p className="experience-period">📅 {exp.period}</p>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="experience-description">{exp.description}</p>

                                {/* Photo Gallery - Horizontal Scroll */}
                                <div className="gallery-wrapper">
                                    {/* Scroll Buttons */}
                                    {exp.photos.length > 3 && (
                                        <>
                                            <button
                                                className="gallery-scroll-btn left"
                                                onClick={() => scrollGallery(exp.id, 'left')}
                                                aria-label="Scroll left"
                                            >
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M15 18l-6-6 6-6" />
                                                </svg>
                                            </button>
                                            <button
                                                className="gallery-scroll-btn right"
                                                onClick={() => scrollGallery(exp.id, 'right')}
                                                aria-label="Scroll right"
                                            >
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M9 18l6-6-6-6" />
                                                </svg>
                                            </button>
                                        </>
                                    )}

                                    {/* Horizontal Scrollable Gallery */}
                                    <div className="experience-gallery horizontal-scroll" id={`gallery-${exp.id}`}>
                                        {exp.photos.map((photo, photoIndex) => (
                                            <div
                                                key={photoIndex}
                                                className="gallery-item"
                                                onClick={() => openLightbox(photo)}
                                            >
                                                <img
                                                    src={photo.src}
                                                    alt={photo.alt}
                                                    className="gallery-image"
                                                    loading="lazy"
                                                />
                                                <div className="gallery-overlay">
                                                    <svg className="gallery-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={closeLightbox}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img src={selectedImage.src} alt={selectedImage.alt} className="lightbox-image" />
                        <p className="lightbox-caption">{selectedImage.alt}</p>
                    </div>
                </div>
            )}

            {/* SEO Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Person",
                    "name": "Muhammad Ghalib Pradipa",
                    "jobTitle": "Software Engineer",
                    "hasOccupation": experiences.map(exp => ({
                        "@type": "OrganizationRole",
                        "roleName": exp.role,
                        "startDate": exp.period.split(' - ')[0],
                        "endDate": exp.period.split(' - ')[1] || "Present",
                        "organization": {
                            "@type": "Organization",
                            "name": exp.company
                        },
                        "description": exp.description
                    }))
                })}
            </script>
        </section>
    );
};

export default Experience;
