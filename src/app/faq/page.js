import Faq from '@/components/FaqPage/Faq'
import FaqBreadcrumbs from '@/components/FaqPage/FaqBreadcrumbs'
import React from 'react'

const faq = () => {
    return (
        <>
            <div className="border-b">
                <FaqBreadcrumbs />
            </div>
            <Faq />
        </>
    )
}

export default faq