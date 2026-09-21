import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const contentRoot = join(root, 'src', 'content');
const experienceFile = join(root, 'src', 'data', 'experiences', 'walking.ts');
const experienceSource = existsSync(experienceFile) ? readFileSync(experienceFile, 'utf8') : '';
const errors = [];

function nestedValue(text, field) {
  const line = text.split('\n').find((candidate) => candidate.trimStart().startsWith(field + ':'));
  if (!line) return undefined;
  return line.slice(line.indexOf(':') + 1).trim().replace(/^["']|["']$/g, '');
}

function normalizedToken(input) {
  return (input ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function block(text, field) {
  return text.match(new RegExp('^' + field + ':\\s*\\n([\\s\\S]*?)(?=^[a-zA-Z][a-zA-Z0-9]*:|^---\\s*$)', 'm'))?.[1] ?? '';
}

function value(text, field) {
  return text.match(new RegExp('^' + field + ':\\s*["\\\']?([^\\n"\\\']+)["\\\']?\\s*$', 'm'))?.[1]?.trim();
}

const files = walk(contentRoot).filter((file) => /\.(md|mdx)$/.test(file));
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  if (value(text, 'status') !== 'published' || value(text, 'spatialExperienceVersion') !== '1') continue;

  const display = relative(root, file);
  const slug = value(text, 'slug');
  const heroImage = block(text, 'heroImage');
  const heroVideo = block(text, 'heroVideo');

  if (!slug) errors.push(`${display}: Spatial Experience v1 requires a parseable slug`);
  if (!heroImage) errors.push(`${display}: Spatial Experience v1 requires heroImage poster/fallback`);
  if (!heroVideo) {
    errors.push(`${display}: Spatial Experience v1 requires heroVideo`);
  } else {
    const status = nestedValue(heroVideo, 'status');
    const src = nestedValue(heroVideo, 'src');
    const poster = nestedValue(heroVideo, 'poster');
    const mediaDestination = nestedValue(heroVideo, 'destination');
    const articleDestination = value(text, 'destination');
    if (status !== 'approved') errors.push(`${display}: Spatial Experience v1 heroVideo must be approved`);
    if (!src?.startsWith('/')) errors.push(`${display}: Spatial Experience v1 heroVideo must be local`);
    if (!poster?.startsWith('/')) errors.push(`${display}: Spatial Experience v1 heroVideo poster must be local`);
    if (!mediaDestination) {
      errors.push(`${display}: Spatial Experience v1 heroVideo requires explicit destination provenance`);
    } else if (normalizedToken(mediaDestination) !== normalizedToken(articleDestination)) {
      errors.push(`${display}: heroVideo destination provenance (${mediaDestination}) does not match article destination (${articleDestination})`);
    }
    if (src && articleDestination && !normalizedToken(src).includes(normalizedToken(articleDestination))) {
      errors.push(`${display}: heroVideo path must identify the article destination to prevent cross-destination asset reuse`);
    }
    for (const [label, media] of [['video', src], ['poster', poster]]) {
      if (media?.startsWith('/') && !existsSync(join(root, 'public', media.slice(1)))) {
        errors.push(`${display}: Spatial Experience v1 ${label} file missing: ${media}`);
      }
    }
  }

  if (slug) {
    const escaped = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const entry = experienceSource.match(new RegExp(`['"]${escaped}['"]\\s*:\\s*\\{([\\s\\S]*?)(?=\\n\\s{2}['"][a-z0-9-]+['"]\\s*:\\s*\\{|\\n\\};)`))?.[1] ?? '';
    if (!entry) {
      errors.push(`${display}: Spatial Experience v1 requires an experience dataset in src/data/experiences/walking.ts`);
    } else {
      const routeMode = entry.match(/routeMode:\s*['"](editorial|walking)['"]/)?.[1];
      const poiCount = (entry.match(/\n\s{6}\{\n\s{8}id:/g) || []).length;
      if (!routeMode) errors.push(`${display}: Spatial Experience v1 requires routeMode editorial or walking`);
      if (poiCount < 2) errors.push(`${display}: Spatial Experience v1 requires at least two POIs`);
      if (routeMode === 'walking') {
        const routeUrl = entry.match(/routeUrl:\s*['"]([^'"]+)['"]/)?.[1];
        if (!routeUrl?.startsWith('/')) errors.push(`${display}: walking Spatial Experience requires a local routeUrl`);
        if (routeUrl?.startsWith('/') && !existsSync(join(root, 'public', routeUrl.slice(1)))) {
          errors.push(`${display}: walking route file missing: ${routeUrl}`);
        }
      }
    }
  }
}

if (errors.length) {
  console.error('\nSpatial Experience validation failed:\n');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Spatial Experience validation passed. Legacy published content without spatialExperienceVersion remains grandfathered.');
