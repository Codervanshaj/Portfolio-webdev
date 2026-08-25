const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-navigation.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const key = 'Working closely';
const idx = htmlContent.indexOf(key);
if (idx !== -1) {
  console.log('--- Context of the tagline in raw-navigation.html ---');
  console.log(htmlContent.slice(idx - 600, idx + 600));
}
