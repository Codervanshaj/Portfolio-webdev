const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-navigation.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const key = 'class="clipboard-item"';
const idx = htmlContent.indexOf(key);
if (idx !== -1) {
  console.log('--- clipboard-item in raw-navigation.html ---');
  console.log(htmlContent.slice(idx - 100, idx + 400));
}
