# Deployment

## Ziel

Die Astro-Site wird statisch gebaut.

- Build: `npm run build`
- Output: `dist`
- Production-Branch: `main`

## Bevorzugt: Cloudflare Pages

Cloudflare Pages kann das private GitHub-Repository per Git-Integration anbinden.

Konfiguration:

```text
Production branch: main
Build command: npm run build
Build output directory: dist
Environment variable:
SITE_URL=https://<finale-domain>
```

Pull Requests erhalten nach aktivierter Git-Integration Preview Deployments; neue Commits auf `main` lösen Production Deployments aus.

Die Verbindung des Cloudflare-Kontos mit GitHub ist eine externe Account-Autorisierung und kann nicht durch Repository-Code allein hergestellt werden.

## CI

Unabhängig vom Hosting läuft in GitHub Actions:

```text
npm run check
  → astro check
  → validate-content.mjs
  → astro build
```

Der MVP verwendet bewusst nur einen eigenen Content-Validator.
