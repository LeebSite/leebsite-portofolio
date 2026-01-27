import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './StackedProjects.css';
import 'remixicon/fonts/remixicon.css';

const Card = ({ project, index, progress, range, targetScale }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    const getTechStack = (project) => {
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
        <div ref={container} className="card-container">
            <motion.div
                className="card"
                style={{
                    scale,
                    top: `calc(-5% + ${index * 25}px)`
                }}
            >
                {/* Aurora Background */}
                <div className={`card-aurora card-aurora-${index % 3 === 0 ? 'blue' : index % 3 === 1 ? 'green' : 'purple'}`}></div>

                {/* Index Number */}
                <div className="project-index">0{index + 1}</div>

                {/* Card Content */}
                <div className="project-card-content">
                    {/* Image Section */}
                    <motion.div className="project-image-section" style={{ scale: imageScale }}>
                        <img
                            src={project.image}
                            alt={project.title}
                            className="project-image"
                        />
                        <div className="project-image-overlay"></div>
                    </motion.div>

                    {/* Info Section */}
                    <div className="project-info-section">
                        <div className="project-category-badge">
                            {getCategory(index)}
                        </div>

                        <h2 className="project-title">{project.title}</h2>

                        <p className="project-description">
                            {project.fullDescription || project.subtitle}
                        </p>

                        <div className="tech-stack-container">
                            {getTechStack(project).map((tech, i) => (
                                <span key={i} className="tech-pill">{tech}</span>
                            ))}
                        </div>

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
                                onClick={() => window.open(project.detailImage, '_blank')}
                            >
                                <i className="ri-eye-line"></i>
                                Full Preview
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const StackedProjects = ({ projects }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    return (
        <div ref={container} className="stacked-projects-container">
            {projects.map((project, index) => {
                const targetScale = 1 - ((projects.length - index) * 0.05);
                return (
                    <Card
                        key={project.id}
                        project={project}
                        index={index}
                        progress={scrollYProgress}
                        range={[index * 0.25, 1]}
                        targetScale={targetScale}
                    />
                );
            })}
        </div>
    );
};

export default StackedProjects;
