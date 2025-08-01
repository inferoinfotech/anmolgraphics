'use client'
import ContactBreadcrumbs from '@/components/ContactPage/ContactBreadcrumbs'
import ContactForm from '@/components/ContactPage/ContactForm'
import ContactUs from '@/components/ContactPage/ContactUs'
import WhyChooseUs from '@/components/HomePage/WhyChooseUs'
import React from 'react'

const Contact = () => {
    return (
        <>
            <div className="border-b">
                <ContactBreadcrumbs />
            </div>
            <WhyChooseUs />
            <ContactUs />
            <ContactForm />
        </>
    )
}

export default Contact