# Security

Jamin8r Frontend is proprietary software.

- Never commit API keys, cloud credentials, tokens, or signing secrets.
- Only variables prefixed with `NEXT_PUBLIC_` or `EXPO_PUBLIC_` should be considered client-visible; they must never contain secrets.
- `EXPO_PUBLIC_API_BASE_URL` is public configuration, not a secret.
- The Next.js backend rewrite is a development/API-routing convenience, not an authentication boundary.
- Treat all frontend validation as usability only. The Java backend remains responsible for authorization and input validation.
- Do not render user-provided arbitrary HTML, CSS, or JavaScript for profile customization. Future profile themes should use constrained, validated theme schemas.
