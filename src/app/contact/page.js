import ContactBreadcrumbs from '@/components/ContactPage/ContactBreadcrumbs'
import ContactForm from '@/components/ContactPage/ContactForm'
import ContactUs from '@/components/ContactPage/ContactUs'
import WhyChooseUs from '@/components/HomePage/WhyChooseUs'
import StructuredDataScript from '@/components/SEO/StructuredDataScript'
import React from 'react'

export const metadata = {
    title: 'Contact Us | Anmol Graphics',
    description:
        'Get in touch with Anmol Graphics. We offer ID cards, lanyards, badges, and printing services across 14+ states in India.',
    alternates: {
        canonical: 'https://anmolgraphics.in/contact',
    },
}

const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "telephone": "+91-9724259889",
    name: "Contact Us",
    url: "https://anmolgraphics.in/contact",
    description: metadata.description,
}

const Contact = () => {
    return (
        <>
            <StructuredDataScript data={schema} />
            <div className="border-b">
                <ContactBreadcrumbs />
            </div>
            <ContactForm />
            <ContactUs />
            <WhyChooseUs />
        </>
    )
}

export default Contact