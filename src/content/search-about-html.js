const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-about.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Search for any style block
console.log('--- Style blocks in raw-about.html ---');
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
let m;
while ((m = styleRegex.exec(htmlContent)) !== null) {
  if (m[1].includes('about-card-container') || m[1].includes('about-card-wrap')) {
    console.log(m[0]);
  }
}

console.log('--- Script blocks referencing container ---');
const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/g;
while ((m = scriptRegex.exec(htmlContent)) !== null) {
  if (m[1].includes('about-card-container') || m[1].includes('about-card-wrap')) {
    console.log('Found script referencing about-card-container or wrap.');
    // Print a snippet of it
    console.log(m[1].slice(0, 500));
  }
}
