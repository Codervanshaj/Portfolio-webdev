const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-navigation.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const key = 'class="nav-comapny-wrap"';
const pos = htmlContent.indexOf(key);

if (pos === -1) {
  console.log('nav-comapny-wrap not found');
} else {
  console.log('Found nav-comapny-wrap content:');
  console.log(htmlContent.slice(pos - 50, pos + 3000));
}
