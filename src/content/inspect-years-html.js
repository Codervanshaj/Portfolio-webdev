const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-about.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const regex = /<div class="about-card-year">([\s\S]*?)<\/div>/g;
let m;
let count = 1;
while ((m = regex.exec(htmlContent)) !== null) {
  console.log(`\n=== Card ${count} Year HTML ===`);
  console.log(m[1].trim());
  count++;
}
