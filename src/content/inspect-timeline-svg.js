const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-about.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const key = 'class="about-timeline-wrap"';
const pos = htmlContent.indexOf(key);

if (pos === -1) {
  console.log('about-timeline-wrap not found');
} else {
  // Let's print 3000 characters from this position
  console.log('Found about-timeline-wrap content:');
  console.log(htmlContent.slice(pos - 50, pos + 4000));
}
