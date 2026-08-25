const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'heynesh-page.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const match = htmlContent.match(/<main[^>]*class="main-wrap"[^>]*>/);
if (match) {
  console.log('Found main tag:', match[0]);
} else {
  console.log('main-wrap tag not found');
}
