# Changelog

All notable changes to Jamin8r Frontend are documented here. Versions follow Semantic Versioning.

## [0.1.0] - 2026-09-04

### Added

- Initial private frontend monorepo with npm workspaces.
- Next.js 16.3.3 web application with responsive landing/profile experience.
- Expo SDK 57 / React Native 0.86.2 mobile application.
- Shared typed client for the Jamin8r Java backend v0.1 HTTP contract.
- Shared TypeScript API contracts for users, profiles, follows, and API errors.
- Shared semantic design tokens for light and dark themes.
- Mondrian-inspired modernist visual system with restrained primary accents and softer neutral surfaces.
- Accessible light/dark theme switch on web and mobile.
- Web same-origin backend proxy through Next.js rewrites.
- Live user/profile creation forms wired to existing backend endpoints.
- Dependency-free unit tests for API-client behavior and design-token invariants.
- Static release verification, proprietary notices, architecture, development, testing, security, API integration, and design-system documentation.

### Known Issues

- `npm audit` reports moderate-severity `uuid` advisories through the
  Expo CLI dependency chain (`@expo/config-plugins -> xcode -> uuid`).
- The automated remediation proposes downgrading Expo to SDK 46 and
  has therefore not been applied.
- The project remains on the supported Expo SDK 57 dependency set.
