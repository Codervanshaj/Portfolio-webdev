const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', '..', 'public', 'heynesh-assets', 'cdn.prod.website-files.com', '691d7c9f14d0280ebe2d4108', 'css', 'nesh-staging.webflow.shared.bea9f6170.min.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

function findStyles(selector) {
  let pos = 0;
  console.log(`\n--- Styles for ${selector} ---`);
  while ((pos = cssContent.indexOf(selector, pos)) !== -1) {
    const start = Math.max(0, pos - 20);
    const end = Math.min(cssContent.length, pos + 250);
    console.log(`Match at ${pos}: ... ${cssContent.slice(start, end).replace(/\s+/g, ' ')} ...`);
    pos += selector.length;
  }
}

findStyles('.popup-card-wrap');
findStyles('.popup-card');
