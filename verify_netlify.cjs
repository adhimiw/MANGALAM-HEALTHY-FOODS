const { chromium } = require('playwright');

async function run() {
    console.log("Launching browser...");
    const browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    const context = await browser.newContext({
        viewport: { width: 1440, height: 900 }
    });
    const page = await context.newPage();

    // Listen for console logs
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    // Listen for page errors (uncaught exceptions)
    page.on('pageerror', err => console.error('PAGE ERROR:', err.message));

    // Listen for failed network requests
    page.on('requestfailed', request => {
        console.log('REQUEST FAILED:', request.url(), request.failure().errorText);
    });

    // Listen for response status codes to catch 404s explicitly
    page.on('response', response => {
        if (response.status() === 404) {
            console.log('404 RESPONSE:', response.url());
        }
    });

    const url = 'https://mangalamhf.netlify.app/';

    try {
        console.log(`Navigating to ${url}...`);
        await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
        console.log("Successfully connected to live Netlify deployment.");

        // Wait a moment
        await page.waitForTimeout(2000);
        
        console.log("Capturing screenshot...");
        await page.screenshot({ path: 'netlify_verify.png', fullPage: true });
        console.log("Screenshot successfully saved as netlify_verify.png.");
    } catch (error) {
        console.error("Error during Netlify verification:", error);
    } finally {
        await browser.close();
        console.log("Browser closed.");
    }
}

run();
