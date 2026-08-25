const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', '..', 'public', 'heynesh-assets', 'cdn.prod.website-files.com', '691d7c9f14d0280ebe2d4108', 'css', 'nesh-staging.webflow.shared.bea9f6170.min.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

const searchStr = '.popup-card-wrap{';
const idx = cssContent.indexOf(searchStr);
if (idx !== -1) {
  console.log('Found:', cssContent.slice(idx, idx + 500));
} else {
  console.log('Not found');
}
