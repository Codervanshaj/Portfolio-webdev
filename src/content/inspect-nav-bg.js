const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-navigation.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

let pos = 0;
let count = 0;
console.log('--- nav-top-bg in raw-navigation.html ---');
while ((pos = htmlContent.indexOf('nav-top-bg', pos)) !== -1) {
  count++;
  console.log(`=== Instance ${count} ===`);
  console.log(htmlContent.slice(pos - 300, pos + 300));
  pos += 10;
}
