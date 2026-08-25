const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-about.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Let's find occurrences of about-card-wrap
let pos = 0;
console.log('--- Card wraps structure inside raw-about.html ---');
while ((pos = htmlContent.indexOf('about-card-wrap', pos)) !== -1) {
  // Let's print the element and its parents/siblings
  const start = Math.max(0, pos - 150);
  const end = Math.min(htmlContent.length, pos + 250);
  console.log(`Match at ${pos}: ... ${htmlContent.slice(start, end).replace(/\s+/g, ' ')} ...`);
  pos += 'about-card-wrap'.length;
}
