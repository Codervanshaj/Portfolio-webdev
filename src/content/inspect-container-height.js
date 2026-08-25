const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-about.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const key = 'class="about-card-container"';
const idx = htmlContent.indexOf(key);
if (idx !== -1) {
  console.log('Found about-card-container snippet:');
  console.log(htmlContent.slice(idx - 50, idx + 400));
} else {
  console.log('not found');
}
