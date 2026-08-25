const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', '..', 'public', 'heynesh-assets', 'cdn.prod.website-files.com', '691d7c9f14d0280ebe2d4108', 'css', 'nesh-staging.webflow.shared.bea9f6170.min.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

function findSelectorStyles(selector) {
  console.log(`\n=== STYLES FOR: ${selector} ===`);
  let pos = 0;
  while ((pos = cssContent.indexOf(selector, pos)) !== -1) {
    // Check if it's followed by '{' or ','
    const charAfter = cssContent.charAt(pos + selector.length);
    if (charAfter === '{' || charAfter === ',' || charAfter === ' ' || charAfter === '.') {
      const braceStart = cssContent.indexOf('{', pos);
      const braceEnd = cssContent.indexOf('}', braceStart);
      if (braceStart !== -1 && braceEnd !== -1) {
        console.log(`Found match: ${cssContent.slice(pos, braceEnd + 1).replace(/\s+/g, ' ')}`);
      }
    }
    pos += selector.length;
  }
}

findSelectorStyles('.about-wrap');
findSelectorStyles('.about-card-container');
findSelectorStyles('.about-card-wrap');
findSelectorStyles('.about-card');
findSelectorStyles('.about-timeline-wrap');
findSelectorStyles('.about-timeline-overflow');
