const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../../public/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/css/nesh-staging.webflow.shared.bea9f6170.min.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

let pos = 0;
while ((pos = cssContent.indexOf('clipboard', pos)) !== -1) {
  const start = cssContent.lastIndexOf('{', pos);
  const prevEnd = cssContent.lastIndexOf('}', start);
  const ruleStart = prevEnd !== -1 ? prevEnd + 1 : 0;
  const end = cssContent.indexOf('}', pos) + 1;
  console.log('--- Selector ---');
  console.log(cssContent.slice(ruleStart, start).trim());
  console.log('--- Rule ---');
  console.log(cssContent.slice(start, end).trim());
  pos = end;
}
