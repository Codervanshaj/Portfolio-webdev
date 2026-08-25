const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-navigation.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const key = 'nav-top-text';
const idx = htmlContent.indexOf(key);
if (idx !== -1) {
  console.log('--- Context of nav-top-text in raw-navigation.html ---');
  console.log(htmlContent.slice(idx - 1000, idx + 1000));
}
