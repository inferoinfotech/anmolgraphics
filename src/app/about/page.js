import About from '@/components/AboutUsPage/About'
import AboutBreadcrumbs from '@/components/AboutUsPage/AboutBreadcrumbs'
import StructuredDataScript from '@/components/SEO/StructuredDataScript'
import React from 'react'

export const metadata = {
    title: 'About Us | Anmol Graphics',
    description:
        'Learn more about Anmol Graphics – leading manufacturers of School ID Cards, Company ID Cards, RFID solutions, and more.',
    alternates: {
        canonical: 'https://anmolgraphics.in/about',
    },
}

const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "About Us",
    "url": "https://anmolgraphics.in/about",
    "description":
        "Learn more about Anmol Graphics – leading manufacturers of School ID Cards, Company ID Cards, RFID solutions, and more."
};

const about = () => {
    return (
        <>
            <StructuredDataScript data={aboutSchema} />
            <div className="border-b">
                <AboutBreadcrumbs />
            </div>
            <About />
        </>
    )
}

export default about