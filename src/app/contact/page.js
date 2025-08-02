import ContactBreadcrumbs from '@/components/ContactPage/ContactBreadcrumbs'
import ContactForm from '@/components/ContactPage/ContactForm'
import ContactUs from '@/components/ContactPage/ContactUs'
import WhyChooseUs from '@/components/HomePage/WhyChooseUs'
import React from 'react'

export const metadata = {
    title: 'Contact Us | Anmol Graphics',
    description:
        'Get in touch with Anmol Graphics. We offer ID cards, lanyards, badges, and printing services across 14+ states in India.',
    alternates: {
        canonical: 'https://anmolgraphics.in/contact',
    },
}


const Contact = () => {
    return (
        <>
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