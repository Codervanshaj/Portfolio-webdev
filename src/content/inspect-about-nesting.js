const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-about.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const key = 'class="about-wrap"';
const startIdx = htmlContent.indexOf(key);
if (startIdx === -1) {
  console.log('about-wrap not found');
  process.exit(1);
}

// Let's parse tag by tag starting from the <div class="about-wrap"> opening tag
const tagRegex = /<div[^>]*>|<\/div>/g;
tagRegex.lastIndex = htmlContent.lastIndexOf('<div', startIdx);

let match;
let depth = 0;
const stack = [];

while ((match = tagRegex.exec(htmlContent)) !== null) {
  const tag = match[0];
  if (tag.startsWith('<div')) {
    depth++;
    // Get class attribute
    const classMatch = tag.match(/class="([^"]+)"/);
    const className = classMatch ? classMatch[1] : '';
    const idMatch = tag.match(/id="([^"]+)"/);
    const idName = idMatch ? idMatch[1] : '';
    
    stack.push({ depth, className, idName, tag });
    
    if (className.includes('about-card-wrap') || 
        className.includes('about-card-container') || 
        className.includes('about-timeline-wrap') || 
        className.includes('about-timeline-overflow') || 
        className.includes('mobile-timeline-wrap') || 
        className.includes('about-wrap')) {
      console.log('  '.repeat(depth - 1) + `div.${className.split(' ').join('.')}${idName ? '#' + idName : ''}`);
    }
  } else {
    stack.pop();
    depth--;
    if (depth === 0) {
      console.log('Exited about-wrap');
      break;
    }
  }
}
