import About from '@/components/AboutUsPage/About'
import AboutBreadcrumbs from '@/components/AboutUsPage/AboutBreadcrumbs'
import React from 'react'

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