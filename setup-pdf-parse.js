// setup-pdf-parse.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create directories needed for pdf-parse
const testDir = path.join(__dirname, 'test', 'data');
fs.mkdirSync(testDir, { recursive: true });

// Create a simple empty PDF file
const testFile = path.join(testDir, '05-versions-space.pdf');
fs.writeFileSync(testFile, '%PDF-1.3\n1 0 obj\n<< /Type /Catalog >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF');

console.log('Created test file for pdf-parse:', testFile);