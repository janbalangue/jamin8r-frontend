# Frontend Roadmap

## Near term

- authenticated session contract once identity/auth is added to the Java backend;
- profile editing as a dedicated screen;
- user lookup and follow flows;
- WebSocket/SSE client abstraction for realtime domain events;
- navigation shell for feed, discovery, profile, and messages;
- profile theme schema and safe renderer;
- shared accessibility and interaction primitives where cross-platform duplication becomes real.

## Recommendation UI

Do not ship fake recommendation data as if it were live. When backend recommendation APIs exist, add versioned contracts and preserve provenance such as explanation/reason codes separately from ranking scores.

## Deployment

Cloud deployment and monorepo CI/CD are intentionally deferred until the local web/mobile/backend loop is stable.
