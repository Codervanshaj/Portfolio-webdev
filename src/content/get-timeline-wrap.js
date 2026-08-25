const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-about.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const startStr = '<div class="about-timeline-wrap">';
const idx = htmlContent.indexOf(startStr);
if (idx !== -1) {
  // Let's count matching divs to print the whole tag
  let depth = 0;
  let endIdx = idx;
  for (let i = idx; i < htmlContent.length; i++) {
    if (htmlContent.slice(i, i + 4) === '<div') {
      depth++;
    } else if (htmlContent.slice(i, i + 6) === '</div ') {
      depth--;
    } else if (htmlContent.slice(i, i + 6) === '</div>') {
      depth--;
      if (depth === 0) {
        endIdx = i + 6;
        break;
      }
    }
  }
  console.log(htmlContent.slice(idx, endIdx));
} else {
  console.log('not found');
}
