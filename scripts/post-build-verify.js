#!/usr/bin/env node

/**
 * Post-Build Verification Script
 * Verifies that images are present in dist/Images after build
 */

import { existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const distImagesPath = join(process.cwd(), 'dist', 'Images');
const publicImagesPath = join(process.cwd(), 'public', 'Images');

console.log('🔍 Verifying build output...\n');

// Check if dist/Images exists
if (!existsSync(distImagesPath)) {
  console.error('❌ ERROR: dist/Images directory does not exist!');
  console.error('   This means images were not copied during build.');
  process.exit(1);
}

// Count images in dist
function countImages(dir) {
  let count = 0;
  try {
    const items = readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = join(dir, item.name);
      if (item.isDirectory()) {
        count += countImages(fullPath);
      } else if (/\.(jpg|jpeg|png|gif|svg|webp|JPG|JPEG|PNG)$/i.test(item.name)) {
        count++;
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not read ${dir}:`, error.message);
  }
  return count;
}

const distImageCount = countImages(distImagesPath);
const publicImageCount = existsSync(publicImagesPath) ? countImages(publicImagesPath) : 0;

console.log(`📊 Image Count:`);
console.log(`   public/Images: ${publicImageCount} images`);
console.log(`   dist/Images: ${distImageCount} images\n`);

if (distImageCount === 0) {
  console.error('❌ ERROR: No images found in dist/Images!');
  console.error('   Images were not copied during the build process.');
  process.exit(1);
}

if (distImageCount < publicImageCount * 0.9) {
  console.warn(`⚠️  WARNING: Only ${distImageCount} of ${publicImageCount} images were copied.`);
  console.warn('   Some images may be missing in the build.');
} else {
  console.log('✅ Images successfully copied to dist/Images');
}

// Check for common image files
const criticalImages = [
  'first.jpg',
  'image-1749759459073.png',
  'bollegraaf-new-1.jpg',
  'van-dyk-direct-logo.png'
];

console.log('\n🔍 Checking critical images...');
let missingCritical = 0;

for (const img of criticalImages) {
  const imgPath = join(distImagesPath, img);
  if (existsSync(imgPath)) {
    console.log(`   ✅ ${img}`);
  } else {
    console.log(`   ❌ ${img} - MISSING`);
    missingCritical++;
  }
}

if (missingCritical > 0) {
  console.error(`\n❌ ERROR: ${missingCritical} critical images are missing!`);
  process.exit(1);
}

console.log('\n✅ Build verification complete! All images are present.');
process.exit(0);

