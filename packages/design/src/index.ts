export const palette = {
  light: {
    canvas: '#F2F0E9',
    surface: '#FFFDF7',
    surfaceRaised: '#FFFFFF',
    ink: '#171717',
    inkMuted: '#5B5B57',
    line: '#202020',
    lineSoft: '#D7D3C8',
    red: '#D9463E',
    blue: '#315FBD',
    yellow: '#E8C64A',
  },
  dark: {
    canvas: '#111210',
    surface: '#191A17',
    surfaceRaised: '#20211E',
    ink: '#F5F2E8',
    inkMuted: '#B9B6AC',
    line: '#E4E0D5',
    lineSoft: '#343630',
    red: '#D95A50',
    blue: '#5D7FCA',
    yellow: '#D4B850',
  },
} as const;

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 } as const;
export const radius = { sm: 8, md: 14, lg: 22, pill: 999 } as const;
export const typography = {
  display: { fontSize: 56, lineHeight: 58, fontWeight: '800' },
  title: { fontSize: 28, lineHeight: 32, fontWeight: '750' },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
  label: { fontSize: 12, lineHeight: 16, fontWeight: '700', letterSpacing: 1.2 },
} as const;

export type ThemeName = keyof typeof palette;
