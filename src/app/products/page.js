export const metadata = {
    title: 'Products | Anmol Graphics',
    description:
        'Explore our wide range of high-quality ID cards, RFID cards, badge holders, lanyards, and custom printing solutions.',
    alternates: {
        canonical: 'https://anmolgraphics.in/products',
    },
}

import ProductPageWrapper from '@/components/ProductsPage/ProductPageWrapper' // client wrapper

export default function Products() {
    return <ProductPageWrapper />
}