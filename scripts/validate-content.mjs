import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const contentRoot = join(root, 'src', 'content');
const publicLaunch = process.env.PUBLIC_LAUNCH === 'true';

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const files = walk(contentRoot).filter((file) => /.(md|mdx)$/.test(file));
const errors = [];

for (const file of files) {
  const text = readFileSync(file, 'utf8');
  const display = relative(root, file);
  const required = ['title:', 'description:', 'slug:', 'type:', 'datePublished:', 'dateReviewed:', 'reviewAfter:', 'status:', 'sources:', 'editorialApproval:'];

  for (const field of required) {
    if (!text.includes(field)) errors.push(`${display}: missing ${field}`);
  }

  const slug = text.match(/^slug:\s*["']?([a-z0-9-]+)["']?\s*$/m)?.[1];
  const status = text.match(/^status:\s*["']?([a-z]+)["']?\s*$/m)?.[1];

  if (status === 'published') {
    if (!/editorialApproval:\s*true/.test(text)) {
      errors.push(`${display}: published content requires editorialApproval: true`);
    }
    if (!slug) {
      errors.push(`${display}: published content requires a parseable slug`);
    } else {
      const curation = join(root, 'research', slug, 'curation.md');
      if (!existsSync(curation)) errors.push(`${display}: missing ${relative(root, curation)}`);
    }
  }

  if (text.includes('heroImage:')) {
    for (const field of ['source:', 'creator:', 'sourceUrl:', 'license:', 'downloaded:']) {
      if (!text.includes(field)) errors.push(`${display}: heroImage missing ${field}`);
    }
  }

  if (text.includes('<AffiliateBox')) {
    if (!/affiliateDisclosure:\s*true/.test(text)) {
      errors.push(`${display}: AffiliateBox requires affiliateDisclosure: true`);
    }
  }
}

const affiliateComponent = join(root, 'src', 'components', 'commercial', 'AffiliateBox.astro');
if (existsSync(affiliateComponent)) {
  const text = readFileSync(affiliateComponent, 'utf8');
  if (!text.includes('rel="sponsored noopener"')) {
    errors.push('AffiliateBox.astro must enforce rel="sponsored noopener"');
  }
  if (!text.includes('Werbung') && !text.includes('AffiliateDisclosure')) {
    errors.push('AffiliateBox.astro must expose a visible commercial disclosure');
  }
}

const legalPages = ['impressum.astro', 'datenschutz.astro'].map((name) => join(root, 'src', 'pages', name));
for (const page of legalPages) {
  if (!existsSync(page)) errors.push(`missing legal page: ${relative(root, page)}`);
}

if (publicLaunch) {
  for (const page of legalPages) {
    if (!existsSync(page)) continue;
    const text = readFileSync(page, 'utf8');
    if (
      text.includes('Dummy') ||
      text.includes('[Vorname Nachname') ||
      text.includes('[E-Mail-Adresse]') ||
      text.includes('[TT.MM.JJJJ]')
    ) {
      errors.push(`${relative(root, page)}: PUBLIC_LAUNCH=true is blocked while dummy legal placeholders remain`);
    }
  }
}

if (errors.length) {
  console.error('\nContent validation failed:\n');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Content validation passed for ${files.length} content file(s).`);
if (!publicLaunch) {
  console.log('PUBLIC_LAUNCH is not enabled; dummy legal pages may remain for preview/development only.');
}
