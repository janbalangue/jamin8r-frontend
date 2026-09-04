# Testing

## Fast verification

```bash
npm run verify
```

This runs:

1. static repository/version checks;
2. Node built-in tests for the API client and shared design tokens;
3. TypeScript checks for dependency-light shared packages.

## Framework build gates

After dependencies are installed:

```bash
npm run build:web
npm run typecheck -w @jamin8r/mobile
```

The Next.js production build is the primary web integration gate. Expo native builds should be added to CI when EAS/GCP deployment work begins.

## Test philosophy

Tests should verify actual contracts and invariants. Do not change production behavior merely to satisfy a test, and do not mock backend capabilities that do not yet exist.
