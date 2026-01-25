import { Helmet, HelmetProvider } from 'react-helmet-async';

const SEO = ({
    title = "Muhammad Ghalib Pradipa - Software Engineer & Web Developer",
    description = "Muhammad Ghalib Pradipa adalah Software Engineer dan Web Developer dari Indonesia. Mahasiswa Teknik Informatika UIN Sultan Syarif Kasim Riau dengan fokus pada Web Development, Backend Systems, REST APIs, Machine Learning, dan GIS Applications.",
    keywords = "Muhammad Ghalib Pradipa, Software Engineer, Web Developer, Teknik Informatika, UIN Suska Riau, Backend Developer, REST API, Machine Learning, GIS, Pekanbaru, Indonesia",
    author = "Muhammad Ghalib Pradipa",
    url = "https://leebsite.vercel.app",
    image = "https://leebsite.vercel.app/assets/preview.jpg",
    type = "website"
}) => {
    // Structured Data - Person Schema
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Muhammad Ghalib Pradipa",
        "givenName": "Muhammad Ghalib",
        "familyName": "Pradipa",
        "birthDate": "2004-04-11",
        "birthPlace": {
            "@type": "Place",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Pekanbaru",
                "addressCountry": "ID"
            }
        },
        "nationality": {
            "@type": "Country",
            "name": "Indonesia"
        },
        "jobTitle": "Software Engineer",
        "description": "Software Engineer dan Web Developer dengan fokus pada Backend Systems, REST APIs, Database Design, Machine Learning, dan Geographic Information Systems (GIS)",
        "url": url,
        "image": image,
        "email": "mhd.ghalibpradipa@gmail.com",
        "alumniOf": {
            "@type": "CollegeOrUniversity",
            "name": "UIN Sultan Syarif Kasim Riau",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Pekanbaru",
                "addressRegion": "Riau",
                "addressCountry": "ID"
            }
        },
        "worksFor": {
            "@type": "Organization",
            "name": "PT Kilang Pertamina Internasional RU II Dumai",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Dumai",
                "addressRegion": "Riau",
                "addressCountry": "ID"
            }
        },
        "memberOf": {
            "@type": "Organization",
            "name": "HIMATIF UIN Suska Riau",
            "description": "Himpunan Mahasiswa Teknik Informatika",
            "memberOf": "UIN Sultan Syarif Kasim Riau"
        },
        "hasOccupation": {
            "@type": "Occupation",
            "name": "Software Engineer",
            "occupationLocation": {
                "@type": "Country",
                "name": "Indonesia"
            },
            "skills": [
                "Web Development",
                "Backend Systems",
                "REST APIs",
                "Database Design",
                "Data Analysis",
                "Machine Learning",
                "Geographic Information Systems (GIS)",
                "JavaScript",
                "Python",
                "React",
                "Node.js",
                "PostgreSQL",
                "Docker",
                "FastAPI",
                "Laravel"
            ]
        },
        "knowsAbout": [
            "Web Development",
            "Backend Engineering",
            "REST API Development",
            "Database Design",
            "Machine Learning",
            "Data Analysis",
            "Geographic Information Systems",
            "Software Architecture",
            "Cloud Computing"
        ],
        "sameAs": [
            "https://github.com/LeebSite",
            "https://www.linkedin.com/in/ghalibpradipaa",
            "https://www.instagram.com/gpradiipaa"
        ]
    };

    // Breadcrumb Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": url
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "About",
                "item": `${url}#about`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Projects",
                "item": `${url}#project`
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": "Contact",
                "item": `${url}#contact`
            }
        ]
    };

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <meta name="robots" content="index, follow" />
            <meta name="language" content="Indonesian" />
            <meta name="revisit-after" content="7 days" />

            {/* Canonical URL */}
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="LeebSite - Muhammad Ghalib Pradipa" />
            <meta property="og:locale" content="id_ID" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
            <meta property="twitter:creator" content="@gpradiipaa" />

            {/* Geo Tags */}
            <meta name="geo.region" content="ID-RI" />
            <meta name="geo.placename" content="Pekanbaru, Riau, Indonesia" />
            <meta name="geo.position" content="0.5071;101.4478" />
            <meta name="ICBM" content="0.5071, 101.4478" />

            {/* Additional SEO */}
            <meta name="rating" content="General" />
            <meta name="distribution" content="global" />
            <meta name="coverage" content="Worldwide" />
            <meta name="target" content="all" />
            <meta name="HandheldFriendly" content="True" />
            <meta name="MobileOptimized" content="320" />

            {/* Structured Data - JSON-LD */}
            <script type="application/ld+json">
                {JSON.stringify(personSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(breadcrumbSchema)}
            </script>
        </Helmet>
    );
};

// Export HelmetProvider for use in main App
export { HelmetProvider };
export default SEO;
