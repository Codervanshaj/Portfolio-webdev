const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', '..', 'public', 'heynesh-assets', 'cdn.prod.website-files.com', '691d7c9f14d0280ebe2d4108', 'css', 'nesh-staging.webflow.shared.bea9f6170.min.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

console.log('Includes digit-mask?', cssContent.includes('digit-mask'));
console.log('Includes digit-track?', cssContent.includes('digit-track'));
console.log('Includes number-wrap?', cssContent.includes('number-wrap'));
