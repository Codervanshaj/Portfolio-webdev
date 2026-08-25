const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'heynesh-page.html');
const cssPath = path.join(__dirname, 'extracted-styles.css');

if (!fs.existsSync(htmlPath)) {
  console.error('HTML file not found:', htmlPath);
  process.exit(1);
}

const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Use regex to find all <style>...</style> content
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
let match;
let cssContent = '';

while ((match = styleRegex.exec(htmlContent)) !== null) {
  cssContent += match[1] + '\n\n';
}

if (cssContent) {
  fs.writeFileSync(cssPath, cssContent);
  console.log('Extracted CSS successfully to:', cssPath);
} else {
  console.log('No <style> tags found in the HTML.');
}
