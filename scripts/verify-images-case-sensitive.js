#!/usr/bin/env node

/**
 * Case-Sensitive Image Verification Script
 * Verifies that all /Images/... references in code match actual files (case-sensitive)
 * This is critical for Vercel's Linux filesystem which is case-sensitive
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname, relative, sep } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const publicImagesDir = join(projectRoot, 'public', 'Images');
const srcDir = join(projectRoot, 'src');

// Recursively get all files in a directory
function getAllFiles(dir, basePath = '') {
  const files = [];
  try {
    const items = readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = join(dir, item.name);
      const relativePath = basePath ? `${basePath}/${item.name}` : item.name;
      
      if (item.isDirectory()) {
        files.push(...getAllFiles(fullPath, relativePath));
      } else if (/\.(jpg|jpeg|png|gif|svg|webp|mp4|JPG|JPEG|PNG|GIF|SVG|WEBP|MP4)$/i.test(item.name)) {
        // Normalize to /Images/... path format
        const normalizedPath = relativePath.replace(/\\/g, '/');
        const imagePath = `/Images/${normalizedPath}`;
        files.push({
          fsPath: fullPath,
          imagePath: imagePath,
          actualPath: normalizedPath
        });
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not read ${dir}:`, error.message);
  }
  return files;
}

// Extract all /Images/... references from source files
function findImageReferences(dir, extensions = ['.tsx', '.ts', '.jsx', '.js']) {
  const imagePaths = new Set();
  const files = readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = join(dir, file.name);
    
    if (file.isDirectory()) {
      if (!['node_modules', 'dist', 'build', '.git', '.vscode'].includes(file.name)) {
        const refs = findImageReferences(fullPath, extensions);
        refs.forEach(ref => imagePaths.add(ref));
      }
    } else if (extensions.some(ext => file.name.endsWith(ext))) {
      try {
        const content = readFileSync(fullPath, 'utf-8');
        
        // Match image paths: /Images/... (including URL-encoded)
        const imageRegex = /['"`](\/Images\/[^'"`]+)['"`]/g;
        let match;
        while ((match = imageRegex.exec(content)) !== null) {
          const imagePath = match[1];
          // Store the path as-is (will be decoded during matching)
          imagePaths.add(imagePath);
        }
      } catch (error) {
        console.warn(`Warning: Could not read ${fullPath}:`, error.message);
      }
    }
  }

  return imagePaths;
}

// Case-sensitive file check
function findMatchingFile(imagePath, actualFiles) {
  // Remove leading /Images/ and normalize
  let pathWithoutPrefix = imagePath.replace(/^\/Images\//, '');
  
  // Decode URL-encoded paths (e.g., Product%20image_baler.jpg -> Product image_baler.jpg)
  let decodedPath = pathWithoutPrefix;
  try {
    decodedPath = decodeURIComponent(pathWithoutPrefix);
  } catch (e) {
    // Invalid encoding, keep original
  }
  
  // Normalize path separators
  decodedPath = decodedPath.replace(/\\/g, '/');
  pathWithoutPrefix = pathWithoutPrefix.replace(/\\/g, '/');
  
  // Try exact match first with decoded path (case-sensitive)
  const exactMatch = actualFiles.find(f => {
    const normalized = f.actualPath.replace(/\\/g, '/');
    return normalized === decodedPath;
  });
  if (exactMatch) return exactMatch;
  
  // Try matching by checking if file exists on filesystem (for edge cases like special characters)
  const pathParts = decodedPath.split('/');
  const filename = pathParts[pathParts.length - 1];
  const dirPath = pathParts.slice(0, -1).join('/');
  const fullDirPath = dirPath ? join(publicImagesDir, dirPath) : publicImagesDir;
  if (existsSync(fullDirPath)) {
    try {
      const dirFiles = readdirSync(fullDirPath);
      const matchingFile = dirFiles.find(f => {
        // Try exact match
        if (f === filename) return true;
        // Try with ? replaced by space and vice versa (for edge cases)
        const fNoSpecial = f.replace(/\?/g, ' ').replace(/\s+/g, ' ');
        const filenameNoSpecial = filename.replace(/\?/g, ' ').replace(/\s+/g, ' ');
        if (fNoSpecial === filenameNoSpecial) return true;
        return false;
      });
      if (matchingFile) {
        const fullPath = join(fullDirPath, matchingFile);
        const relativePath = relative(publicImagesDir, fullPath).replace(/\\/g, '/');
        return {
          fsPath: fullPath,
          imagePath: `/Images/${relativePath}`,
          actualPath: relativePath
        };
      }
    } catch (e) {
      // Directory doesn't exist or can't read
    }
  }
  
  // Try exact match with encoded path (in case file has % in name, unlikely)
  const encodedMatch = actualFiles.find(f => {
    const normalized = f.actualPath.replace(/\\/g, '/');
    return normalized === pathWithoutPrefix;
  });
  if (encodedMatch) return encodedMatch;
  
  // Try case-insensitive match (to detect case issues)
  const caseInsensitiveMatch = actualFiles.find(f => {
    const normalized = f.actualPath.replace(/\\/g, '/');
    return normalized.toLowerCase() === decodedPath.toLowerCase();
  });
  if (caseInsensitiveMatch) {
    return { ...caseInsensitiveMatch, caseMismatch: true };
  }
  
  return null;
}

// Main verification
function verifyImages() {
  console.log('🔍 Case-Sensitive Image Verification\n');
  console.log('=' .repeat(60));
  
  // Get all actual image files
  console.log('\n📁 Scanning public/Images directory...');
  const actualFiles = getAllFiles(publicImagesDir);
  console.log(`   Found ${actualFiles.length} image files\n`);
  
  // Get all image references from code
  console.log('📝 Scanning src/ directory for image references...');
  const imageReferences = findImageReferences(srcDir);
  console.log(`   Found ${imageReferences.size} unique image references\n`);
  
  console.log('=' .repeat(60));
  console.log('\n🔍 Verifying references...\n');
  
  const missing = [];
  const found = [];
  const caseMismatches = [];
  
  for (const imagePath of imageReferences) {
    const match = findMatchingFile(imagePath, actualFiles);
    
    if (!match) {
      missing.push(imagePath);
    } else if (match.caseMismatch) {
      caseMismatches.push({
        referenced: imagePath,
        actual: `/Images/${match.actualPath}`
      });
    } else {
      found.push(imagePath);
    }
  }
  
  // Report results
  console.log(`✅ Found (exact match): ${found.length}`);
  console.log(`⚠️  Case mismatches: ${caseMismatches.length}`);
  console.log(`❌ Missing: ${missing.length}\n`);
  
  // Report case mismatches
  if (caseMismatches.length > 0) {
    console.log('⚠️  CASE MISMATCHES (will fail on Vercel):');
    caseMismatches.forEach(({ referenced, actual }) => {
      console.log(`   Referenced: ${referenced}`);
      console.log(`   Actual:     ${actual}`);
      console.log('');
    });
  }
  
  // Report missing files
  if (missing.length > 0) {
    console.log('❌ MISSING IMAGES:');
    missing.forEach(path => {
      const decoded = decodeURIComponent(path.replace(/^\/Images\//, ''));
      console.log(`   Referenced: ${path}`);
      console.log(`   Decoded:    ${decoded}`);
      // Try to find similar files
      const similar = actualFiles.filter(f => 
        f.actualPath.toLowerCase().includes(decoded.toLowerCase().split('/').pop()?.toLowerCase() || '')
      );
      if (similar.length > 0) {
        console.log(`   Similar files found:`);
        similar.slice(0, 3).forEach(f => console.log(`     - ${f.actualPath}`));
      }
      console.log('');
    });
  }
  
  // Summary
  const hasErrors = missing.length > 0 || caseMismatches.length > 0;
  
  if (hasErrors) {
    console.log('=' .repeat(60));
    console.log('❌ VERIFICATION FAILED');
    console.log(`   ${missing.length} missing images`);
    console.log(`   ${caseMismatches.length} case mismatches`);
    console.log('\n⚠️  Build will fail. Please fix the issues above.');
    process.exit(1);
  } else {
    console.log('=' .repeat(60));
    console.log('✅ VERIFICATION PASSED');
    console.log('   All image references have matching files (case-sensitive)');
    process.exit(0);
  }
}

verifyImages();

