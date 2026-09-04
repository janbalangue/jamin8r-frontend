# Design System

## Direction

The UI is inspired by Piet Mondrian's modernist grid vocabulary, not a reproduction of any individual artwork. The system uses:

- strong rectilinear composition;
- visible structural lines;
- neutral fields with small red, blue, and yellow accents;
- asymmetric but balanced layouts;
- large editorial typography;
- generous negative space.

To keep the interface easy to look at, Jamin8r deliberately softens the reference vocabulary: off-white rather than pure white, charcoal rather than absolute black, muted primaries rather than maximum-saturation blocks, rounded controls, and lower-contrast internal dividers.

## Themes

Semantic tokens live in `packages/design`. Both themes expose the same keys so platform code does not hard-code theme-specific colors.

Light uses a warm paper canvas. Dark uses charcoal/graphite surfaces with softened primary accents. Both preserve readable body-text contrast and reserve the primary trio mainly for identity, state, and composition rather than large uninterrupted content areas.

## Accessibility

- Theme selection supports system preference and explicit user override.
- The web theme control has an accessible label.
- Focus states use the blue semantic accent with an additional outline area.
- Reduced-motion preference disables transition effects.
- The geometric composition is decorative and does not carry essential information.
