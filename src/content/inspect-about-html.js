const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-about.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Parse HTML tags and print hierarchy
let depth = 0;
let pos = 0;

console.log('inspecting raw-about.html structure:');

while (pos < htmlContent.length) {
  const nextTag = htmlContent.indexOf('<', pos);
  if (nextTag === -1) break;
  
  const tagEnd = htmlContent.indexOf('>', nextTag);
  if (tagEnd === -1) break;
  
  const tagText = htmlContent.slice(nextTag, tagEnd + 1);
  pos = tagEnd + 1;
  
  if (tagText.startsWith('<!--')) continue;
  
  const isClosing = tagText.startsWith('</');
  const isSelfClosing = tagText.endsWith('/>') || /^\s*<(img|br|hr|input|link|meta)/i.test(tagText);
  
  if (isClosing) {
    depth--;
  } else {
    // Only print divs and sections up to depth 4
    if (depth <= 4 && (/^\s*<(div|section|h2|p|button)/i.test(tagText))) {
      console.log('  '.repeat(depth) + tagText.replace(/\s+/g, ' ').substring(0, 120));
    }
    if (!isSelfClosing) {
      depth++;
    }
  }
}
