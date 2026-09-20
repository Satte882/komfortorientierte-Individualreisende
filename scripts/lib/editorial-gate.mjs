export const EDITORIAL_GATE_VERSION = 2;

export const LEGACY_EDITORIAL_V1_SLUGS = new Set([
  'paris-kunst-4-tage',
  'andalusien-kultur-9-tage',
  'cordoba-tagesausflug-oder-uebernachten'
]);

// Bereits veröffentlichter v2-Artikel vor Einführung von ICP-Signal-Scan,
// Hypothesen-Review und explizitem Human Gate. Nicht rückwirkend blockieren.
export const LEGACY_EDITORIAL_V2_SLUGS = new Set([
  'munich-altstadt-walk'
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

export const V2_STRICT_RESEARCH_MARKERS = [
  '## ICP-Signal-Scan',
  '### Reibung / realer Aufwand',
  '### Social-Media-Hype vs. Realität',
  '### Tipps & Tricks',
  '### Reale Kosten',
  '### Bessere Alternativen / echte Geheimtipps',
  'Primäre ICP-Problemahypothese:',
  'Stärkste Signale',
  '## Belastbare Fakten',
  '## ICP-Fragen, praktische Hinweise und typische Fehler',
  '## Hypothesen-Review nach vertieftem Research',
  'Finales ICP-Problem:'
];

export function parseFrontmatterValue(text, field) {
  const pattern = new RegExp('^' + field + ':\\s*["\\\']?([^\\n"\\\']+)["\\\']?\\s*$', 'm');
  return text.match(pattern)?.[1]?.trim();
}

export function parseEditorialGateVersion(text) {
  const raw = parseFrontmatterValue(text, 'editorialGateVersion');
  return raw ? Number(raw) : null;
}

function valueAfterLabel(text, label) {
  const escaped = label.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  const sameLine = text.match(new RegExp('^' + escaped + '\\s*(.+)$', 'm'))?.[1]?.trim();
  if (sameLine) return sameLine;
  const nextLine = text.match(new RegExp('^' + escaped + '\\s*$\\n\\s*([^\\n]+)', 'm'))?.[1]?.trim();
  return nextLine || '';
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

  if (/\bTODO\b/i.test(curation)) {
    errors.push('Gate v2 curation.md enthält noch TODO-Platzhalter');
  }

  return errors;
}

export function validateResearchV2(research) {
  const errors = [];

  if (!research) {
    return ['Gate v2 fehlt research.md'];
  }

  for (const marker of V2_STRICT_RESEARCH_MARKERS) {
    if (!research.includes(marker)) {
      errors.push('Gate v2 fehlt in research.md: ' + marker);
    }
  }

  if (/\bTODO\b/i.test(research)) {
    errors.push('Gate v2 research.md enthält noch TODO-Platzhalter');
  }

  const hypothesis = valueAfterLabel(research, 'Primäre ICP-Problemahypothese:');
  if (!hypothesis) {
    errors.push('Gate v2 research.md enthält keine primäre ICP-Problemahypothese');
  }

  const finalProblem = valueAfterLabel(research, 'Finales ICP-Problem:');
  if (!finalProblem) {
    errors.push('Gate v2 research.md enthält kein finales ICP-Problem');
  }

  if (!/^Status:\s*(bestätigt|präzisiert|verworfen)\s*$/m.test(research)) {
    errors.push('Gate v2 Hypothesen-Review braucht Status bestätigt, präzisiert oder verworfen');
  }

  const signalsBlock = research.match(/Stärkste Signale[^\n]*:\s*\n([\s\S]*?)\nSocial-Media-Realitätscheck im öffentlichen Artikel:/)?.[1] ?? '';
  const signalCount = (signalsBlock.match(/^\s*-\s+\S.+$/gm) || []).length;
  if (signalCount < 3) {
    errors.push('Gate v2 research.md braucht mindestens 3 dokumentierte stärkste Signale');
  }

  return errors;
}

export function validateHumanGateV2(curation) {
  const errors = [];

  if (!curation.includes('## Human Gate')) {
    errors.push('Gate v2 fehlt in curation.md: ## Human Gate');
    return errors;
  }

  if (!/- \[[xX]\] Kuration und Decision-Blöcke vom Owner freigegeben/.test(curation)) {
    errors.push('Human Gate ist nicht ausdrücklich freigegeben');
  }

  if (!/- \[[xX]\] Für jeden wesentlichen öffentlichen Hauptabschnitt existiert ein vollständiger Decision-Block/.test(curation)) {
    errors.push('Human Gate bestätigt nicht die vollständige Decision-Block-Abdeckung');
  }

  const approvedBy = curation.match(/^Freigabe durch:\s*(.+)$/m)?.[1]?.trim() ?? '';
  if (!approvedBy || /^TODO\b/i.test(approvedBy)) {
    errors.push('Human Gate braucht Freigabe durch eine konkrete Person');
  }

  if (!/^Freigabe am:\s*\d{4}-\d{2}-\d{2}\s*$/m.test(curation)) {
    errors.push('Human Gate braucht Freigabedatum im Format YYYY-MM-DD');
  }

  return errors;
}

export function validatePublicContentV2(content) {
  return /\bTODO\b/i.test(content)
    ? ['Gate v2 öffentlicher Artikel enthält noch TODO-Platzhalter']
    : [];
}

export function validateGateForPublish({ content, curation, research = '', slug }) {
  const version = parseEditorialGateVersion(content);

  if (version === EDITORIAL_GATE_VERSION) {
    const curationErrors = validateCurationV2(curation);

    if (LEGACY_EDITORIAL_V2_SLUGS.has(slug)) {
      return curationErrors;
    }

    return [
      ...curationErrors,
      ...validateResearchV2(research),
      ...validateHumanGateV2(curation),
      ...validatePublicContentV2(content)
    ];
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
