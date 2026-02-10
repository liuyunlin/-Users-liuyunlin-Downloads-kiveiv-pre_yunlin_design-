export const typography = {
  fontFamily: {
    sans: [
      'Inter',
      'ui-sans-serif',
      'system-ui',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '"Noto Color Emoji"',
    ],
    serif: [
      'ui-serif', 
      'Georgia', 
      'Cambria', 
      '"Times New Roman"', 
      'Times', 
      'serif'
    ],
    mono: [
      'ui-monospace',
      'SFMono-Regular',
      '"SF Mono"',
      'Consolas',
      '"Liberation Mono"',
      'Menlo',
      'monospace',
    ],
  },
  
  // Modern text sizing with consistent line heights
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],        // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }],    // 14px
    base: ['1rem', { lineHeight: '1.5rem' }],       // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }],    // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],     // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
    '5xl': ['3rem', { lineHeight: '1' }],           // 48px
    '6xl': ['3.75rem', { lineHeight: '1' }],        // 60px
    '7xl': ['4.5rem', { lineHeight: '1' }],         // 72px
    '8xl': ['6rem', { lineHeight: '1' }],           // 96px
    '9xl': ['8rem', { lineHeight: '1' }],           // 128px
  },
  
  // Text sizing with slash notation (modern Tailwind CSS approach)
  textSizes: {
    'xs/4': '0.75rem/1rem',     // 12px/16px
    'xs/5': '0.75rem/1.25rem',  // 12px/20px
    'sm/4': '0.875rem/1rem',    // 14px/16px
    'sm/5': '0.875rem/1.25rem', // 14px/20px
    'sm/6': '0.875rem/1.5rem',  // 14px/24px
    'base/5': '1rem/1.25rem',   // 16px/20px
    'base/6': '1rem/1.5rem',    // 16px/24px
    'base/7': '1rem/1.75rem',   // 16px/28px
    'lg/6': '1.125rem/1.5rem',  // 18px/24px
    'lg/7': '1.125rem/1.75rem', // 18px/28px
    'xl/6': '1.25rem/1.5rem',   // 20px/24px
    'xl/7': '1.25rem/1.75rem',  // 20px/28px
  },
  
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
}