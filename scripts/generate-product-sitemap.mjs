// Regenerate public/sitemap.xml: static routes + live product URLs from the API.
// Usage: node scripts/generate-product-sitemap.mjs [apiBase]
// apiBase defaults to the live site (needs no local backend running).
// Re-run after product add/remove, then rebuild + redeploy.
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const API_BASE = process.argv[2] || 'https://mahealthyfoods.in/api';
const ORIGIN = 'https://mahealthyfoods.in';
const TODAY = new Date().toISOString().slice(0, 10);

const STATIC_URLS = [
    { loc: `${ORIGIN}/`, lastmod: TODAY, changefreq: 'weekly', priority: '1.0' },
    { loc: `${ORIGIN}/products`, lastmod: TODAY, changefreq: 'weekly', priority: '0.9' },
    { loc: `${ORIGIN}/why-sprouted`, lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
    { loc: `${ORIGIN}/our-story`, lastmod: TODAY, changefreq: 'monthly', priority: '0.8' },
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

try {
    const res = await fetch(`${API_BASE}/products`, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const json = await res.json();
    const prods = Array.isArray(json) ? json : (json.data || json.products || []);
    const seen = new Set();
    for (const p of prods) {
        const slug = p.slug || p.id;
        if (!slug || seen.has(slug)) continue;
        seen.add(slug);
        const raw = p.updated_at || p.created_at || '';
        const lastmod = typeof raw === 'string' && raw.length >= 10 ? raw.slice(0, 10) : TODAY;
        STATIC_URLS.push({
            loc: `${ORIGIN}/product/${slug}`,
            lastmod,
            changefreq: 'weekly',
            priority: '0.7',
        });
    }
    console.log(`[sitemap] ${seen.size} product URLs from API`);
} catch (err) {
    console.warn('[sitemap] API unreachable, keeping static routes only:', err.message);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    STATIC_URLS.map((u) =>
        `  <url>\n    <loc>${esc(u.loc)}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
    ).join('\n') +
    `\n</urlset>\n`;

writeFileSync(resolve('public/sitemap.xml'), xml);
console.log(`[sitemap] wrote public/sitemap.xml (${STATIC_URLS.length} URLs)`);
