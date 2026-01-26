import React from 'react';
import ShinyText from "../ShinyText/ShinyText";
import { listCertifications } from "../../data";

const Certifications = () => {
    return (
        <section id="certifications" className="mt-32">
            <div className="flex flex-col items-center mb-12">
                <h1 className="text-4xl font-bold mb-4 text-center" data-aos="fade-up">
                    Licenses & Certifications
                </h1>
                <p className="text-base text-center opacity-50 max-w-2xl" data-aos="fade-up" data-aos-delay="200">
                    Sertifikasi profesional dan akademik yang telah saya selesaikan untuk memvalidasi keahlian teknis.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {listCertifications.map((cert) => (
                    <div
                        key={cert.id}
                        data-aos="fade-up"
                        data-aos-delay={cert.delay}
                        className="group relative bg-[#111111] border border-zinc-800 rounded-2xl p-6 hover:border-violet-500/50 transition-all duration-300 hover:bg-[#151515] flex flex-col sm:flex-row gap-6 shadow-lg hover:shadow-violet-500/10"
                    >
                        {/* Logo Provider */}
                        <div className="flex-shrink-0 w-16 h-16 bg-white rounded-lg p-1 flex items-center justify-center">
                            <img
                                src={cert.logo}
                                alt={`${cert.issuer} logo`}
                                className="w-full h-full object-contain"
                                width="48"
                                height="48"
                                loading="lazy"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-violet-400 transition-colors">
                                {cert.title}
                            </h3>
                            <p className="text-sm text-zinc-400 mb-2">{cert.issuer}</p>
                            <p className="text-xs text-zinc-500 mb-3 block">{cert.date}</p>

                            {/* Skills Badges */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {cert.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="text-[10px] px-2 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            {/* Action Button */}
                            <a
                                href={cert.credentialLink}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-zinc-700 bg-zinc-800 px-4 py-2 rounded-lg hover:bg-zinc-700 transition"
                            >
                                <ShinyText text="Show Credential" disabled={false} speed={3} className="custom-class" />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Certifications;
