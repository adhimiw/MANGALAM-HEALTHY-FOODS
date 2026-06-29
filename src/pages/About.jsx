import React from 'react';

export default function About({ setPage }) {
    return (
        <main className="about-page">
            <div className="container">
                
                {/* Brand Story narrative */}
                <div className="about-narrative">
                    <div className="narrative-content">
                        <span className="section-subtitle">OUR STORY</span>
                        <h2>From a Home Kitchen to Mangalam Health Foods</h2>
                        <p>
                            For more than <strong>20 years</strong>, <strong>Amutham Sprouted Health Mix</strong> was prepared only at home and shared with our family, neighbors, and relatives. Everyone enjoyed better health and energy from this traditional recipe.
                        </p>
                        <p>
                            In <strong>2019</strong>, the love and trust of our people encouraged us to take the next step. What began as a homemade mix became a small business, and our community proudly called us <strong>business women</strong>.
                        </p>
                        <p>
                            With all your blessings, our journey has now grown into <strong>Mangalam Health Foods Company</strong>, continuing the same tradition with care and honesty, bringing the health benefits of Amutham Sprouted Health Mix to more families.
                        </p>
                        <button onClick={() => setPage('shop')} className="btn btn-primary" style={{ marginTop: '20px' }}>
                            Explore Our Products
                        </button>
                    </div>
                    <div>
                        <img 
                            src="about_sprouts.png" 
                            alt="Mangalam Health Foods — Our Journey" 
                            style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-premium)', width: '100%' }}
                        />
                    </div>
                </div>

                {/* Product Lineup */}
                <div style={{ borderTop: '1px solid rgba(7, 56, 32, 0.08)', paddingTop: '60px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <span className="section-subtitle">OUR PRODUCTS</span>
                        <h2>Made with Tradition, Backed by Trust</h2>
                    </div>
                    
                    <div className="purity-grid" style={{ marginTop: '0' }}>
                        <div className="purity-card">
                            <h3>Amutham Sprouted Health Mix</h3>
                            <p>Our signature sprouted grain mix — prepared with traditional methods, 100% natural, no chemicals or preservatives. Rich in protein and high in fiber. Available in 300g and 500g packs.</p>
                        </div>

                        <div className="purity-card">
                            <h3>Mangalam Uluntham Mix</h3>
                            <p>Made with premium Mapillai Samba rice and traditional Uluntham (black gram). A wholesome traditional blend for daily nutrition. Available in 300g, 500g, and 1kg packs.</p>
                        </div>

                        <div className="purity-card">
                            <h3>Cookies, Bread & Rusks</h3>
                            <p>Amutham Sprouted Health Mix Cookies, Bread, and Rusks — bringing the goodness of sprouted grains to baked treats. Perfect for healthy snacking.</p>
                        </div>

                        <div className="purity-card">
                            <h3>Traditional Rice Varieties</h3>
                            <p>A wide range of our traditional rice varieties, sourced with care to preserve heritage grains and their unique nutritional profiles.</p>
                        </div>
                    </div>
                </div>

                {/* GST Details */}
                <div style={{ borderTop: '1px solid rgba(7, 56, 32, 0.08)', paddingTop: '40px', textAlign: 'center', marginTop: '60px' }}>
                    <div style={{ padding: '32px', backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-primary)', boxShadow: 'var(--shadow-premium)', display: 'inline-block' }}>
                        <span className="section-subtitle">REGISTRATION</span>
                        <h3 style={{ margin: '12px 0' }}>GSTIN: 33FDAPM8867B1ZI</h3>
                        <p style={{ color: '#646a66', fontSize: '0.95rem' }}>
                            FSSAI Registered · UDYAM Certified<br />
                            Mangalam Health Foods Company, Sethiyathope, Cuddalore District, Tamil Nadu
                        </p>
                    </div>
                </div>

            </div>
        </main>
    );
}
