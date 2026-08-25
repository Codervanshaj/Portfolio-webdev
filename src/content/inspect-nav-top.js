const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-navigation.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Find the nav-top-item or nav-stats-card area (top card)
const key = 'nav-stats-card';
const idx = htmlContent.indexOf(key);
if (idx !== -1) {
  console.log('--- nav-stats-card context (from -200 to +800) ---');
  console.log(htmlContent.slice(Math.max(0, idx - 200), idx + 800));
} else {
  console.log('nav-stats-card not found. Let me look for nav-top-item instead.');
  const key2 = 'nav-top-item';
  const idx2 = htmlContent.indexOf(key2);
  if (idx2 !== -1) {
    console.log('--- nav-top-item context ---');
    console.log(htmlContent.slice(idx2, idx2 + 1200));
  }
}
