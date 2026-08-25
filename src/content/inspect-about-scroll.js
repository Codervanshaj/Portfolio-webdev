const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-about.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Find all elements with data-tl-trigger or about-card inside raw-about.html
const regex = /<span\s+data-number-count="[^"]+"[^>]*>/g;
let match;
console.log('--- year span scroll triggers ---');
while ((match = regex.exec(htmlContent)) !== null) {
  console.log(match[0]);
}

console.log('\n--- about-card animations ---');
const cardRegex = /class="about-card"[^>]*>/g;
while ((match = cardRegex.exec(htmlContent)) !== null) {
  console.log(match[0]);
}
