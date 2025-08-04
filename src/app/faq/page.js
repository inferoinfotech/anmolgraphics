import Faq from '@/components/FaqPage/Faq'
import FaqBreadcrumbs from '@/components/FaqPage/FaqBreadcrumbs'
import StructuredDataScript from '@/components/SEO/StructuredDataScript'
import React from 'react'

export const metadata = {
    title: 'FAQs | Anmol Graphics',
    description:
        'Find answers to frequently asked questions about our ID card printing services, delivery, customization, and more.',
    alternates: {
        canonical: 'https://anmolgraphics.in/faq',
    },
}

const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: "FAQs",
    url: "https://anmolgraphics.in/faq",
    description: metadata.description,
}

const faq = () => {
    return (
        <>
            <StructuredDataScript data={schema} />
            <div className="border-b">
                <FaqBreadcrumbs />
            </div>
            <Faq />
        </>
    )
}

export default faq