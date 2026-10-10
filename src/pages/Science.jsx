import React, { useState, useEffect } from 'react';

export default function Science({ setPage }) {
    const [activeAcc, setActiveAcc] = useState(0);

    // SEO: SpeakableSpecification for the visible Q&A answers below (voice + answer engines)
    useEffect(() => {
        const existing = document.getElementById('science-speakable');
        if (existing) existing.remove();
        const tag = document.createElement('script');
        tag.type = 'application/ld+json';
        tag.id = 'science-speakable';
        tag.text = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Why Sprouted? The Science — Mangalam Healthy Foods',
            url: 'https://mahealthyfoods.in/why-sprouted',
            speakable: {
                '@type': 'SpeakableSpecification',
                cssSelector: ['.qa-answer']
            }
        });
        document.head.appendChild(tag);
        return () => {
            const el = document.getElementById('science-speakable');
            if (el) el.remove();
        };
    }, []);

    const accordionData = [
        {
            num: '01',
            title: 'The Sprout-Activation Sequence',
            content: 'We soak ancient millet grains (Finger, Pearl, Sorghum) in pure water to trigger sprout activation. This naturally activates phytase, an enzyme that degrades phytic acid—a compound that binds minerals like Calcium and Iron and prevents absorption.'
        },
        {
            num: '02',
            title: 'Enzymatic Digestion of Complex Starches',
            content: 'Sprouting triggers amylase and protease enzymes, which pre-digest complex carbohydrates and proteins into simple amino acids and sugars. This increases cellular digestibility and eliminates digestive heaviness.'
        },
        {
            num: '03',
            title: 'Rich Mineral Enrichment',
            content: 'Due to phytic acid degradation, the bioavailability of trace minerals increases up to 300%. Our sprouted mix guarantees 99.7mg Calcium, 5.06mg Iron, 136.9mg Magnesium, and 2.63mg Zinc per 100g.'
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
                            <h1 style={{ fontSize: '3.5rem', marginBottom: '24px' }}>The Bioavailability Breakthrough</h1>
                            <p className="science-lead">Standard health mixes contain unsprouted grains that carry phytic acid—an anti-nutrient that binds to minerals and prevents absorption. Mangalam bypasses this limitation entirely.</p>

                            {/* React Accordion */}
                            <div className="accordion">
                                {accordionData.map((item, idx) => (
                                    <div
                                        className={`accordion-item ${activeAcc === idx ? 'active' : ''}`}
                                        key={idx}
                                    >
                                        <button
                                            className="accordion-trigger"
                                            onClick={() => setActiveAcc(activeAcc === idx ? -1 : idx)}
                                            aria-expanded={activeAcc === idx}
                                        >
                                            <span>{item.num}. {item.title}</span>
                                            <span className="accordion-icon">+</span>
                                        </button>
                                        <div
                                            className="accordion-content"
                                            style={{ maxHeight: activeAcc === idx ? '200px' : '0' }}
                                        >
                                            <p>{item.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="science-visual">
                            <img src="science_sprouts.png" alt="Mangalam Sprouted Ingredients" className="science-image" />
                            <div className="science-overlay-card">
                                <div className="overlay-card-title">Enzymatic Vitality</div>
                                <div className="overlay-card-stat">+300%</div>
                                <div className="overlay-card-desc">Increase in mineral absorption compared to unsprouted grain flour.</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Questions & Answers (AEO: question-headings + concise direct answers) */}
                <div style={{ marginTop: '80px', borderTop: '1px solid rgba(7, 56, 32, 0.08)', paddingTop: '60px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <span className="section-subtitle">COMMON QUESTIONS</span>
                        <h2>Sprouted Nutrition, Answered</h2>
                    </div>
                    <div style={{ maxWidth: '820px', margin: '0 auto', display: 'grid', gap: '28px' }}>
                        <div>
                            <h2 style={{ fontSize: '1.35rem', marginBottom: '10px' }}>What is Amutham Sprouted Health Mix?</h2>
                            <p className="qa-answer" style={{ lineHeight: '1.7' }}>Amutham Sprouted Health Mix is a 100% natural porridge powder made from 9 soak-sprouted ancient grains and millets plus Mappillai Samba rice, stone-ground in Sethiyathope without chemicals, preservatives, or refined sugar.</p>
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.35rem', marginBottom: '10px' }}>Why are sprouted millets better than regular grain flour?</h2>
                            <p className="qa-answer" style={{ lineHeight: '1.7' }}>Sprouting activates phytase enzymes that break down phytic acid, unlocking up to 3x higher absorption of Iron, Calcium, and Zinc, while pre-digesting starches and proteins for lighter, faster digestion.</p>
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.35rem', marginBottom: '10px' }}>How do I prepare Amutham Sprouted Health Mix?</h2>
                            <p className="qa-answer" style={{ lineHeight: '1.7' }}>Whisk 2 spoonfuls of mix into water or milk without lumps, simmer for 3–5 minutes while stirring, then sweeten with country sugar, honey, or palm jaggery and serve warm for breakfast or dinner.</p>
                        </div>
                    </div>

                    {/* Comparison table (AEO: table-snippet eligible) */}
                    <div style={{ maxWidth: '820px', margin: '48px auto 0 auto', overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem' }}>
                            <caption style={{ textAlign: 'left', fontWeight: 800, marginBottom: '12px' }}>Sprouted vs regular unsprouted health mix</caption>
                            <thead>
                                <tr>
                                    <th scope="col" style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid var(--color-primary)' }}>Factor</th>
                                    <th scope="col" style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid var(--color-primary)' }}>Amutham Sprouted Mix</th>
                                    <th scope="col" style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid var(--color-primary)' }}>Regular Unsprouted Mix</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(7,56,32,0.1)' }}>Phytic acid</td>
                                    <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(7,56,32,0.1)' }}>Reduced by soak-sprouting</td>
                                    <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(7,56,32,0.1)' }}>Binds minerals, lowers absorption</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(7,56,32,0.1)' }}>Mineral absorption</td>
                                    <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(7,56,32,0.1)' }}>Up to 3x higher Iron, Calcium, Zinc uptake</td>
                                    <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(7,56,32,0.1)' }}>Standard uptake</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(7,56,32,0.1)' }}>Digestion</td>
                                    <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(7,56,32,0.1)' }}>Pre-digested starches, light on stomach</td>
                                    <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(7,56,32,0.1)' }}>Heavier, slower digestion</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '10px 12px' }}>Additives</td>
                                    <td style={{ padding: '10px 12px' }}>No chemicals, preservatives, or refined sugar</td>
                                    <td style={{ padding: '10px 12px' }}>Often contains preservatives and sugar</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Authoritative sources (GEO: attribution signals) */}
                    <div style={{ maxWidth: '820px', margin: '32px auto 0 auto', fontSize: '0.88rem', opacity: 0.85 }}>
                        <span style={{ fontWeight: 700 }}>Learn more from authoritative sources: </span>
                        <a href="https://wholegrainscouncil.org/" target="_blank" rel="noopener noreferrer">Whole Grains Council</a>
                        {' · '}
                        <a href="https://www.fssai.gov.in/" target="_blank" rel="noopener noreferrer">Food Safety and Standards Authority of India (FSSAI)</a>
                    </div>
                </div>

                {/* Sourcing details */}
                <div style={{ marginTop: '80px', borderTop: '1px solid rgba(7, 56, 32, 0.08)', paddingTop: '60px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <span className="section-subtitle">CLINICAL VALUES</span>
                        <h2>Rigorous Standards. Pure Nutrition.</h2>
                    </div>
                    <div className="purity-grid" style={{ marginTop: '0' }}>
                        <div className="purity-card">
                            <h3>Sprouted Grains</h3>
                            <p>All grains are germinated to trigger enzymatic processes before vacuum drying and hygienic milling.</p>
                        </div>
                        <div className="purity-card">
                            <h3>100% Preservative Free</h3>
                            <p>No chemical preservatives, artificial colors, or refined sugar. Pure sprouted grains enriched with cardamom.</p>
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
