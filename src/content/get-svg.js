const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-about.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const startIdx = htmlContent.indexOf('<svg class="about-timeline"');
if (startIdx === -1) {
  console.log('SVG not found');
  process.exit(1);
}

const endIdx = htmlContent.indexOf('</svg>', startIdx);
const svgContent = htmlContent.slice(startIdx, endIdx + 6);

fs.writeFileSync(path.join(__dirname, 'timeline-svg.html'), svgContent);
console.log('Extracted SVG to timeline-svg.html');
