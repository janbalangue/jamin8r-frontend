# Development

## Install

```bash
npm install
```

## Web

```bash
JAMIN8R_BACKEND_URL=http://localhost:8080 npm run dev:web
```

The Next.js app runs at `http://localhost:3000` and proxies `/api/backend/*` to the Java backend.

## Mobile

```bash
EXPO_PUBLIC_API_BASE_URL=http://localhost:8080 npm run dev:mobile
```

For a physical device, substitute the development machine's LAN IP address. For Android Emulator, `http://10.0.2.2:8080` is typically the host loopback bridge.

## Package boundaries

- Put DTO representations in `packages/contracts` only when they correspond to a real backend contract.
- Put HTTP behavior in `packages/api-client`.
- Put semantic visual constants in `packages/design`.
- Keep platform components in their owning app until there is demonstrated reusable behavior.

## Versioning

Use Semantic Versioning. Keep root `VERSION`, root package version, app versions, internal package versions, `CHANGELOG.md`, and Expo's `app.json` version aligned for coordinated releases.
