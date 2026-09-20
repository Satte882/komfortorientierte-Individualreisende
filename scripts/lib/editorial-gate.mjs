export const EDITORIAL_GATE_VERSION = 3;

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

export const V2_STRICT_CURATION_MARKERS = [
  '## Relevante Research-Signale',
  '### Übernommen in die Kuration',
  '### Verworfen / ohne Entscheidungsauswirkung'
];

export const V2_STRICT_SOURCE_MARKERS = [
  '## Primär-/offizielle Quellen'
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

export function validateSignalBridgeV2(curation) {
  const errors = [];

  for (const marker of V2_STRICT_CURATION_MARKERS) {
    if (!curation.includes(marker)) {
      errors.push('Gate v2 fehlt in curation.md: ' + marker);
    }
  }

  const signalBridge = curation.match(/## Relevante Research-Signale\s*\n([\s\S]*?)(?=\n## )/)?.[1] ?? '';
  const substantiveSignalItems = (signalBridge.match(/^\s*-\s+.+$/gm) || [])
    .map((line) => line.replace(/^\s*-\s+/, '').trim())
    .filter((line) => !/^(keine|nicht erforderlich)\.?$/i.test(line));

  if (!signalBridge || substantiveSignalItems.length < 1) {
    errors.push('Gate v2 curation.md braucht mindestens ein konkret übernommenes oder verworfenes Research-Signal');
  }

  return errors;
}

export function validateSourcesV2(sources) {
  const errors = [];

  if (!sources) {
    return ['Gate v2 fehlt sources.md'];
  }

  for (const marker of V2_STRICT_SOURCE_MARKERS) {
    if (!sources.includes(marker)) {
      errors.push('Gate v2 fehlt in sources.md: ' + marker);
    }
  }

  if (/\bTODO\b/i.test(sources)) {
    errors.push('Gate v2 sources.md enthält noch TODO-Platzhalter');
  }

  const primaryBlock = sources.match(/## Primär-\/offizielle Quellen\s*\n([\s\S]*?)(?=\n## |$)/)?.[1] ?? '';
  const primaryItems = (primaryBlock.match(/^\s*-\s+.+$/gm) || [])
    .map((line) => line.replace(/^\s*-\s+/, '').trim())
    .filter((line) => !/^(keine|nicht erforderlich)\.?$/i.test(line));

  if (primaryItems.length < 1) {
    errors.push('Gate v2 sources.md braucht mindestens eine konkrete Primär-/offizielle Quelle');
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

  if (!/- \[[xX]\] Die stärksten Research-Signale wurden in der Kuration berücksichtigt oder bewusst verworfen/.test(curation)) {
    errors.push('Human Gate bestätigt nicht die Prüfung der stärksten Research-Signale');
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


export function validateResearchV3(research) {
  const errors = [];

  const tipsBlock = research.match(/### Tipps & Tricks\s*\n([\s\S]*?)(?=\n### |\n## |$)/)?.[1] ?? '';
  const tips = tipsBlock.match(/^\s*-\s+\S.+$/gm) || [];
  if (tips.length < 3) {
    errors.push('Gate v3 research.md braucht mindestens 3 konkrete Tipps & Tricks');
  }

  const costsBlock = research.match(/### Reale Kosten\s*\n([\s\S]*?)(?=\n### |\n## |$)/)?.[1] ?? '';
  if (!/zwei\s+(personen|erwachsene)/i.test(costsBlock) || !/\d+[,.]?\d*\s*(€|Euro)/i.test(costsBlock)) {
    errors.push('Gate v3 research.md braucht einen konkreten Kostenrahmen für zwei Personen');
  }

  const socialBlock = research.match(/### Social-Media-Hype vs\. Realität\s*\n([\s\S]*?)(?=\n### |\n## |$)/)?.[1]?.trim() ?? '';
  if (socialBlock.length < 120) {
    errors.push('Gate v3 research.md braucht eine substanzielle Social-Media-/Andrang-Einordnung');
  }

  const extraBlock = research.match(/## Besonderes Extra \/ Affiliate-Check\s*\n([\s\S]*?)(?=\n## |$)/)?.[1] ?? '';
  if (!extraBlock) {
    return [...errors, 'Gate v3 research.md fehlt: ## Besonderes Extra / Affiliate-Check'];
  }

  const searchSteps = Number(valueAfterLabel(extraBlock, 'Suchschritte:'));
  const status = valueAfterLabel(extraBlock, 'Status:').toLowerCase();

  if (!Number.isInteger(searchSteps) || searchSteps < 1 || searchSteps > 3) {
    errors.push('Gate v3 Besonderes Extra braucht 1 bis maximal 3 dokumentierte Suchschritte');
  }

  if (status === 'gefunden') {
    for (const label of ['Angebot:', 'Warum ICP-Fit:', 'Partner:', 'Link-Ziel:', 'Affiliate-Potenzial:']) {
      const value = valueAfterLabel(extraBlock, label);
      if (!value || /^(todo|keine|nicht erforderlich)\b/i.test(value)) {
        errors.push('Gate v3 Besonderes Extra braucht einen konkreten Wert für ' + label);
      }
    }
  } else if (status === 'kein passendes angebot gefunden nach 3 gezielten suchen') {
    if (searchSteps !== 3) {
      errors.push('Gate v3 Ausnahme für Besonderes Extra ist erst nach genau 3 gezielten Suchen zulässig');
    }
    const reason = valueAfterLabel(extraBlock, 'Begründung:');
    if (!reason || reason.length < 40) {
      errors.push('Gate v3 Ausnahme für Besonderes Extra braucht eine konkrete Begründung');
    }
  } else {
    errors.push('Gate v3 Besonderes Extra braucht Status: gefunden oder Status: kein passendes Angebot gefunden nach 3 gezielten Suchen');
  }

  return errors;
}

export function validateCurationV3(curation, research) {
  const errors = [];
  const block = curation.match(/## Pflichtbausteine v3\s*\n([\s\S]*?)(?=\n## |$)/)?.[1] ?? '';

  if (!block) return ['Gate v3 curation.md fehlt: ## Pflichtbausteine v3'];

  if (!/^Tipps im Artikel:\s*ja\s*$/mi.test(block)) {
    errors.push('Gate v3 curation.md bestätigt die öffentlichen Tipps nicht');
  }
  if (!/^Kostenübersicht für zwei:\s*ja\s*$/mi.test(block)) {
    errors.push('Gate v3 curation.md bestätigt die Kostenübersicht für zwei nicht');
  }

  const crowding = valueAfterLabel(block, 'Andrang / Social Media im Artikel:');
  if (!/^(sichtbar|nicht erforderlich\s*[–-]\s*.+)$/i.test(crowding)) {
    errors.push('Gate v3 Andrang / Social Media muss sichtbar sein oder mit Grund als nicht erforderlich dokumentiert werden');
  }

  const researchExtra = research.match(/## Besonderes Extra \/ Affiliate-Check\s*\n([\s\S]*?)(?=\n## |$)/)?.[1] ?? '';
  const researchStatus = valueAfterLabel(researchExtra, 'Status:').toLowerCase();
  const curationExtra = valueAfterLabel(block, 'Besonderes Extra:').toLowerCase();
  const affiliateStatus = valueAfterLabel(block, 'Affiliate-Status:').toLowerCase();

  if (researchStatus === 'gefunden') {
    if (curationExtra !== 'gefunden') {
      errors.push('Gate v3 curation.md muss das gefundene Besondere Extra übernehmen');
    }
    if (!['aktiv', 'affiliatefähig – tracking-link ausstehend', 'affiliatefähig - tracking-link ausstehend'].includes(affiliateStatus)) {
      errors.push('Gate v3 Affiliate-Status muss aktiv oder affiliatefähig – Tracking-Link ausstehend sein');
    }
  } else if (researchStatus === 'kein passendes angebot gefunden nach 3 gezielten suchen') {
    if (curationExtra !== 'kein passendes angebot gefunden nach 3 gezielten suchen') {
      errors.push('Gate v3 curation.md muss die dokumentierte Extra-Ausnahme übernehmen');
    }
    if (affiliateStatus !== 'nicht verfügbar nach 3 suchen') {
      errors.push('Gate v3 Affiliate-Status muss bei der Ausnahme nicht verfügbar nach 3 Suchen sein');
    }
  }

  const requiredChecks = [
    '3–5 konkrete Tipps sind im öffentlichen Artikel kompakt sichtbar',
    'Andrang / Social Media ist praktisch eingeordnet oder begründet nicht erforderlich',
    'eine kompakte Kostenübersicht für zwei Personen ist sichtbar',
    'Besonderes Extra ist als Box umgesetzt oder die 3-Suchen-Ausnahme ist dokumentiert'
  ];
  for (const label of requiredChecks) {
    const escaped = label.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\export function validatePublicContentV2(content) {');
    if (!new RegExp('- \\[[xX]\\] ' + escaped).test(curation)) {
      errors.push('Gate v3 Full Article Review fehlt: ' + label);
    }
  }

  return errors;
}

export function validatePublicContentV3(content, curation, research) {
  const errors = [];

  const tipsSection = content.match(/^##\s+[^\n]*Tipps[^\n]*\n([\s\S]*?)(?=^##\s+|$)/mi)?.[1] ?? '';
  const publicTips = tipsSection.match(/^\s*-\s+\S.+$/gm) || [];
  if (publicTips.length < 3) {
    errors.push('Gate v3 öffentlicher Artikel braucht einen kompakten Tipps-Abschnitt mit mindestens 3 Punkten');
  }

  const costsSection = content.match(/^##\s+[^\n]*(Kosten|kostet)[^\n]*\n([\s\S]*?)(?=^##\s+|$)/mi)?.[0] ?? '';
  const moneyValues = costsSection.match(/\d+[,.]?\d*\s*(€|Euro)/gi) || [];
  if (!/zwei/i.test(costsSection) || moneyValues.length < 3) {
    errors.push('Gate v3 öffentlicher Artikel braucht eine kompakte Kostenübersicht für zwei mit mehreren konkreten Beträgen');
  }

  const block = curation.match(/## Pflichtbausteine v3\s*\n([\s\S]*?)(?=\n## |$)/)?.[1] ?? '';
  const crowding = valueAfterLabel(block, 'Andrang / Social Media im Artikel:');
  if (/^sichtbar$/i.test(crowding) && !/^##\s+[^\n]*(voll|andrang|social|realität)[^\n]*$/mi.test(content)) {
    errors.push('Gate v3 öffentlicher Artikel braucht die als sichtbar markierte Andrang-/Realitäts-Einordnung');
  }

  const extraBlock = research.match(/## Besonderes Extra \/ Affiliate-Check\s*\n([\s\S]*?)(?=\n## |$)/)?.[1] ?? '';
  const extraStatus = valueAfterLabel(extraBlock, 'Status:').toLowerCase();
  if (extraStatus === 'gefunden') {
    if (!content.includes('<AffiliateBox')) {
      errors.push('Gate v3 gefundenes Besonderes Extra muss die bestehende AffiliateBox verwenden');
    }
    if (!/eyebrow=["']Besonderes Extra["']/.test(content)) {
      errors.push('Gate v3 Besonderes Extra muss in der AffiliateBox klar hervorgehoben sein');
    }
  }

  return errors;
}

export function validatePublicContentV2(content) {
  return /\bTODO\b/i.test(content)
    ? ['Gate v2 öffentlicher Artikel enthält noch TODO-Platzhalter']
    : [];
}

export function validateGateForPublish({ content, curation, research = '', sources = '', slug }) {
  const version = parseEditorialGateVersion(content);

  if (version === EDITORIAL_GATE_VERSION) {
    return [
      ...validateCurationV2(curation),
      ...validateSourcesV2(sources),
      ...validateSignalBridgeV2(curation),
      ...validateResearchV2(research),
      ...validateResearchV3(research),
      ...validateCurationV3(curation, research),
      ...validateHumanGateV2(curation),
      ...validatePublicContentV2(content),
      ...validatePublicContentV3(content, curation, research)
    ];
  }

  if (version === 2 && LEGACY_EDITORIAL_V2_SLUGS.has(slug)) {
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
