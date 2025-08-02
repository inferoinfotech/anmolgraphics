import About from '@/components/AboutUsPage/About'
import AboutBreadcrumbs from '@/components/AboutUsPage/AboutBreadcrumbs'
import React from 'react'

export const metadata = {
    title: 'About Us | Anmol Graphics',
    description:
        'Learn more about Anmol Graphics – leading manufacturers of School ID Cards, Company ID Cards, RFID solutions, and more.',
    alternates: {
        canonical: 'https://anmolgraphics.in/about',
    },
}


const about = () => {
    return (
        <>
            <div className="border-b">
                <AboutBreadcrumbs />
            </div>
            <About />
        </>
    )
}

export default about