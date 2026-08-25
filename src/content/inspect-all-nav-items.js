const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-navigation.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Find all 7 nav-menu-item blocks to see the full structure of each item
const navMenuIdx = htmlContent.indexOf('<nav class="nav-menu"');
const navMenuEndIdx = htmlContent.indexOf('</nav>', navMenuIdx);
const navMenuHtml = htmlContent.slice(navMenuIdx, navMenuEndIdx + 6);

// Find each nav-link
let pos = 0;
let count = 0;
console.log('--- All nav-menu-item blocks ---');
while ((pos = navMenuHtml.indexOf('nav-menu-item', pos)) !== -1) {
  const divStart = navMenuHtml.lastIndexOf('<div', pos);
  const nextItem = navMenuHtml.indexOf('nav-menu-item', pos + 10);
  const end = nextItem !== -1 ? navMenuHtml.lastIndexOf('<div', nextItem) : navMenuHtml.indexOf('</nav>');
  count++;
  console.log(`\n=== Item ${count} ===`);
  console.log(navMenuHtml.slice(divStart, end));
  pos += 10;
}
