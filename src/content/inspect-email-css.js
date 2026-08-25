const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../../public/heynesh-assets/cdn.prod.website-files.com/691d7c9f14d0280ebe2d4108/css/nesh-staging.webflow.shared.bea9f6170.min.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

function showCSSRules(className) {
  let pos = 0;
  console.log(`=== Rules for .${className} ===`);
  while ((pos = cssContent.indexOf(`.${className}`, pos)) !== -1) {
    const start = pos;
    const end = cssContent.indexOf('}', pos) + 1;
    console.log(cssContent.slice(Math.max(0, start - 50), end));
    pos = end;
  }
}

showCSSRules('clipboard-item');
showCSSRules('clipboard-wrap');
showCSSRules('nav-email-item');
showCSSRules('nav-email-wrap');
