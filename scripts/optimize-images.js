// Script to compress static images in public/images
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const glob = require("glob");

// Configuration
const SOURCE_DIR = path.join(process.cwd(), "public", "images");
const QUALITY = {
  jpeg: 85,
  webp: 80,
  avif: 75,
  png: 85,
};
const MAX_WIDTH = 1920; // Maximum width for any image

// Function to check if file is an image
function isImage(file) {
  const ext = path.extname(file).toLowerCase();
  return [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext);
}

// Function to compress an image
async function compressImage(filePath) {
  try {
    console.log(`Processing: ${filePath}`);

    // Get file info
    const fileExt = path.extname(filePath).toLowerCase();
    const fileName = path.basename(filePath, fileExt);
    const outputPath = path.join(path.dirname(filePath), fileName + fileExt);

    // Skip GIFs (as they're animations)
    if (fileExt === ".gif") {
      console.log(`  Skipping GIF: ${fileName}${fileExt}`);
      return;
    }

    // Get image metadata
    const metadata = await sharp(filePath).metadata();

    // Don't process already optimized images (check if width is already smaller than MAX_WIDTH)
    if (metadata.width <= MAX_WIDTH) {
      console.log(`  Already optimized: ${fileName}${fileExt}`);
      return;
    }

    // Calculate new width while maintaining aspect ratio
    const newWidth = Math.min(metadata.width, MAX_WIDTH);

    // Determine format-specific options
    let sharpInstance = sharp(filePath).resize(newWidth);

    if (fileExt === ".jpg" || fileExt === ".jpeg") {
      sharpInstance = sharpInstance.jpeg({ quality: QUALITY.jpeg });
    } else if (fileExt === ".png") {
      sharpInstance = sharpInstance.png({ quality: QUALITY.png });
    } else if (fileExt === ".webp") {
      sharpInstance = sharpInstance.webp({ quality: QUALITY.webp });
    }

    // Save the processed image (overwrite original)
    await sharpInstance.toFile(outputPath + ".tmp");

    // Check if the processed file is actually smaller
    const originalSize = fs.statSync(filePath).size;
    const newSize = fs.statSync(outputPath + ".tmp").size;

    if (newSize < originalSize) {
      // Replace the original with the compressed version
      fs.unlinkSync(filePath);
      fs.renameSync(outputPath + ".tmp", outputPath);
      console.log(
        `  Compressed: ${fileName}${fileExt} (${(originalSize / 1024).toFixed(
          2
        )}KB → ${(newSize / 1024).toFixed(2)}KB, ${Math.round(
          (1 - newSize / originalSize) * 100
        )}% reduction)`
      );
    } else {
      // The original was already well compressed, delete the temp file
      fs.unlinkSync(outputPath + ".tmp");
      console.log(`  Original is better: ${fileName}${fileExt}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

// Main function
async function main() {
  try {
    console.log("Starting image compression process...");
    console.log(`Source directory: ${SOURCE_DIR}`);

    // Find all image files
    const files = glob.sync(path.join(SOURCE_DIR, "**", "*.*"));
    const imageFiles = files.filter(isImage);

    console.log(`Found ${imageFiles.length} images to process`);

    // Process images in parallel with a concurrency limit
    const concurrencyLimit = 3;

    // Process in batches
    for (let i = 0; i < imageFiles.length; i += concurrencyLimit) {
      const batch = imageFiles.slice(i, i + concurrencyLimit);
      await Promise.all(batch.map(compressImage));
    }

    console.log("Image compression complete!");
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the script
main();
