# Dependency Baseline

Release 0.1.0 intentionally uses a small dependency surface.

| Dependency | Version | Purpose |
| --- | ---: | --- |
| Next.js | 16.3.3 | web framework |
| React | 19.2.3 | UI runtime |
| React DOM | 19.2.3 | web renderer |
| Expo | ~57.0.20 | mobile toolchain/runtime |
| React Native | 0.86.2 | native renderer |
| TypeScript | ~6.0.3 | language/type checking |

The Expo SDK 57 template is the source of the React, React Native, and TypeScript compatibility baseline. Next.js is pinned to the current 16.3 security release line as of this release date.

No UI library, state-management framework, CSS framework, icon package, or runtime validation package is included in v0.1. This keeps the initial proprietary design system and application boundaries explicit.
