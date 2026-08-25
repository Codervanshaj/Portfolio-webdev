const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'heynesh-page.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// We want to find the top level tags inside <body> or directly in the file
// Let's search for classes of top-level divs.
// We can use a regex to find all divs with class names at the top level.
const divRegex = /<div class="([^"]+)"[^>]*>/g;
let match;
const classes = new Set();
while ((match = divRegex.exec(htmlContent)) !== null) {
  classes.add(match[1]);
}

console.log('Found classes:', Array.from(classes).slice(0, 50));
