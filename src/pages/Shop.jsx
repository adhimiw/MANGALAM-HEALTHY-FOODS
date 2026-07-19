import { useState } from 'react';
import ProductShowcase from '../components/ProductShowcase';
import { clickable } from '../clickable';

const PRODUCTS = [
    {
        id: 'health-mix-300g',
        name: 'Amutham Sprouted Health Mix (300g)',
        category: 'Sprouted Millets & Grains',
        description: 'Our signature sprouted ancient grain mix. Crafted with Pearl Millet, Finger Millet, Sorghum, and legumes — hygienically processed and enriched with green cardamom. 100% natural, no chemicals or preservatives.',
        price: 110,
        inrPrice: '₹110',
        image: 'refence image/image.webp',
        badge: 'Flagship Pouch',
        tag: 'Starter'
    },
    {
        id: 'health-mix-500g',
        name: 'Amutham Sprouted Health Mix (500g)',
        category: 'Sprouted Millets & Grains',
        description: 'Our signature sprouted ancient grain mix in a larger family-size pack. High protein, high fiber, 100% natural — perfect for daily nutrition.',
        price: 160,
        inrPrice: '₹160',
        image: 'refence image/image.webp',
        badge: 'Family Pack',
        tag: 'Family'
    },
    {
        id: 'uluntham-300g',
        name: 'Mangalam Uluntham Mix (300g)',
        category: 'Traditional Uluntham Mix',
        description: 'Made with premium Mapillai Samba rice and traditional Uluntham (black gram). A wholesome traditional blend for daily nutrition.',
        price: 115,
        inrPrice: '₹115',
        image: 'refence image/image.webp',
        badge: 'Traditional Special',
        tag: 'Starter'
    },
    {
        id: 'uluntham-500g',
        name: 'Mangalam Uluntham Mix (500g)',
        category: 'Traditional Uluntham Mix',
        description: 'Made with premium Mapillai Samba rice and traditional Uluntham (black gram). A wholesome traditional blend for daily nutrition — family size.',
        price: 180,
        inrPrice: '₹180',
        image: 'refence image/image.webp',
        badge: 'Traditional Special',
        tag: 'Family'
    },
    {
        id: 'uluntham-1kg',
        name: 'Mangalam Uluntham Mix (1kg)',
        category: 'Traditional Uluntham Mix',
        description: 'Made with premium Mapillai Samba rice and traditional Uluntham (black gram). Best value bulk pack for the whole family.',
        price: 350,
        inrPrice: '₹350',
        image: 'refence image/image.webp',
        badge: 'Best Value',
        tag: 'Premium'
    }
];

const EMPTY = []; // stable default so it doesn't break child memoization

export default function Shop({ products = EMPTY, onProductView, onAddToCart }) {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const activeProducts = products.length > 0 ? products : PRODUCTS;

    const filteredProducts = selectedCategory === 'All'
        ? activeProducts
        : activeProducts.filter(p => p.tag === selectedCategory);

    return (
        <main className="shop-page">
            <div className="container">
                
                {/* Shop Header */}
                <div style={{ marginBottom: '60px', textAlign: 'center' }}>
                    <span className="section-subtitle">THE COLLECTION</span>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Our Sprouted Products</h1>
                    <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', color: '#646a66' }}>
                        Rich in protein, vitamins, essential minerals, and dietary fibers. 100% natural, no chemicals or preservatives. Certified sprouted nutrition.
                    </p>
                </div>
            </div>

            {/* Signature Range — animated product showcase */}
            <ProductShowcase products={products} onProductView={onProductView} onAddToCart={onAddToCart} />

            <div className="container">

                {/* Filter Bar */}
                <div className="shop-filter-bar">
                    <div className="shop-categories">
                        <button type="button" 
                            className={`filter-chip ${selectedCategory === 'All' ? 'active' : ''}`}
                            onClick={() => setSelectedCategory('All')}
                        >
                            All Products
                        </button>
                        <button type="button" 
                            className={`filter-chip ${selectedCategory === 'Starter' ? 'active' : ''}`}
                            onClick={() => setSelectedCategory('Starter')}
                        >
                            Starter Packs
                        </button>
                        <button type="button" 
                            className={`filter-chip ${selectedCategory === 'Family' ? 'active' : ''}`}
                            onClick={() => setSelectedCategory('Family')}
                        >
                            Family Packs
                        </button>
                        <button type="button" 
                            className={`filter-chip ${selectedCategory === 'Premium' ? 'active' : ''}`}
                            onClick={() => setSelectedCategory('Premium')}
                        >
                            Bulk Value
                        </button>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#646a66', fontWeight: 600 }}>
                        Showing {filteredProducts.length} products
                    </div>
                </div>

                {/* Products Grid */}
                <div className="shop-grid">
                    {filteredProducts.map(product => (
                        <div className="product-card" key={product.id}>
                            <div
                                className="product-card-image-wrap"
                                {...clickable(() => onProductView(product.id))}
                            >
                                {product.badge && (
                                    <span className="product-card-badge">{product.badge}</span>
                                )}
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-card-image"
                                    loading="lazy"
                                    decoding="async"
                                    style={product.imageStyle || {}}
                                />
                            </div>
                            
                            <div className="product-card-info">
                                <span className="product-card-category">{product.category}</span>
                                <h3
                                    className="product-card-title"
                                    {...clickable(() => onProductView(product.id))}
                                >
                                    {product.name}
                                </h3>
                                <p className="product-card-desc">{product.description}</p>
                                
                                <div className="product-card-footer">
                                    <span className="product-card-price">
                                        {product.inrPrice}
                                    </span>
                                    <button type="button" 
                                        className="btn btn-secondary product-card-btn"
                                        onClick={() => onAddToCart(product.id, product.name, product.price, 'one-time')}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </main>
    );
}
export { PRODUCTS };
