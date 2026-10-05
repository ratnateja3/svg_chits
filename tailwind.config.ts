import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: {
            50: '#F9F5FB',
            100: '#EFE7F6',
            200: '#DECDEB',
            300: '#C7AEDB',
            400: '#A785C4',
            500: '#865EAA',
            600: '#6A418E',
            700: '#522E71',
            800: '#3D1E56',
            900: '#2A113E',
            950: '#1A0729',
          },
          gold: {
            50: '#FDFBF4',
            100: '#FAF4DF',
            200: '#F3E5B8',
            300: '#EBD18D',
            400: '#DFB85C',
            500: '#CCA033',
            600: '#A87F22',
            700: '#7F5E17',
            800: '#5D4411',
            900: '#412F0C',
          },
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      screens: {
        xs: '360px',
      },
    },
  },
  plugins: [],
};

export default config;
