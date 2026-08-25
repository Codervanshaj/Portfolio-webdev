const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'raw-about.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const cardsData = [];

for (let i = 1; i <= 7; i++) {
  const cardStartStr = `class="about-card-wrap ac-${i}"`;
  const nextCardStartStr = i < 7 ? `class="about-card-wrap ac-${i+1}"` : 'class="about-timeline-wrap"';
  
  let startIdx = htmlContent.indexOf(cardStartStr);
  if (startIdx === -1) {
    console.log(`Card ac-${i} not found`);
    continue;
  }
  
  let divStart = htmlContent.lastIndexOf('<div', startIdx);
  let endIdx = htmlContent.indexOf(nextCardStartStr);
  if (endIdx === -1) {
    endIdx = htmlContent.indexOf('class="mobile-timeline-wrap"');
  }
  let divEnd = htmlContent.lastIndexOf('</div>', endIdx);
  
  const cardHtml = htmlContent.slice(divStart, divEnd);
  
  const originMatch = cardHtml.match(/data-origin="([^"]+)"/);
  const connectMatch = cardHtml.match(/data-connect="([^"]+)"/);
  const origin = originMatch ? originMatch[1] : '';
  const connect = connectMatch ? connectMatch[1] : '';
  
  const yearCountMatch = cardHtml.match(/data-number-count="([^"]+)"/);
  const yearText = yearCountMatch ? yearCountMatch[1] : '';
  
  // Extract heading from aria-label
  const headingMatch = cardHtml.match(/<h3[^>]*aria-label="([^"]+)"/);
  const heading = headingMatch ? headingMatch[1] : '';
  
  // Extract description from aria-label inside op80
  const descMatch = cardHtml.match(/class="[^"]*op80[^"]*"[^>]*aria-label="([^"]+)"/) || cardHtml.match(/aria-label="([^"]+)"[^>]*class="[^"]*op80[^"]*"/);
  const description = descMatch ? descMatch[1] : '';
  
  // Extract images
  const imgRegex = /<img([^>]+)>/g;
  let imgMatch;
  const allImages = [];
  
  while ((imgMatch = imgRegex.exec(cardHtml)) !== null) {
    const attrs = imgMatch[1];
    const srcM = attrs.match(/src="([^"]+)"/);
    const altM = attrs.match(/alt="([^"]*)"/);
    const classM = attrs.match(/class="([^"]*)"/);
    
    if (srcM) {
      allImages.push({
        src: srcM[1],
        alt: altM ? altM[1] : '',
        className: classM ? classM[1] : ''
      });
    }
  }
  
  const popupWrapIdx = cardHtml.indexOf('class="popup-card-wrap"');
  const cardImages = [];
  const popupImages = [];
  
  allImages.forEach(img => {
    const idxInCard = cardHtml.indexOf(img.src);
    if (popupWrapIdx !== -1 && idxInCard >= popupWrapIdx) {
      popupImages.push(img);
    } else {
      cardImages.push(img);
    }
  });
  
  // Extract bottom text from aria-label
  const bottomTextMatch = cardHtml.match(/class="[^"]*about-card-bottom-text[^"]*"[^>]*aria-label="([^"]+)"/) || cardHtml.match(/aria-label="([^"]+)"[^>]*class="[^"]*about-card-bottom-text[^"]*"/);
  const bottomText = bottomTextMatch ? bottomTextMatch[1] : '';
  
  let popupData = null;
  if (popupWrapIdx !== -1) {
    const popupHtml = cardHtml.slice(popupWrapIdx);
    
    // Popup Year
    const popupYearMatch = popupHtml.match(/<div[^>]*>([0-9]{4})<\/div>/);
    const popupYear = popupYearMatch ? popupYearMatch[1] : '';
    
    // Popup Heading
    const popupHeadingMatch = popupHtml.match(/<h4[^>]*class="popup-heading"[^>]*>([\s\S]*?)<\/h4>/);
    const popupHeading = popupHeadingMatch ? popupHeadingMatch[1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : '';
    
    // Popup Body (we extract inside <p> tag)
    const popupBodyMatch = popupHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/);
    const popupBody = popupBodyMatch ? popupBodyMatch[1].replace(/<[^>]*>/g, '\n').replace(/\s+/g, ' ').trim() : '';
    
    popupData = {
      year: popupYear,
      heading: popupHeading,
      body: popupBody,
      images: popupImages
    };
  }
  
  const cardTagMatch = cardHtml.match(/<div[^>]*class="about-card"[^>]*>/);
  const cardAnim = {};
  if (cardTagMatch) {
    ['data-tl-from', 'data-tl-to', 'data-tl-start', 'data-tl-end', 'data-tl-trigger', 'data-tl-type', 'data-tl-once', 'data-tl-split'].forEach(attr => {
      const m = cardTagMatch[0].match(new RegExp(`${attr}="([^"]*)"`));
      if (m) {
        cardAnim[attr] = m[1];
      }
    });
  }
  
  const pointLineTagMatch = cardHtml.match(/<div[^>]*class="about-card-point-line"[^>]*>/);
  const lineAnim = {};
  if (pointLineTagMatch) {
    ['data-tl-from', 'data-tl-to', 'data-tl-start', 'data-tl-end', 'data-tl-trigger', 'data-tl-type', 'data-tl-once', 'data-tl-split'].forEach(attr => {
      const m = pointLineTagMatch[0].match(new RegExp(`${attr}="([^"]*)"`));
      if (m) {
        lineAnim[attr] = m[1];
      }
    });
  }
  
  cardsData.push({
    id: `ac-${i}`,
    origin,
    connect,
    yearText,
    heading,
    description,
    images: cardImages,
    bottomText,
    popup: popupData,
    cardAnim,
    lineAnim
  });
}

console.log('Parsed', cardsData.length, 'cards.');
fs.writeFileSync(path.join(__dirname, 'extracted-cards.json'), JSON.stringify(cardsData, null, 2));
console.log('Saved cards data to extracted-cards.json');
