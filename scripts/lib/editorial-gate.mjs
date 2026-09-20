export const EDITORIAL_GATE_VERSION = 2;

export const LEGACY_EDITORIAL_V1_SLUGS = new Set([
  'paris-kunst-4-tage',
  'andalusien-kultur-9-tage',
  'cordoba-tagesausflug-oder-uebernachten'
]);

export const V2_REQUIRED_MARKERS = [
  '## Entscheidungsblöcke',
  'ICP-Frage:',
  'Entscheidung:',
  'Zeit / Aufwand:',
  'Bewusst weglassen / Alternative:',
  'Insight:',
  'Affiliate-Prüfung:',
  '## Full Article Review',
  '## Redaktionsfreigabe'
];

export function parseFrontmatterValue(text, field) {
  const pattern = new RegExp('^' + field + ':\\s*["\\\']?([^\\n"\\\']+)["\\\']?\\s*$', 'm');
  return text.match(pattern)?.[1]?.trim();
}

export function parseEditorialGateVersion(text) {
  const raw = parseFrontmatterValue(text, 'editorialGateVersion');
  return raw ? Number(raw) : null;
}

export function validateCurationV2(curation) {
  const errors = [];

  for (const marker of V2_REQUIRED_MARKERS) {
    if (!curation.includes(marker)) {
      errors.push('Gate v2 fehlt in curation.md: ' + marker);
    }
  }

  const unchecked = (curation.match(/- \[ \]/g) || []).length;
  if (unchecked) {
    errors.push('Gate v2 hat noch ' + unchecked + ' offene Checkbox(en)');
  }

  return errors;
}

export function validateGateForPublish({ content, curation, slug }) {
  const version = parseEditorialGateVersion(content);

  if (version === EDITORIAL_GATE_VERSION) {
    return validateCurationV2(curation);
  }

  if (LEGACY_EDITORIAL_V1_SLUGS.has(slug)) {
    return [];
  }

  return [
    'Neue oder bewusst überarbeitete Inhalte müssen editorialGateVersion: ' +
      EDITORIAL_GATE_VERSION +
      ' verwenden'
  ];
}
