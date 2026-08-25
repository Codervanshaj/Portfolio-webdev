const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', '..', 'public', 'heynesh-assets', 'cdn.prod.website-files.com', '691d7c9f14d0280ebe2d4108', 'css', 'nesh-staging.webflow.shared.bea9f6170.min.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

function findSelector(selector) {
  let pos = 0;
  console.log(`\n--- Styles for ${selector} ---`);
  while ((pos = cssContent.indexOf(selector, pos)) !== -1) {
    const end = cssContent.indexOf('}', pos);
    console.log(cssContent.slice(pos, end + 1).replace(/\s+/g, ' '));
    pos += selector.length;
  }
}

findSelector('.digit-mask');
findSelector('.digit-track');
findSelector('.number-wrap');
