import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1512, height: 982 } });
page.on('pageerror', (err) => console.log('pageerror:', err.message));
page.on('console', (msg) => console.log(`console[${msg.type()}]:`, msg.text()));

await page.goto('http://localhost:5189/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

await page.screenshot({ path: '/private/tmp/claude-501/-Users-pranavturlapati-Pranav-/c8bbb4f0-697e-4da1-9d39-fdcf0779c2a9/scratchpad/initial-load.png' });

const html = await page.content();
console.log('has about-btn in DOM:', html.includes('about-btn'));

await browser.close();
