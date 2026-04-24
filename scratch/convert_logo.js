const sharp = require('sharp');
const fs = require('fs');

async function processLogo() {
  try {
    const inputPath = './public/logo.webp';
    const outputPath = './public/logo-dark.webp';

    // Get raw pixel data
    const { data, info } = await sharp(inputPath)
      .raw()
      .toBuffer({ resolveWithObject: true });

    // data is a Buffer of pixels (channels: 3 or 4 depending on image)
    const channels = info.channels;
    
    for (let i = 0; i < data.length; i += channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Calculate saturation (difference between max and min channel)
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const diff = max - min;
      
      // If the pixel is mostly grayscale and light (white/gray text)
      if (diff < 30 && max > 100) {
        // Change it to black (or dark gray)
        data[i] = 0;     // R
        data[i + 1] = 0; // G
        data[i + 2] = 0; // B
        // Leave alpha (data[i+3]) as is
      }
    }

    // Save the new image
    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: channels
      }
    })
    .webp()
    .toFile(outputPath);

    console.log('Successfully created logo-dark.webp');
  } catch (error) {
    console.error('Error processing logo:', error);
  }
}

processLogo();
