'use client'
import { useState, useEffect } from 'react'
import ProBreadcrumbs from './ProBreadcurmbs'
import Productlist from './Productlist'

export default function ProductPageWrapper() {
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setSearchTerm('') // fix hydration mismatch
  }, [])

  return (
    <div className="bg-white">
      <div className="border-b">
        <ProBreadcrumbs searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <Productlist searchTerm={searchTerm} />
    </div>
  )
}
