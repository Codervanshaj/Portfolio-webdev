const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', '..', 'public', 'heynesh-assets', 'cdn.prod.website-files.com', '691d7c9f14d0280ebe2d4108', 'css', 'nesh-staging.webflow.shared.bea9f6170.min.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

// Search for page-wrap
const searchStr = '.navigation';
let pos = 0;
console.log('Searching for:', searchStr);
while ((pos = cssContent.indexOf(searchStr, pos)) !== -1) {
  const start = Math.max(0, pos - 50);
  const end = Math.min(cssContent.length, pos + searchStr.length + 100);
  console.log(`Match at ${pos}: ... ${cssContent.slice(start, end).replace(/\s+/g, ' ')} ...`);
  pos += searchStr.length;
}

const searchStr2 = 'nav-container';
pos = 0;
console.log('\nSearching for:', searchStr2);
while ((pos = cssContent.indexOf(searchStr2, pos)) !== -1) {
  const start = Math.max(0, pos - 50);
  const end = Math.min(cssContent.length, pos + searchStr2.length + 100);
  console.log(`Match at ${pos}: ... ${cssContent.slice(start, end).replace(/\s+/g, ' ')} ...`);
  pos += searchStr2.length;
}
