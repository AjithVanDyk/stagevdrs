/**
 * Translation Completeness Audit Script
 * Checks that all English translation keys have French and Spanish equivalents
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read translations file
const translationsPath = path.join(__dirname, '../src/config/translations.ts');
const translationsContent = fs.readFileSync(translationsPath, 'utf-8');

// Extract translation keys using regex (simple approach)
function extractKeys(obj, prefix = '') {
  const keys = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys.push(...extractKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

// Parse translations (simplified - assumes valid TypeScript)
function parseTranslations() {
  // Extract the translations object using regex
  const enMatch = translationsContent.match(/en:\s*\{([\s\S]*?)\n\s*\},/);
  const frMatch = translationsContent.match(/fr:\s*\{([\s\S]*?)\n\s*\},/);
  const esMatch = translationsContent.match(/es:\s*\{([\s\S]*?)\n\s*\},/);

  if (!enMatch || !frMatch || !esMatch) {
    console.error('Could not parse translations file');
    process.exit(1);
  }

  // For a more accurate check, we'd need to actually evaluate the TypeScript
  // For now, use a simpler approach: count keys by pattern matching
  const enKeys = (enMatch[1].match(/^\s*[a-zA-Z_][a-zA-Z0-9_]*:/gm) || []).length;
  const frKeys = (frMatch[1].match(/^\s*[a-zA-Z_][a-zA-Z0-9_]*:/gm) || []).length;
  const esKeys = (esMatch[1].match(/^\s*[a-zA-Z_][a-zA-Z0-9_]*:/gm) || []).length;

  return { enKeys, frKeys, esKeys };
}

// Check for placeholder text
function checkPlaceholders() {
  const placeholders = ['TODO', 'TRANSLATE', 'FIXME', 'XXX', 'TBD'];
  const issues = [];

  placeholders.forEach(placeholder => {
    const regex = new RegExp(placeholder, 'gi');
    const matches = translationsContent.match(regex);
    if (matches) {
      issues.push(`Found ${matches.length} instances of "${placeholder}" placeholder text`);
    }
  });

  return issues;
}

// Main audit
console.log('🔍 Running Translation Completeness Audit...\n');

const { enKeys, frKeys, esKeys } = parseTranslations();
const placeholderIssues = checkPlaceholders();

console.log('📊 Translation Key Counts:');
console.log(`  English: ${enKeys} keys`);
console.log(`  French:  ${frKeys} keys`);
console.log(`  Spanish: ${esKeys} keys\n`);

if (frKeys < enKeys) {
  console.log(`⚠️  WARNING: French has ${enKeys - frKeys} fewer keys than English`);
}

if (esKeys < enKeys) {
  console.log(`⚠️  WARNING: Spanish has ${enKeys - esKeys} fewer keys than English`);
}

if (frKeys === enKeys && esKeys === enKeys) {
  console.log('✅ All languages have the same number of keys');
}

if (placeholderIssues.length > 0) {
  console.log('\n⚠️  Placeholder Text Found:');
  placeholderIssues.forEach(issue => console.log(`  - ${issue}`));
} else {
  console.log('\n✅ No placeholder text found');
}

console.log('\n📝 Note: This is a basic audit. For complete verification,');
console.log('   manually review the translations.ts file to ensure all');
console.log('   nested keys are properly translated.\n');









