const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-about.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const key = 'class="about-timeline-wrap"';
const idx = htmlContent.indexOf(key);
if (idx !== -1) {
  console.log('Found snippet:');
  console.log(htmlContent.slice(idx - 100, idx + 800));
} else {
  console.log('not found');
}
