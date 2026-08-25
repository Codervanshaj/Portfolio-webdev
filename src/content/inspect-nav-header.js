const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-navigation.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Find the beginning of the nav-top-item area (tagline / bio card)
const key = 'nav-top-item';
const idx = htmlContent.indexOf(key);
if (idx !== -1) {
  console.log('--- nav-top-item context (all the way to nav-stats) ---');
  const statsIdx = htmlContent.indexOf('nav-stats-wrap', idx);
  console.log(htmlContent.slice(idx - 50, statsIdx + 50));
}
