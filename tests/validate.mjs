import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../index.htm', import.meta.url), 'utf8');

const required = [
  '<link rel="canonical" href="https://velocity11.in/">',
  'https://velocity11.in/social-preview.png',
  'https://x.com/Velocity11AI',
  'https://www.instagram.com/velocity11ai/',
  'https://www.facebook.com/profile.php?id=61593631102687',
  'https://www.youtube.com/@Velocity11AI',
  'https://www.pinterest.com/Velocity11AI/',
  'https://github.com/harindermansh-stack',
  "sendEvent('view_product'",
  "sendEvent('click_product_cta'",
  "sendEvent('click_gumroad'",
  "sendEvent('email_signup_start'",
  "sendEvent('email_signup'",
  "sendEvent('click_social'",
  'G-5497N6GW2K'
];

required.forEach((value) => assert.ok(html.includes(value), `Missing required content: ${value}`));

const retiredHandle = ['harinder', '2'].join('');
const forbidden = [
  `@${retiredHandle}`,
  `x.com/${retiredHandle}`,
  `twitter.com/${retiredHandle}`,
  'PHLAUNCH',
  'Productive in 5 Minutes',
  'Vercel, Netlify, or your own server',
  'mailto:hello@velocity11.in'
];

forbidden.forEach((value) => assert.ok(!html.includes(value), `Forbidden stale or unverified content remains: ${value}`));

const expectedProducts = new Map([
  ['InvoicePro', '49'],
  ['TaskBoard Pro', '79'],
  ['AI Agent Studio', '99'],
  ['Complete Suite', '179']
]);

for (const [name, price] of expectedProducts) {
  assert.ok(html.includes(`data-product-name="${name}"`), `Missing product tracking for ${name}`);
  assert.ok(html.includes(`data-product-price="${price}"`), `Missing product price for ${name}`);
}

const scripts = [...html.matchAll(/<script(?![^>]*type="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/g)]
  .map((match) => match[1])
  .filter((script) => script.trim());
scripts.forEach((script) => new Function(script));

const internalAnchors = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
internalAnchors.forEach((id) => assert.ok(html.includes(`id="${id}"`), `Missing internal target #${id}`));

console.log(`Validated ${expectedProducts.size} products, ${scripts.length} inline scripts, and ${internalAnchors.length} internal links.`);
