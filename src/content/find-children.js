const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'heynesh-page.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// We want to find the children of page-wrap
// page-wrap is defined as <div class="page-wrap">...</div>
// Let's write a script that does a basic match or parses the HTML to find direct children of page-wrap

const pageWrapIndex = htmlContent.indexOf('class="page-wrap"');
if (pageWrapIndex === -1) {
  console.log('page-wrap not found');
  process.exit(1);
}

// Let's find all tags immediately inside <div class="page-wrap">
const subContent = htmlContent.slice(pageWrapIndex);
// Let's find tags of the format <something class="something"> or <something>
// we can search for direct children of the page-wrap div.
// To do this simply, let's search for '<div class="' or similar and print their hierarchy.
// Let's use a regex to look at the next few opening tags that aren't deeply nested.
// Or we can just count div nesting.
let depth = 0;
let pos = htmlContent.indexOf('<div class="page-wrap"');
if (pos === -1) pos = htmlContent.indexOf("<div class='page-wrap'");

console.log('Start position:', pos);
const children = [];

// Parse simple tokens
let currentPos = pos + 22; // length of <div class="page-wrap"> or similar
let tagCount = 0;

while (currentPos < htmlContent.length && tagCount < 20) {
  const nextTag = htmlContent.indexOf('<', currentPos);
  if (nextTag === -1) break;
  
  // check if it is closing or opening tag
  const isClosing = htmlContent[nextTag + 1] === '/';
  const tagEnd = htmlContent.indexOf('>', nextTag);
  const tagText = htmlContent.slice(nextTag, tagEnd + 1);
  
  if (isClosing) {
    depth--;
    if (depth === -1) {
      // reached end of page-wrap
      console.log('Reached end of page-wrap');
      break;
    }
  } else {
    // Check if it's self-closing like <img />
    const isSelfClosing = tagText.endsWith('/>') || tagText.startsWith('<img') || tagText.startsWith('<br') || tagText.startsWith('<link') || tagText.startsWith('<meta') || tagText.startsWith('<input');
    
    if (depth === 0) {
      children.push({ tagText, depth });
    }
    
    if (!isSelfClosing) {
      depth++;
    }
  }
  
  currentPos = tagEnd + 1;
  tagCount++;
}

console.log('Direct children of page-wrap:');
children.forEach(c => console.log('  ', c.tagText));
