const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-navigation.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Get all nav-menu-item blocks
const navMenuIdx = htmlContent.indexOf('<nav class="nav-menu"');
const navMenuEndIdx = htmlContent.indexOf('</nav>', navMenuIdx);
const navMenuHtml = htmlContent.slice(navMenuIdx, navMenuEndIdx + 6);

// Extract data-tl attributes for active state
const matches = navMenuHtml.match(/data-flip-[^"]*="[^"]*"/g);
console.log('--- data-flip attributes ---');
if (matches) matches.forEach(m => console.log(m));

// Also get the nav-item-bg elements  
let pos = 0;
console.log('\n--- nav-item-bg elements ---');
while ((pos = navMenuHtml.indexOf('nav-item-bg', pos)) !== -1) {
  const end = navMenuHtml.indexOf('>', pos) + 1;
  console.log(navMenuHtml.slice(pos - 5, end));
  pos += 10;
}

// Look for w--current class
console.log('\n--- w--current usage ---');
const curr = navMenuHtml.match(/class="[^"]*w--current[^"]*"/g);
if (curr) curr.forEach(c => console.log(c));
