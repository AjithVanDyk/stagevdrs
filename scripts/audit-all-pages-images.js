#!/usr/bin/env node

/**
 * Comprehensive Image Audit Script
 * Checks all 50 pages for image references and verifies they exist
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const publicImagesDir = join(projectRoot, 'public', 'Images');
const srcDir = join(projectRoot, 'src');

// Get all actual image files
function getAllImageFiles(dir, basePath = '') {
  const files = [];
  try {
    const items = readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = join(dir, item.name);
      const relativePath = basePath ? `${basePath}/${item.name}` : item.name;
      
      if (item.isDirectory()) {
        files.push(...getAllImageFiles(fullPath, relativePath));
      } else if (/\.(jpg|jpeg|png|gif|svg|webp|mp4)$/i.test(item.name)) {
        const normalizedPath = relativePath.replace(/\\/g, '/');
        files.push({
          fsPath: fullPath,
          imagePath: `/Images/${normalizedPath}`,
          actualPath: normalizedPath
        });
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not read ${dir}:`, error.message);
  }
  return files;
}

// Extract image references from a file
function extractImageReferences(filePath) {
  const references = new Set();
  try {
    const content = readFileSync(filePath, 'utf-8');
    
    // Match various image path patterns
    const patterns = [
      /['"`](\/Images\/[^'"`]+)['"`]/g,  // String literals
      /src\s*=\s*['"`](\/Images\/[^'"`]+)['"`]/g,  // src attributes
      /url\(['"`]?(\/Images\/[^)'"`]+)['"`]?\)/g,  // CSS url()
      /backgroundImage:\s*['"`]url\(['"`]?(\/Images\/[^)'"`]+)['"`]?\)['"`]/g,  // React style backgroundImage
      /IMAGE_ASSIGNMENTS\.[^}]+['"`](\/Images\/[^'"`]+)['"`]/g,  // IMAGE_ASSIGNMENTS config
    ];
    
    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        references.add(match[1]);
      }
    });
  } catch (error) {
    console.warn(`Warning: Could not read ${filePath}:`, error.message);
  }
  return Array.from(references);
}

// Find all page files
function findPageFiles(dir) {
  const pages = [];
  try {
    const items = readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = join(dir, item.name);
      if (item.isDirectory() && !['node_modules', 'dist', 'build', '.git', '.vscode'].includes(item.name)) {
        pages.push(...findPageFiles(fullPath));
      } else if (item.isFile() && item.name.endsWith('.tsx') && item.name.includes('Page')) {
        pages.push(fullPath);
      }
    }
  } catch (error) {
    // Ignore
  }
  return pages;
}

// Main audit function
function auditAllPages() {
  console.log('🔍 COMPREHENSIVE IMAGE AUDIT FOR ALL 50 PAGES\n');
  console.log('='.repeat(80));
  
  // Get all actual images
  console.log('\n📁 Scanning public/Images directory...');
  const actualImages = getAllImageFiles(publicImagesDir);
  const actualImagePaths = new Set(actualImages.map(f => f.imagePath));
  console.log(`   Found ${actualImages.length} image files\n`);
  
  // Get all page files
  const pagesDir = join(srcDir, 'pages');
  const pageFiles = findPageFiles(pagesDir);
  console.log(`📄 Found ${pageFiles.length} page files\n`);
  
  // Also check components
  const componentsDir = join(srcDir, 'components');
  const componentFiles = findPageFiles(componentsDir);
  console.log(`🧩 Found ${componentFiles.length} component files\n`);
  
  // Also check config
  const configFiles = [
    join(srcDir, 'config', 'images.ts')
  ].filter(f => existsSync(f));
  
  const allFiles = [...pageFiles, ...componentFiles, ...configFiles];
  
  console.log('='.repeat(80));
  console.log('\n📊 AUDIT RESULTS BY FILE:\n');
  
  const issues = [];
  const allReferences = new Set();
  
  for (const filePath of allFiles) {
    const relativePath = relative(srcDir, filePath);
    const imageRefs = extractImageReferences(filePath);
    
    if (imageRefs.length > 0) {
      console.log(`\n📄 ${relativePath}`);
      console.log(`   Found ${imageRefs.length} image reference(s)`);
      
      const fileIssues = [];
      for (const ref of imageRefs) {
        allReferences.add(ref);
        
        // Decode URL-encoded paths
        let decodedRef = ref;
        try {
          decodedRef = decodeURIComponent(ref);
        } catch (e) {
          // Keep original if decode fails
        }
        
        // Check if exists
        const exists = actualImagePaths.has(ref);
        if (!exists) {
          // Try case-insensitive match
          const caseMatch = actualImages.find(f => 
            decodeURIComponent(f.imagePath).toLowerCase() === decodedRef.toLowerCase()
          );
          
          if (caseMatch) {
            fileIssues.push({
              type: 'case-mismatch',
              referenced: ref,
              actual: caseMatch.imagePath
            });
            console.log(`   ⚠️  CASE MISMATCH: ${ref}`);
            console.log(`      Should be: ${caseMatch.imagePath}`);
          } else {
            // Check if path has spaces that need encoding
            const hasSpaces = ref.includes(' ') && !ref.includes('%20');
            if (hasSpaces) {
              fileIssues.push({
                type: 'encoding-needed',
                referenced: ref,
                suggestion: ref.replace(/\s/g, '%20')
              });
              console.log(`   ❌ NEEDS ENCODING: ${ref}`);
            } else {
              fileIssues.push({
                type: 'missing',
                referenced: ref
              });
              console.log(`   ❌ MISSING: ${ref}`);
            }
          }
        } else {
          console.log(`   ✅ ${ref}`);
        }
      }
      
      if (fileIssues.length > 0) {
        issues.push({
          file: relativePath,
          issues: fileIssues
        });
      }
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('\n📊 SUMMARY:\n');
  console.log(`   Total pages/components checked: ${allFiles.length}`);
  console.log(`   Total unique image references: ${allReferences.size}`);
  console.log(`   Files with issues: ${issues.length}`);
  
  const totalIssues = issues.reduce((sum, f) => sum + f.issues.length, 0);
  const missingCount = issues.reduce((sum, f) => 
    sum + f.issues.filter(i => i.type === 'missing').length, 0
  );
  const caseMismatchCount = issues.reduce((sum, f) => 
    sum + f.issues.filter(i => i.type === 'case-mismatch').length, 0
  );
  const encodingCount = issues.reduce((sum, f) => 
    sum + f.issues.filter(i => i.type === 'encoding-needed').length, 0
  );
  
  console.log(`   Total issues found: ${totalIssues}`);
  console.log(`     - Missing images: ${missingCount}`);
  console.log(`     - Case mismatches: ${caseMismatchCount}`);
  console.log(`     - Needs URL encoding: ${encodingCount}`);
  
  // Generate TODO list
  console.log('\n' + '='.repeat(80));
  console.log('\n📋 DETAILED TODO LIST:\n');
  
  let todoNumber = 1;
  for (const fileIssue of issues) {
    console.log(`\n${todoNumber}. ${fileIssue.file}`);
    fileIssue.issues.forEach((issue, idx) => {
      if (issue.type === 'missing') {
        console.log(`   ${todoNumber}.${idx + 1} ❌ MISSING: ${issue.referenced}`);
        console.log(`      Action: Add image file or update reference to existing image`);
      } else if (issue.type === 'case-mismatch') {
        console.log(`   ${todoNumber}.${idx + 1} ⚠️  CASE MISMATCH: ${issue.referenced}`);
        console.log(`      Should be: ${issue.actual}`);
        console.log(`      Action: Update reference to match exact filename case`);
      } else if (issue.type === 'encoding-needed') {
        console.log(`   ${todoNumber}.${idx + 1} 🔧 NEEDS ENCODING: ${issue.referenced}`);
        console.log(`      Should be: ${issue.suggestion}`);
        console.log(`      Action: URL-encode spaces in path`);
      }
    });
    todoNumber++;
  }
  
  console.log('\n' + '='.repeat(80));
  if (totalIssues > 0) {
    console.log('\n❌ AUDIT FAILED - Issues found that need to be fixed');
    process.exit(1);
  } else {
    console.log('\n✅ AUDIT PASSED - All images verified');
    process.exit(0);
  }
}

auditAllPages();

