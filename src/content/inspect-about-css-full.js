const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', '..', 'public', 'heynesh-assets', 'cdn.prod.website-files.com', '691d7c9f14d0280ebe2d4108', 'css', 'nesh-staging.webflow.shared.bea9f6170.min.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

function findMatches(keyword) {
  console.log(`\n=== ALL CSS BLOCKS FOR '${keyword}' ===`);
  let idx = 0;
  while ((idx = cssContent.indexOf(keyword, idx)) !== -1) {
    // Find the start of the selector block (backwards to find '{' or media query)
    let blockStart = cssContent.lastIndexOf('}', idx);
    if (blockStart === -1) blockStart = 0;
    else blockStart += 1;
    
    // Find the end of the selector block (forwards to find '}')
    const blockEnd = cssContent.indexOf('}', idx);
    if (blockEnd !== -1) {
      console.log(cssContent.slice(blockStart, blockEnd + 1).replace(/\s+/g, ' ').trim());
    }
    idx += keyword.length;
  }
}

findMatches('about-card-container');
findMatches('about-timeline-wrap');
