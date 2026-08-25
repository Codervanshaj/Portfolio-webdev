const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-navigation.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Find nav-top-layout div start and end
const layoutIdx = htmlContent.indexOf('class="nav-top-layout"');
if (layoutIdx !== -1) {
  // Let's print out the first 2500 characters from nav-top-layout
  console.log('--- nav-top-layout area in raw-navigation.html ---');
  console.log(htmlContent.slice(layoutIdx - 100, layoutIdx + 2000));
}
