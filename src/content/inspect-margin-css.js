const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', '..', 'public', 'heynesh-assets', 'cdn.prod.website-files.com', '691d7c9f14d0280ebe2d4108', 'css', 'nesh-staging.webflow.shared.bea9f6170.min.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

function findMatches(searchStr) {
  let pos = 0;
  console.log(`\n--- Matches for ${searchStr} ---`);
  while ((pos = cssContent.indexOf(searchStr, pos)) !== -1) {
    const start = Math.max(0, pos - 40);
    const end = Math.min(cssContent.length, pos + searchStr.length + 80);
    console.log(`Match at ${pos}: ... ${cssContent.slice(start, end).replace(/\s+/g, ' ')} ...`);
    pos += searchStr.length;
  }
}

findMatches('margin-left');
findMatches('padding-left');
findMatches('18.54vw');
findMatches('main-wrap');
