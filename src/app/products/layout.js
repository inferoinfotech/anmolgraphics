export default function ProductsLayout({ children }) {
    return (
        <div className="mx-auto">
            {children} {/* This will render either the products list or individual product page */}
        </div>
    );
}
