import { useState, useEffect, useRef } from 'react';
import './StackedProjects.css';
import 'remixicon/fonts/remixicon.css';

const StackedProjects = ({ projects }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const containerTop = containerRef.current.offsetTop;
            const scrollPosition = window.scrollY - containerTop;
            const windowHeight = window.innerHeight;

            // Calculate which card should be active based on scroll position
            const cardHeight = windowHeight * 0.8; // Approximate card height
            const index = Math.floor(scrollPosition / cardHeight);
            const clampedIndex = Math.max(0, Math.min(index, projects.length - 1));

            setActiveIndex(clampedIndex);

            // Apply scale effect to cards
            cardRefs.current.forEach((card, i) => {
                if (!card) return;

                const cardTop = i * cardHeight;
                const cardProgress = (scrollPosition - cardTop) / cardHeight;

                // Calculate scale (cards above get smaller)
                if (cardProgress < 0) {
                    // Card hasn't been reached yet
                    card.style.transform = 'scale(1)';
                    card.style.opacity = '1';
                } else if (cardProgress > 1) {
                    // Card has been passed
                    const scale = Math.max(0.85, 1 - (cardProgress - 1) * 0.15);
                    card.style.transform = `scale(${scale})`;
                    card.style.opacity = Math.max(0.3, 1 - (cardProgress - 1) * 0.7);
                } else {
                    // Card is currently in view
                    card.style.transform = 'scale(1)';
                    card.style.opacity = '1';
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, [projects.length]);

    const scrollToCard = (index) => {
        const container = containerRef.current;
        if (!container) return;

        const containerTop = container.offsetTop;
        const windowHeight = window.innerHeight;
        const targetScroll = containerTop + (index * windowHeight * 0.8);

        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    };

    const getTechStack = (project) => {
        // Extract tech stack from project title/description (you can customize this)
        const techMap = {
            'SIMIT': ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
            'Model Klasifikasi': ['Python', 'KNN', 'OpenCV', 'Machine Learning'],
            'Waddle': ['Kotlin', 'Firebase', 'Android Studio'],
            'AfterSunset': ['Laravel', 'PHP', 'MySQL', 'Chart.js'],
            'Website Portofolio Masjid': ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
            'Website Personal': ['React', 'Vite', 'Tailwind CSS']
        };

        for (const [key, tech] of Object.entries(techMap)) {
            if (project.title.includes(key)) {
                return tech;
            }
        }
        return ['Web Development'];
    };

    const getCategory = (index) => {
        const categories = ['Web Application', 'Machine Learning', 'Mobile App', 'E-Commerce', 'Portfolio', 'Personal Project'];
        return categories[index % categories.length];
    };

    return (
        <div className="stacked-projects-container" ref={containerRef}>
            {/* Scroll Progress Indicator */}
            <div className="scroll-indicator">
                {projects.map((_, index) => (
                    <div
                        key={index}
                        className={`scroll-dot ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => scrollToCard(index)}
                        title={`Project ${index + 1}`}
                    />
                ))}
            </div>

            {/* Project Cards */}
            {projects.map((project, index) => (
                <div
                    key={project.id}
                    ref={(el) => (cardRefs.current[index] = el)}
                    className="project-card-stack"
                    style={{
                        zIndex: projects.length - index
                    }}
                >
                    <div className="project-card">
                        {/* Aurora Background Effect */}
                        <div className={`card-aurora card-aurora-${index % 3 === 0 ? 'blue' : index % 3 === 1 ? 'green' : 'purple'}`}></div>

                        {/* Large Index Number */}
                        <div className="project-index">0{index + 1}</div>

                        {/* Card Content */}
                        <div className="project-card-content">
                            {/* Image Section */}
                            <div className="project-image-section">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="project-image"
                                />
                                <div className="project-image-overlay"></div>
                            </div>

                            {/* Info Section */}
                            <div className="project-info-section">
                                <div className="project-category-badge">
                                    {getCategory(index)}
                                </div>

                                <h2 className="project-title">{project.title}</h2>

                                <p className="project-description">
                                    {project.fullDescription || project.subtitle}
                                </p>

                                {/* Tech Stack */}
                                <div className="tech-stack-container">
                                    {getTechStack(project).map((tech, i) => (
                                        <span key={i} className="tech-pill">{tech}</span>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="project-actions">
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-btn project-btn-primary"
                                    >
                                        <i className="ri-github-fill"></i>
                                        View on GitHub
                                    </a>
                                    <button
                                        className="project-btn project-btn-secondary"
                                        onClick={() => {
                                            // You can trigger modal or navigate to detail page
                                            window.open(project.detailImage, '_blank');
                                        }}
                                    >
                                        <i className="ri-eye-line"></i>
                                        Full Preview
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Spacer for last card */}
            <div style={{ height: '50vh' }}></div>
        </div>
    );
};

export default StackedProjects;
