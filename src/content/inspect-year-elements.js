const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-about.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Find the about-card-year elements and understand the original structure
let pos = 0;
let count = 0;
console.log('--- about-card-year elements ---');
while ((pos = htmlContent.indexOf('about-card-year', pos)) !== -1) {
  const divStart = htmlContent.lastIndexOf('<div', pos);
  const end = htmlContent.indexOf('</div>', pos) + 6;
  count++;
  console.log(`\n=== Year Element ${count} ===`);
  console.log(htmlContent.slice(divStart, end));
  pos += 15;
}
