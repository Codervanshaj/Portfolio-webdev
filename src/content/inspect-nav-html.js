const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-navigation.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

let depth = 0;
let pos = 0;

console.log('inspecting raw-navigation.html structure:');

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
    if (depth <= 4 && (/^\s*<(div|header|nav|a|p|button)/i.test(tagText))) {
      console.log('  '.repeat(depth) + tagText.replace(/\s+/g, ' ').substring(0, 120));
    }
    if (!isSelfClosing) {
      depth++;
    }
  }
}
