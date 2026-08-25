const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', '..', 'public', 'heynesh-assets', 'cdn.prod.website-files.com', '691d7c9f14d0280ebe2d4108', 'css', 'nesh-staging.webflow.shared.bea9f6170.min.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

const searchStr = '.about-timeline-position{';
let idx = 0;
console.log('--- Styles for .about-timeline-position ---');
while ((idx = cssContent.indexOf(searchStr, idx)) !== -1) {
  const end = cssContent.indexOf('}', idx);
  console.log(cssContent.slice(idx, end + 1));
  idx += searchStr.length;
}
