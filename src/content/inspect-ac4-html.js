const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-about.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const key = 'class="about-card-wrap ac-4"';
const idx = htmlContent.indexOf(key);
if (idx !== -1) {
  console.log(htmlContent.slice(idx, idx + 1000));
} else {
  console.log('ac-4 not found');
}
