# Jamin8r Frontend

Private, proprietary frontend monorepo for Jamin8r.

Jamin8r is a profile-first social product built around expressive identity, music, and discovery. The visual language takes cues from modernist grid composition—strong geometry, black structural lines, and sparing red/blue/yellow accents—while deliberately softening the palette, spacing the interface generously, and supporting a comfortable dark mode.

## Release

**0.1.0 — 2026-09-04**

## Monorepo

```text
apps/
  web/          Next.js 16.3.3
  mobile/       Expo SDK 57 / React Native 0.86.2
packages/
  api-client/   typed client for jamin8r-backend v0.1.x
  contracts/    frontend representation of backend HTTP contracts
  design/       cross-platform semantic color and spacing tokens
```

The monorepo intentionally shares contracts, API behavior, and design tokens rather than forcing web and native to share every UI component.

## Requirements

- Node.js 22.13+ (Expo SDK 57 minimum)
- npm 10+
- Jamin8r backend running locally for live profile creation

## Setup

```bash
cp .env.example .env
npm install
npm run verify
```

Start the backend separately, then:

```bash
npm run dev:web
```

Open `http://localhost:3000`.

For mobile:

```bash
npm run dev:mobile
```

`EXPO_PUBLIC_API_BASE_URL` must be reachable from the simulator/device. iOS Simulator can normally use `http://localhost:8080`; a physical device should use your Mac's LAN address, such as `http://192.168.1.x:8080`.

## Backend integration

The web app calls `/api/backend/*`; Next.js rewrites that same-origin path to `JAMIN8R_BACKEND_URL`, avoiding a browser CORS dependency during local development. The mobile app calls the Java API directly using `EXPO_PUBLIC_API_BASE_URL`.

Currently wired backend operations:

- register user
- fetch user
- fetch/upsert profile
- follow user
- fetch followers/following

The recommendation/taste UI is intentionally marked as visual-only until the Java backend exposes those APIs.

## Verification

```bash
npm run verify
npm run build:web
```

`npm run verify` performs repository consistency checks, dependency-free API/design unit tests using Node's built-in test runner, and shared-package TypeScript checks.

See `VERIFICATION.md` for the release gate executed when this archive was produced.

## Proprietary status

This repository is private and proprietary. See `LICENSE`, `NOTICE.md`, and `docs/SECURITY.md`.
