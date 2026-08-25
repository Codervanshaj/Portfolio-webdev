const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-navigation.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Find nav-link usage and active classes: w--current is used for active state
// Also check what JS or CSS handles active state for nav items
const navMenuIdx = htmlContent.indexOf('<nav class="nav-menu"');
const navMenuEndIdx = htmlContent.indexOf('</nav>', navMenuIdx);
const navMenuHtml = htmlContent.slice(navMenuIdx, navMenuEndIdx + 6);

// Extract all nav-link items with their aria-label and href
let pos = 0;
console.log('--- nav-link items ---');
while ((pos = navMenuHtml.indexOf('class="nav-link', pos)) !== -1) {
  const end = navMenuHtml.indexOf('>', pos) + 1;
  console.log(navMenuHtml.slice(pos - 3, end));
  pos += 10;
}

// Also look for hero-navigation-link patterns
pos = 0;
console.log('\n--- hero-navigation-link is-text-link items ---');
while ((pos = navMenuHtml.indexOf('hero-navigation-link is-text-link', pos)) !== -1) {
  const start = navMenuHtml.lastIndexOf('<a', pos);
  const end = navMenuHtml.indexOf('</a>', start) + 4;
  console.log(navMenuHtml.slice(start, end));
  pos += 30;
}
