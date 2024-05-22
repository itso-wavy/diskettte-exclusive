import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      screens: {
        sm: 'auto',
        md: 'auto',
        lg: 'auto',
        xl: 'auto',
        // '2xl': '1536px',
        '2xl': '1800px',
      },
    },
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
      '60%': '60%',
    },
    extend: {
      fontFamily: {
        sans: ['Inter', '"Noto Sans KR"', ...fontFamily.sans],
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        // black: {
        //   primary: 'hsl(0, 0%, 0%)',
        //   secondary: 'hsl(0, 0%, 50%)',
        // },
        // orange: {
        //   primary: 'hsl(25, 100%, 50%)',
        //   secondary: 'hsl(25, 100%, 65%)',
        // },
        // purple: {
        //   primary: 'hsl(270, 100%, 50%)',
        //   secondary: 'hsl(270, 100%, 75%)',
        // },
        // green: {
        //   primary: 'hsl(120, 100%, 35%)',
        //   secondary: 'hsl(120, 100%, 45%)',
        // },
        // blue: {
        //   primary: 'hsl(220, 100%, 50%)',
        //   secondary: 'hsl(220, 100%, 75%)',
        // },
      },
    },
  },
  safelist: [
    {
      pattern: /bg-(black|orange|purple|green|blue)-(primary|secondary)/,
      variants: ['hover', 'dark'],
    },
    {
      pattern: /text-(black|orange|purple|green|blue)-(primary|secondary)/,
      variants: ['hover', 'dark'],
    },
  ],
  plugins: [],
};

export default config;
