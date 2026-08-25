const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-navigation.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Find nav-menu section and find active class handling
const navMenuIdx = htmlContent.indexOf('<nav class="nav-menu"');
if (navMenuIdx !== -1) {
  console.log('--- nav-menu HTML (1500 chars) ---');
  console.log(htmlContent.slice(navMenuIdx, navMenuIdx + 1500));
}
