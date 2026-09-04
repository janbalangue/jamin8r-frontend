# Architecture

## Principles

1. Keep application-facing code independent of cloud deployment details.
2. Share contracts and design semantics, not entire platform-specific component trees.
3. Keep the Java backend authoritative for domain state.
4. Treat realtime, recommendation, graph, and media features as future backend capabilities rather than mocked production APIs.

## Shape

```text
Next.js web --------------------┐
                               ├── @jamin8r/api-client ── Jamin8r Java API
Expo / React Native mobile -----┘
              │
              ├── @jamin8r/contracts
              └── @jamin8r/design
```

### Web

The browser uses `/api/backend` as its base URL. `next.config.ts` rewrites requests server-side to `JAMIN8R_BACKEND_URL`. This keeps local browser traffic same-origin and avoids requiring CORS configuration in the v0.1 Java backend.

### Mobile

Mobile has no Next.js proxy and talks directly to `EXPO_PUBLIC_API_BASE_URL`. Development devices therefore require a network-reachable backend address.

## Why no shared UI package yet?

Web and native have different layout, input, navigation, accessibility, and interaction primitives. At v0.1, forcing all visible components through one abstraction would cost more than it saves. The shared package is deliberately limited to semantic design tokens. Reusable domain-specific components can be introduced later when evidence shows genuine cross-platform duplication.
