const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', '..', 'public', 'heynesh-assets', 'cdn.prod.website-files.com', '691d7c9f14d0280ebe2d4108', 'css', 'nesh-staging.webflow.shared.bea9f6170.min.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

function findProperty(className, propName) {
  let pos = 0;
  console.log(`\n=== Properties containing '${propName}' for ${className} ===`);
  while ((pos = cssContent.indexOf(className, pos)) !== -1) {
    const braceStart = cssContent.indexOf('{', pos);
    const braceEnd = cssContent.indexOf('}', braceStart);
    if (braceStart !== -1 && braceEnd !== -1) {
      const rule = cssContent.slice(braceStart, braceEnd);
      if (rule.includes(propName)) {
        console.log(`Found: ${cssContent.slice(pos, braceEnd + 1).replace(/\s+/g, ' ')}`);
      }
    }
    pos += className.length;
  }
}

findProperty('.about-card-container', 'height');
findProperty('.about-card-container', 'aspect-ratio');
findProperty('.about-timeline-wrap', 'height');
findProperty('.about-timeline-wrap', 'aspect-ratio');
findProperty('.about-timeline-wrap', 'padding-top');
findProperty('.about-timeline-wrap', 'padding-bottom');
findProperty('.about-card-container', 'padding-top');
findProperty('.about-card-container', 'padding-bottom');
findProperty('.about-wrap', 'height');
