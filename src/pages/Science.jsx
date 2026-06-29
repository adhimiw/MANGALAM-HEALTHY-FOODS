import React from 'react';

export default function Science({ setPage }) {
    const grainData = [
        {
            name: 'Greengram (Sprouted)',
            benefits: 'Rich in Vitamin C and antioxidants that boost immunity, repair cells, and keep your skin glowing. It helps detoxify the body, improves oxygen flow, and supports healthy metabolism.',
            extraBenefit: 'Its high protein content supports muscle growth and keeps you energized throughout the day.'
        },
        {
            name: 'Blackgram (Sprouted)',
            benefits: 'Gentle on digestion, high in fiber, and supports smooth bowel movements. It is valued in Ayurveda for building stamina and sexual wellness, while also helping manage blood sugar, cholesterol, and strengthening bones and muscles.',
            extraBenefit: 'It nourishes the nervous system, improving focus and reducing fatigue.'
        },
        {
            name: 'Kambu / Pearl Millet (Sprouted)',
            benefits: 'A natural source of iron that prevents anemia and fights fatigue. It keeps the body cool in summer, supports diabetic health with slow-release energy, and strengthens bones and muscles. Being gluten-free, it is safe and easy to digest.',
            extraBenefit: 'Its rich magnesium content helps regulate blood pressure and supports heart health.'
        },
        {
            name: 'Ragi / Finger Millet (Sprouted)',
            benefits: 'Unlocks iron, Vitamin B12, and Vitamin C for better absorption. It is an excellent calcium source for strong bones, a trusted first food for babies, and naturally calms the body to improve sleep and reduce stress.',
            extraBenefit: 'Its high dietary fiber helps control appetite and supports healthy weight management.'
        },
        {
            name: 'Solam / Sorghum (Sprouted)',
            benefits: 'Packed with antioxidants that protect cells, reduce inflammation, and improve skin health. Its fiber keeps you full longer, supports weight loss, and being gluten-free, it is safe for those with wheat allergies.',
            extraBenefit: 'It supports heart wellness by lowering cholesterol and improving circulation.'
        },
        {
            name: 'Kondakadalai / Chickpeas (Sprouted)',
            benefits: 'Rich in protein, iron, and zinc that strengthen hair roots and prevent hair fall. They are low in calories but high in fiber, keeping you full and energized for hours.',
            extraBenefit: 'They help regulate blood sugar levels, making them ideal for diabetics.'
        },
        {
            name: 'Varukadalai / Groundnut (Sprouted)',
            benefits: 'Heart-friendly, rich in fiber, potassium, and magnesium that lower cholesterol and regulate blood pressure. They also fight fatigue and anemia by boosting red blood cell production.',
            extraBenefit: 'Their healthy fats improve brain function and memory power.'
        },
        {
            name: 'Cardamom',
            benefits: 'A natural digestive aid that relieves bloating, gas, and nausea. It lowers blood pressure, flushes toxins, protects the liver, and calms the mind to promote deep, restful sleep.',
            extraBenefit: ''
        }
    ];

    return (
        <main className="science-page" style={{ paddingTop: 'calc(var(--header-height) + 40px)', paddingBottom: '80px' }}>
            <div className="container">
                
                {/* Science Hero Wrapper */}
                <div className="science-section" style={{ padding: '0 0 60px 0' }}>
                    <div className="science-wrapper">
                        <div className="science-info">
                            <span className="section-subtitle">THE SCIENCE</span>
                            <h1 style={{ fontSize: '3.5rem', marginBottom: '24px' }}>Grain by Grain Nutrition</h1>
                            <p className="science-lead">Every ingredient in Amutham Sprouted Health Mix is chosen for its unique nutritional profile. Here is the complete breakdown of what makes our sprouted grain blend so powerful.</p>
                        </div>
                        
                        <div className="science-visual">
                            <img src="science_sprouts.png" alt="Mangalam Sprouted Ingredients" className="science-image" />
                            <div className="science-overlay-card">
                                <div className="overlay-card-title">Sprouted Nutrition</div>
                                <div className="overlay-card-stat">8</div>
                                <div className="overlay-card-desc">Premium sprouted grains, legumes, and aromatic cardamom in every blend.</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grain-by-Grain Nutritional Cards */}
                <div style={{ borderTop: '1px solid rgba(7, 56, 32, 0.08)', paddingTop: '60px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <span className="section-subtitle">INGREDIENT BREAKDOWN</span>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>What Makes Our Blend Special</h2>
                        <p style={{ maxWidth: '650px', margin: '0 auto', color: '#646a66', fontSize: '1.05rem' }}>
                            Each grain is sprout-activated to unlock maximum digestibility and mineral bio-uptake. Here is how every ingredient contributes to your wellness.
                        </p>
                    </div>

                    <div className="grain-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                        {grainData.map((grain, idx) => (
                            <div key={idx} className="grain-card" style={{
                                padding: '32px',
                                backgroundColor: 'var(--color-white)',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid rgba(7, 56, 32, 0.1)',
                                boxShadow: 'var(--shadow-premium)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                            }}>
                                <h3 style={{ 
                                    fontSize: '1.35rem', 
                                    color: 'var(--color-primary)', 
                                    marginBottom: '16px',
                                    borderBottom: '2px solid var(--color-accent-gold)',
                                    paddingBottom: '10px'
                                }}>
                                    {grain.name}
                                </h3>
                                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--color-text-main)', marginBottom: '14px' }}>
                                    {grain.benefits}
                                </p>
                                {grain.extraBenefit && (
                                    <div style={{
                                        backgroundColor: 'var(--color-primary-light)',
                                        padding: '12px 16px',
                                        borderRadius: 'var(--radius-md)',
                                        borderLeft: '3px solid var(--color-primary)',
                                        fontSize: '0.9rem',
                                        lineHeight: '1.5',
                                        color: 'var(--color-primary)',
                                        fontWeight: 600
                                    }}>
                                        <span style={{ fontWeight: 700 }}>➕ Extra Benefit:</span> {grain.extraBenefit}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quality Standards */}
                <div style={{ marginTop: '80px', borderTop: '1px solid rgba(7, 56, 32, 0.08)', paddingTop: '60px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <span className="section-subtitle">OUR STANDARDS</span>
                        <h2>Pure Nutrition. No Compromise.</h2>
                    </div>
                    <div className="purity-grid" style={{ marginTop: '0' }}>
                        <div className="purity-card">
                            <h3>100% Chemical-Free</h3>
                            <p>No chemicals, no preservatives. Our grain mix is 100% natural — only the goodness of sprouted grains and cardamom.</p>
                        </div>
                        <div className="purity-card">
                            <h3>Traditional Preparation</h3>
                            <p>Every batch is prepared using traditional methods that preserve real nutritious values and authentic taste.</p>
                        </div>
                        <div className="purity-card">
                            <h3>Clean Processing</h3>
                            <p>Processed under sterile parameters in Sethiyathope, Cuddalore to guarantee supreme biological purity.</p>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
