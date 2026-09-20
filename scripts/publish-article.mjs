import { validateGateForPublish } from './lib/editorial-gate.mjs';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: npm run article:publish -- <slug>');
  process.exit(1);
}

const candidates = [
  join('src','content','guides',`${slug}.mdx`),
  join('src','content','decisions',`${slug}.mdx`),
  join('src','content','destinations',`${slug}.mdx`)
];
const contentPath = candidates.find(existsSync);
if (!contentPath) {
  console.error(`Kein Content für ${slug} gefunden.`);
  process.exit(1);
}

const curationPath = join('research',slug,'curation.md');
if (!existsSync(curationPath)) {
  console.error(`Fehlt: ${curationPath}`);
  process.exit(1);
}
const researchPath = join('research',slug,'research.md');
const research = existsSync(researchPath) ? readFileSync(researchPath,'utf8') : '';
const curation = readFileSync(curationPath,'utf8');
const content = readFileSync(contentPath,'utf8');
const gateErrors = validateGateForPublish({ content, curation, research, slug });
if (gateErrors.length) {
  console.error('Editorial Gate nicht vollständig:');
  for (const error of gateErrors) console.error(`- ${error}`);
  process.exit(1);
}

let text = content;
text = text.replace(/^status:\s*(draft|review)$/m,'status: published');
text = text.replace(/^editorialApproval:\s*false$/m,'editorialApproval: true');
text = text.replace(/^dateReviewed:\s*\d{4}-\d{2}-\d{2}$/m,`dateReviewed: ${new Date().toISOString().slice(0,10)}`);
writeFileSync(contentPath,text);
console.log(`Published: ${contentPath}`);
