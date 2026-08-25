const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-about.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Match all about-card-wrap tags
const regex = /<div[^>]*class="[^"]*about-card-wrap[^"]*"[^>]*>/g;
let match;
while ((match = regex.exec(htmlContent)) !== null) {
  console.log(match[0].replace(/\s+/g, ' '));
}
