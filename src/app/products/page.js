export const metadata = {
    title: 'Products | Anmol Graphics',
    description:
        'Explore our wide range of high-quality ID cards, RFID cards, badge holders, lanyards, and custom printing solutions.',
    alternates: {
        canonical: 'https://anmolgraphics.in/products',
    },
}

import ProductPageWrapper from '@/components/ProductsPage/ProductPageWrapper' // client wrapper
import StructuredDataScript from '@/components/SEO/StructuredDataScript'



export default function Products() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Products",
        url: "https://anmolgraphics.in/products",
        description: metadata.description,
    }
    return <>
        <StructuredDataScript data={schema} />
        <ProductPageWrapper />
    </>
}