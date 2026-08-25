const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-about.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const key = 'class="mobile-timeline-wrap"';
const pos = htmlContent.indexOf(key);

if (pos === -1) {
  console.log('mobile-timeline-wrap not found');
} else {
  console.log('Found mobile-timeline-wrap content:');
  console.log(htmlContent.slice(pos - 50, pos + 2500));
}
