import { useState } from 'react';
import LuxuryHero from '../components/LuxuryHero';
import { LuxuryShowcase, BrandValues, BrandStory } from '../components/PremiumSections';
import { clickable } from '../clickable';

const trustBadgeTextStyle = { fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' };
const trustBadgeItemStyle = { display: 'flex', alignItems: 'center', gap: '10px' };
const trustBadgeIconStyle = { color: 'var(--color-primary)', flexShrink: 0 };

function TrustBar() {
    return (
        <section style={{ background: 'var(--color-primary-light)', padding: '24px 0', borderBottom: '1px solid rgba(7, 56, 32, 0.05)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
                <div style={trustBadgeItemStyle}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={trustBadgeIconStyle}>
                        <path d="M12 22V11" />
                        <path d="M12 11C12 7 9 4 4 4c0 5 3 7 8 7Z" />
                        <path d="M12 9c0-3 3-6 8-6 0 4-3 6-8 6Z" />
                    </svg>
                    <span style={trustBadgeTextStyle}>100% Sprout-Activated</span>
                </div>
                <div style={trustBadgeItemStyle}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={trustBadgeIconStyle}>
                        <circle cx="12" cy="12" r="9" />
                        <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" />
                    </svg>
                    <span style={trustBadgeTextStyle}>No Chemicals / Preservatives</span>
                </div>
                <div style={trustBadgeItemStyle}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={trustBadgeIconStyle}>
                        <rect x="1" y="6" width="13" height="9" rx="1" />
                        <path d="M14 9h3.5L21 12.5V15h-7z" />
                        <circle cx="5" cy="17.5" r="1.7" />
                        <circle cx="16.5" cy="17.5" r="1.7" />
                    </svg>
                    <span style={trustBadgeTextStyle}>All Over India Delivery</span>
                </div>
                <div style={trustBadgeItemStyle}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={trustBadgeIconStyle}>
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <polyline points="9 12 11 14 15 10" />
                    </svg>
                    <span style={trustBadgeTextStyle}>FSSAI & UDYAM Certified</span>
                </div>
            </div>
        </section>
    );
}

function FeaturesSection() {
    return (
        <section className="features-section" id="why-choose-mangalam" style={{ padding: '80px 0', margin: '0' }}>
            <div className="container">
                <div className="section-header">
                    <span className="section-subtitle">WHY CHOOSE US</span>
                    <h2 className="section-title">Our Traditional Taste, Your Family's Health</h2>
                    <p className="section-description">Health begins in our kitchen — no chemicals, no preservatives. Our grain mix is 100% natural, prepared with traditional methods that preserve real nutritious values. Rich in protein and high in fiber.</p>
                </div>

                <div className="features-grid">
                    <div className="feature-item">
                        <div className="feature-icon-wrapper">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                        </div>
                        <div className="feature-text">
                            <h3>100% Natural & Chemical-Free</h3>
                            <p>No chemicals, no preservatives. Every grain blend is 100% natural, bringing you the goodness of traditional nutrition.</p>
                        </div>
                    </div>

                    <div className="feature-item">
                        <div className="feature-icon-wrapper">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </div>
                        <div className="feature-text">
                            <h3>Rich in Protein & High Fiber</h3>
                            <p>Our sprouted grain mixes deliver high protein content and dietary fiber, supporting strength, energy, and wellness every day.</p>
                        </div>
                    </div>

                    <div className="feature-item">
                        <div className="feature-icon-wrapper">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                        </div>
                        <div className="feature-text">
                            <h3>Registered Certification</h3>
                            <p>Fully certified with FSSAI (No: 12423028000746) and UDYAM-TN-04-0125789. GSTIN: 33FDAPM8867B1ZI for purity assurance.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function PurchaseOption({ active, onSelect, title, subtitle, price, note }) {
    return (
        <div
            className={`purchase-option-card ${active ? 'active' : ''}`}
            {...clickable(onSelect)}
            style={{ padding: '12px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderRadius: '12px', border: active ? '2px solid var(--color-primary)' : '1px solid rgba(7, 56, 32, 0.08)', background: '#fff' }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: active ? '5px solid var(--color-primary)' : '2px solid var(--color-accent-gold)', boxSizing: 'border-box' }}></div>
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-primary)' }}>{title}</span>
                    <span style={{ fontSize: '0.75rem', color: '#646a66' }}>{subtitle}</span>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textAlign: 'right' }}>
                <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-primary)' }}>₹{price}</span>
                {note && <span style={{ fontSize: '0.75rem', color: '#646a66' }}>{note}</span>}
            </div>
        </div>
    );
}

function PurchaseOptions({ purchaseOption, setPurchaseOption, subPrice, oneTimePrice, note }) {
    return (
        <div className="purchase-options" style={{ marginBottom: '24px', width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <PurchaseOption
                active={purchaseOption === 'subscribe'}
                onSelect={() => setPurchaseOption('subscribe')}
                title="Subscribe & Save 10%"
                subtitle="Monthly delivery"
                price={subPrice}
                note={note}
            />
            <PurchaseOption
                active={purchaseOption === 'one-time'}
                onSelect={() => setPurchaseOption('one-time')}
                title="One-Time Purchase"
                subtitle="Single shipment"
                price={oneTimePrice}
                note={note}
            />
        </div>
    );
}

function ContactSection() {
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactMessage, setContactMessage] = useState('');
    const [contactSubmitted, setContactSubmitted] = useState(false);

    const handleContactSubmit = (e) => {
        e.preventDefault();
        if (contactName && contactEmail && contactMessage) {
            setContactSubmitted(true);
        }
    };

    return (
        <section className="newsletter-section" id="get-in-touch" style={{ padding: '80px 0' }}>
            <div className="container contact-grid">

                {/* Left: Contact Info details */}
                <div style={{ textAlign: 'left' }}>
                    <span className="section-subtitle">GET IN TOUCH</span>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>Connect with Us</h2>
                    <p style={{ marginBottom: '32px', fontSize: '1.05rem', color: '#646a66' }}>
                        We serve with love and transparency. Have questions about our sprouted blends, delivery schedules, or bulk ordering? We'd love to hear from you.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                            <div className="feature-icon-wrapper" style={{ width: '40px', height: '40px' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                            </div>
                            <div>
                                <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-primary)' }}>Phone Helpline</h4>
                                <p style={{ fontSize: '0.85rem' }}>+91 7094074655</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                            <div className="feature-icon-wrapper" style={{ width: '40px', height: '40px' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </div>
                            <div>
                                <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-primary)' }}>Email Address</h4>
                                <p style={{ fontSize: '0.85rem' }}>mangalamhealthyfood@zohomail.in</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                            <div className="feature-icon-wrapper" style={{ width: '40px', height: '40px' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                            </div>
                            <div>
                                <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-primary)' }}>Factory Address</h4>
                                <p style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
                                    No-18, Mettu st, Sethiyathope,<br />
                                    Bhuvanagiri taluk, Cuddalore District,<br />
                                    Tamil Nadu, India - 608702.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Contact Form */}
                <div className="newsletter-wrapper" style={{ width: '100%', padding: '40px', textAlign: 'left' }}>
                    <h3 style={{ fontSize: '1.75rem', marginBottom: '20px' }}>Send us a Message</h3>

                    {!contactSubmitted ? (
                        <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label htmlFor="contact-name" style={{ fontSize: '0.8rem', fontWeight: 600 }}>Your Name</label>
                                <input
                                    id="contact-name"
                                    type="text"
                                    required
                                    className="newsletter-input"
                                    style={{ borderRadius: 'var(--radius-md)', width: '100%', border: '1px solid rgba(7, 56, 32, 0.1)' }}
                                    value={contactName}
                                    onChange={(e) => setContactName(e.target.value)}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label htmlFor="contact-email" style={{ fontSize: '0.8rem', fontWeight: 600 }}>Email Address</label>
                                <input
                                    id="contact-email"
                                    type="email"
                                    required
                                    className="newsletter-input"
                                    style={{ borderRadius: 'var(--radius-md)', width: '100%', border: '1px solid rgba(7, 56, 32, 0.1)' }}
                                    value={contactEmail}
                                    onChange={(e) => setContactEmail(e.target.value)}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label htmlFor="contact-message" style={{ fontSize: '0.8rem', fontWeight: 600 }}>Message</label>
                                <textarea
                                    id="contact-message"
                                    required
                                    rows="4"
                                    className="newsletter-input"
                                    style={{ borderRadius: 'var(--radius-md)', width: '100%', border: '1px solid rgba(7, 56, 32, 0.1)', minHeight: '100px', resize: 'vertical', fontFamily: 'inherit' }}
                                    value={contactMessage}
                                    onChange={(e) => setContactMessage(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '12px 24px' }}>
                                Send Message
                            </button>
                        </form>
                    ) : (
                        <div className="newsletter-success" style={{ margin: '0', display: 'block' }}>
                            Thank you, {contactName}! Your message has been dispatched successfully. We'll be in touch shortly.
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}

export default function Home({ setPage, onProductView, onAddToCart, products = [] }) {
    const [activeTab, setActiveTab] = useState('health300');
    const [ulunthamSize, setUlunthamSize] = useState('300g');
    const [purchaseOption, setPurchaseOption] = useState('one-time');

    // Dynamic pricing helper from backend products
    const getProductPrice = (id, defaultPrice) => {
        const found = products.find(p => p.id === id);
        return found ? parseFloat(found.price) : defaultPrice;
    };

    const priceHealth300 = getProductPrice('health-mix-300g', 110);
    const subPriceHealth300 = Math.round(priceHealth300 * 0.9);

    const priceHealth500 = getProductPrice('health-mix-500g', 160);
    const subPriceHealth500 = Math.round(priceHealth500 * 0.9);

    const priceUluntham300 = getProductPrice('uluntham-300g', 115);
    const subPriceUluntham300 = Math.round(priceUluntham300 * 0.9);

    const priceUluntham500 = getProductPrice('uluntham-500g', 180);
    const subPriceUluntham500 = Math.round(priceUluntham500 * 0.9);

    const priceUluntham1kg = getProductPrice('uluntham-1kg', 350);
    const subPriceUluntham1kg = Math.round(priceUluntham1kg * 0.9);

    const pricing = {
        health300: { inr: priceHealth300, subInr: subPriceHealth300 },
        health500: { inr: priceHealth500, subInr: subPriceHealth500 },
        uluntham: {
            '300g': { inr: priceUluntham300, subInr: subPriceUluntham300 },
            '500g': { inr: priceUluntham500, subInr: subPriceUluntham500 },
            '1kg': { inr: priceUluntham1kg, subInr: subPriceUluntham1kg },
        }
    };

    const ulunthamPrice = purchaseOption === 'subscribe' ? pricing.uluntham[ulunthamSize].subInr : pricing.uluntham[ulunthamSize].inr;

    return (
        <main style={{ width: '100%' }}>

            {/* Luxury hero with animated CardSwap banners */}
            <LuxuryHero setPage={setPage} />

            {/* Trust Badges Bar */}
            <TrustBar />

            {/* Luxury Podium Showcase — high-end product moment */}
            <LuxuryShowcase onProductView={onProductView} onAddToCart={onAddToCart} />

            {/* Brand Story — scroll storytelling */}
            <BrandStory setPage={setPage} />

            {/* Section 2: Why Choose Mangalam? (Sprout Bioavailability & Nutrition) */}
            <FeaturesSection />

            {/* Premium Brand Values */}
            <BrandValues />

            {/* Section 3: Our Products (Interactive Tab Showcase) */}
            <section className="rituals-section" id="our-products" style={{ background: 'var(--bg-glass)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderTop: '1px solid rgba(255, 255, 255, 0.25)', borderBottom: '1px solid rgba(255, 255, 255, 0.25)' }}>
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">OUR PRODUCTS</span>
                        <h2 className="section-title">Amutham Sprouted Health Mix</h2>
                        <p className="section-description">Available in various sizes to fit your family's needs. Formulated with sprouted grains, legumes, and aromatic cardamom.</p>
                    </div>

                    <div className="tabs-nav">
                        <button type="button"
                            className={`tab-btn ${activeTab === 'health300' ? 'active' : ''}`}
                            onClick={() => { setActiveTab('health300'); setPurchaseOption('one-time'); }}
                        >
                            300g Starter Pouch
                        </button>
                        <button type="button"
                            className={`tab-btn ${activeTab === 'health500' ? 'active' : ''}`}
                            onClick={() => { setActiveTab('health500'); setPurchaseOption('one-time'); }}
                        >
                            500g Family Pack
                        </button>
                        <button type="button"
                            className={`tab-btn ${activeTab === 'uluntham' ? 'active' : ''}`}
                            onClick={() => { setActiveTab('uluntham'); setPurchaseOption('one-time'); }}
                        >
                            Mangalam Uluntham Mix
                        </button>
                    </div>

                    <div className="tabs-content">
                        {activeTab === 'health300' && (
                            <div className="tab-panel">
                                <div className="panel-grid">
                                    <div className="panel-image-container">
                                        <img src="refence image/image.webp" alt="Amutham Sprouted Health Mix 300g Pouch" className="panel-image" loading="lazy" decoding="async" {...clickable(() => onProductView('health-mix-300g'))} style={{ cursor: 'pointer' }} />
                                    </div>
                                    <div className="panel-details">
                                        <div className="panel-badge">Flagship Product</div>
                                        <h3 {...clickable(() => onProductView('health-mix-300g'))} style={{ cursor: 'pointer' }}>Amutham Sprouted Health Mix (300g)</h3>
                                        <p className="panel-lead">The perfect trial size pouch. High-protein sprouted ancient grain formulation — no chemicals, no preservatives, 100% natural.</p>

                                        <div className="benefits-checklist" style={{ marginBottom: '24px' }}>
                                            <div className="benefit-item">
                                                <svg className="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                                <span>Contains Finger Millet, Pearl Millet, Sorghum, and legumes — all sprout-activated.</span>
                                            </div>
                                            <div className="benefit-item">
                                                <svg className="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                                <span>Bilingual Tamil/English preparation method printed on back.</span>
                                            </div>
                                        </div>

                                        <div className="panel-ingredients-tag" style={{ borderTop: '1px solid rgba(7, 56, 32, 0.08)', paddingTop: '15px', marginBottom: '20px' }}>
                                            <strong>Ingredients:</strong> Pearl Millet, Finger Millet, Sorghum, Bengal Gram, Black Gram, Green Gram, Wheat, Roasted Gram, Cardamom.
                                        </div>

                                        <PurchaseOptions
                                            purchaseOption={purchaseOption}
                                            setPurchaseOption={setPurchaseOption}
                                            subPrice={pricing.health300.subInr}
                                            oneTimePrice={pricing.health300.inr}
                                        />

                                        <div className="panel-purchase-block" style={{ display: 'block' }}>
                                            <button type="button"
                                                className="btn btn-primary add-to-cart-btn"
                                                onClick={() => onAddToCart('health-mix-300g', 'Amutham Sprouted Health Mix (300g)', purchaseOption === 'subscribe' ? pricing.health300.subInr : pricing.health300.inr, purchaseOption, 1)}
                                                style={{ width: '100%', maxWidth: '420px', padding: '16px 24px' }}
                                            >
                                                Add to Cart — ₹{purchaseOption === 'subscribe' ? pricing.health300.subInr : pricing.health300.inr}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'health500' && (
                            <div className="tab-panel">
                                <div className="panel-grid">
                                    <div className="panel-image-container">
                                        <img src="refence image/image.webp" alt="Amutham Sprouted Health Mix 500g Family Pack" className="panel-image" loading="lazy" decoding="async" style={{ cursor: 'pointer' }} {...clickable(() => onProductView('health-mix-500g'))} />
                                    </div>
                                    <div className="panel-details">
                                        <div className="panel-badge">Family Pack</div>
                                        <h3 {...clickable(() => onProductView('health-mix-500g'))} style={{ cursor: 'pointer' }}>Amutham Sprouted Health Mix (500g)</h3>
                                        <p className="panel-lead">Sustain the health of your entire family with our larger pack. High fiber, nutrient dense, 100% natural.</p>

                                        <div className="benefits-checklist" style={{ marginBottom: '24px' }}>
                                            <div className="benefit-item">
                                                <svg className="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                                <span>Best value for daily family porridge routines.</span>
                                            </div>
                                            <div className="benefit-item">
                                                <svg className="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                                <span>Pack maintained at peak freshness for longer use.</span>
                                            </div>
                                        </div>

                                        <div className="panel-ingredients-tag" style={{ borderTop: '1px solid rgba(7, 56, 32, 0.08)', paddingTop: '15px', marginBottom: '20px' }}>
                                            <strong>Ingredients:</strong> Pearl Millet, Finger Millet, Sorghum, Bengal Gram, Black Gram, Green Gram, Wheat, Roasted Gram, Cardamom.
                                        </div>

                                        <PurchaseOptions
                                            purchaseOption={purchaseOption}
                                            setPurchaseOption={setPurchaseOption}
                                            subPrice={pricing.health500.subInr}
                                            oneTimePrice={pricing.health500.inr}
                                            note="+ courier"
                                        />

                                        <div className="panel-purchase-block" style={{ display: 'block' }}>
                                            <button type="button"
                                                className="btn btn-primary add-to-cart-btn"
                                                onClick={() => onAddToCart('health-mix-500g', 'Amutham Sprouted Health Mix (500g)', purchaseOption === 'subscribe' ? pricing.health500.subInr : pricing.health500.inr, purchaseOption, 1)}
                                                style={{ width: '100%', maxWidth: '420px', padding: '16px 24px' }}
                                            >
                                                Add to Cart — ₹{purchaseOption === 'subscribe' ? pricing.health500.subInr : pricing.health500.inr}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'uluntham' && (
                            <div className="tab-panel">
                                <div className="panel-grid">
                                    <div className="panel-image-container">
                                        <img src="refence image/image.webp" alt="Mangalam Uluntham Mix" className="panel-image" loading="lazy" decoding="async" style={{ cursor: 'pointer' }} {...clickable(() => onProductView('uluntham-500g'))} />
                                    </div>
                                    <div className="panel-details">
                                        <div className="panel-badge">Traditional Special</div>
                                        <h3 {...clickable(() => onProductView('uluntham-500g'))} style={{ cursor: 'pointer' }}>Mangalam Uluntham Mix (with Mapillai Samba Rice)</h3>
                                        <p className="panel-lead">Our traditional Uluntham Mix made with premium Mapillai Samba rice — a heritage grain known for its rich nutrition and health benefits.</p>

                                        <div className="benefits-checklist" style={{ marginBottom: '24px' }}>
                                            <div className="benefit-item">
                                                <svg className="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                                <span>Made with authentic Mapillai Samba rice variety.</span>
                                            </div>
                                            <div className="benefit-item">
                                                <svg className="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                                <span>Available in 300g, 500g, and 1kg packs.</span>
                                            </div>
                                        </div>

                                        {/* Size Selector */}
                                        <div style={{ borderTop: '1px solid rgba(7, 56, 32, 0.08)', paddingTop: '15px', marginBottom: '20px' }}>
                                            <strong>Select Size:</strong>
                                            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                                                {['300g', '500g', '1kg'].map(size => (
                                                    <button type="button"
                                                        key={size}
                                                        className={`btn ${ulunthamSize === size ? 'btn-primary' : 'btn-secondary'}`}
                                                        onClick={() => { setUlunthamSize(size); setPurchaseOption('one-time'); }}
                                                        style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                                                    >
                                                        {size} — ₹{pricing.uluntham[size].inr}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="panel-ingredients-tag" style={{ borderTop: '1px solid rgba(7, 56, 32, 0.08)', paddingTop: '15px', marginBottom: '20px' }}>
                                            <strong>Ingredients:</strong> Mapillai Samba Rice, Black Gram (Ulundhu), traditional spices.
                                        </div>

                                        <PurchaseOptions
                                            purchaseOption={purchaseOption}
                                            setPurchaseOption={setPurchaseOption}
                                            subPrice={pricing.uluntham[ulunthamSize].subInr}
                                            oneTimePrice={pricing.uluntham[ulunthamSize].inr}
                                        />

                                        <div className="panel-purchase-block" style={{ display: 'block' }}>
                                            <button type="button"
                                                className="btn btn-primary add-to-cart-btn"
                                                onClick={() => onAddToCart(`uluntham-${ulunthamSize}`, `Mangalam Uluntham Mix (${ulunthamSize})`, ulunthamPrice, purchaseOption, 1)}
                                                style={{ width: '100%', maxWidth: '420px', padding: '16px 24px' }}
                                            >
                                                Add to Cart — ₹{ulunthamPrice}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Section 4: Customer Reviews (Premium reviews grid) */}
            <section className="testimonials-section" id="customer-reviews">
                <div className="container">
                    <div className="testimonials-wrapper">
                        <div className="testimonial-quote-icon">"</div>
                        <div className="testimonial-slider">
                            <div className="testimonial-slide active">
                                <p className="testimonial-text">
                                    "Amutham Sprouted Health Mix has become an integral part of my family's breakfast. It digests so easily compared to unsprouted mixes, and knowing it comes directly from Sethiyathope, Cuddalore gives me total peace of mind regarding purity. No chemicals, no preservatives — just real nutrition."
                                </p>
                                <div className="testimonial-author">
                                    <span className="author-name">Anjali Sundar</span>
                                    <span className="author-title">Verified Customer & Mother of Two</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 5: Get In Touch (Contact form & address details) */}
            <ContactSection />

        </main>
    );
}
