const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
  const sharp = require('sharp');
  
  async function processIcon() {
    const iconPath = path.join(__dirname, 'assets', 'icon_source.png');
    const outPath = path.join(__dirname, 'assets', 'icon.png');
    
    const metadata = await sharp(iconPath).metadata();
    console.log(`Original size: ${metadata.width}x${metadata.height}`);
    
    // Crop 18% from all sides to capture just the inner textured square
    const cropAmount = Math.floor(metadata.width * 0.18); 
    const extractSize = metadata.width - (cropAmount * 2);
    
    await sharp(iconPath)
      .extract({ left: cropAmount, top: cropAmount, width: extractSize, height: extractSize })
      .resize(metadata.width, metadata.height)
      .toFile(outPath);
      
    console.log('Successfully zoomed and cropped the new source image.');
    
    // update splash
    fs.copyFileSync(outPath, path.join(__dirname, 'assets', 'splash.png'));
  }
  
  processIcon();
} catch (e) {
  console.error(e);
}
