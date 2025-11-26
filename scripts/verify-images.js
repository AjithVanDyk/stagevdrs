#!/usr/bin/env node

/**
 * Image Verification Script
 * Verifies that all images referenced in the codebase exist in public/Images
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Get all image paths from the codebase
function findImageReferences(dir, extensions = ['.tsx', '.ts', '.jsx', '.js']) {
  const imagePaths = new Set();
  const files = readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = join(dir, file.name);
    
    // Skip node_modules, dist, and other ignored directories
    if (file.isDirectory()) {
      if (!['node_modules', 'dist', 'build', '.git', '.vscode'].includes(file.name)) {
        imagePaths.add(...findImageReferences(fullPath, extensions));
      }
    } else if (extensions.some(ext => file.name.endsWith(ext))) {
      try {
        const content = readFileSync(fullPath, 'utf-8');
        
        // Match image paths: /Images/... or Images/...
        const imageRegex = /['"`](\/Images\/[^'"`]+)['"`]/g;
        let match;
        while ((match = imageRegex.exec(content)) !== null) {
          const imagePath = match[1];
          // Decode URL-encoded paths for file system check
          const decodedPath = decodeURIComponent(imagePath);
          imagePaths.add(decodedPath);
        }
      } catch (error) {
        console.warn(`Warning: Could not read ${fullPath}:`, error.message);
      }
    }
  }

  return Array.from(imagePaths);
}

// Check if image exists
function checkImageExists(imagePath) {
  // Remove leading slash and convert to file system path
  const fsPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  const fullPath = join(projectRoot, 'public', fsPath);
  
  return existsSync(fullPath);
}

// Main verification
function verifyImages() {
  console.log('🔍 Scanning codebase for image references...\n');
  
  const srcDir = join(projectRoot, 'src');
  const imageReferences = findImageReferences(srcDir);
  
  console.log(`Found ${imageReferences.length} image references\n`);
  
  const missing = [];
  const found = [];
  
  for (const imagePath of imageReferences) {
    if (checkImageExists(imagePath)) {
      found.push(imagePath);
    } else {
      missing.push(imagePath);
    }
  }
  
  console.log(`✅ Found: ${found.length} images`);
  console.log(`❌ Missing: ${missing.length} images\n`);
  
  if (missing.length > 0) {
    console.log('Missing images:');
    missing.forEach(path => console.log(`  - ${path}`));
    console.log('\n⚠️  Some images are missing. Please check the paths above.');
    process.exit(1);
  } else {
    console.log('✅ All images are present!');
    process.exit(0);
  }
}

verifyImages();

