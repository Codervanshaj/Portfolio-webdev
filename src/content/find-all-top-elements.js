const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'heynesh-page.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// A simple HTML parser that tracks div nesting inside <div class="page-wrap">
// and prints direct children of page-wrap.

// Find start of page-wrap
const startMatch = htmlContent.match(/<div[^>]*class="page-wrap"[^>]*>/);
if (!startMatch) {
  console.log('page-wrap not found');
  process.exit(1);
}

const startIdx = htmlContent.indexOf(startMatch[0]);
let currentPos = startIdx + startMatch[0].length;

let depth = 0;
const children = [];

while (currentPos < htmlContent.length) {
  const nextTag = htmlContent.indexOf('<', currentPos);
  if (nextTag === -1) break;
  
  const tagEnd = htmlContent.indexOf('>', nextTag);
  if (tagEnd === -1) break;
  
  const tagText = htmlContent.slice(nextTag, tagEnd + 1);
  currentPos = tagEnd + 1;
  
  // Ignore comments
  if (tagText.startsWith('<!--')) {
    const commentEnd = htmlContent.indexOf('-->', nextTag);
    if (commentEnd !== -1) {
      currentPos = commentEnd + 3;
    }
    continue;
  }
  
  // Ignore script contents
  if (tagText.startsWith('<script') && !tagText.endsWith('/>')) {
    const scriptEnd = htmlContent.toLowerCase().indexOf('</script>', nextTag);
    if (scriptEnd !== -1) {
      currentPos = scriptEnd + 9;
    }
    continue;
  }
  
  // Ignore style contents
  if (tagText.startsWith('<style') && !tagText.endsWith('/>')) {
    const styleEnd = htmlContent.toLowerCase().indexOf('</style>', nextTag);
    if (styleEnd !== -1) {
      currentPos = styleEnd + 8;
    }
    continue;
  }
  
  const isClosing = tagText.startsWith('</');
  const isSelfClosing = tagText.endsWith('/>') || 
                        /^\s*<(img|br|hr|input|link|meta)/i.test(tagText);
                        
  if (isClosing) {
    depth--;
    if (depth < 0) {
      // Reached the closing tag of page-wrap itself
      console.log('Closed page-wrap:', tagText);
      break;
    }
  } else {
    if (depth === 0) {
      children.push(tagText);
    }
    if (!isSelfClosing) {
      depth++;
    }
  }
}

console.log('Top level elements inside page-wrap:');
children.forEach((c, idx) => {
  console.log(`${idx + 1}: ${c.substring(0, 100)}`);
});
