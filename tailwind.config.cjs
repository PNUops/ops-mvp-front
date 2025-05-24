/** @type {import('tailwindcss').Config} */
import { OPS_COLOR } from './src/styles/theme';

module.exports = {
  content: content,
  theme: theme,
  plugins: plugins,
};

const content = ['./src/**/*.{js,jsx,ts,tsx}'];
const theme = {
  extend: {
    colors: {
      mainGreen: OPS_COLOR.mainGreen,
      mainGreen: OPS_COLOR.mainGreen,
      midGray: OPS_COLOR.midGray,
      lightGray: OPS_COLOR.lightGray,
      whiteGray: OPS_COLOR.whiteGray,
    },
    fontFamily: {
      base: 'Inter, system-ui, sans-serif',
    },
    fontSize: {
      sm: '18px',
      mid: '24px',
      title: '28px',
      smbold: ['18px', { fontWeight: '700' }],
      exsm: ['15px'],
    },
    spacing: {
      // 사용자 정의 spacing
    },
    maxWidth: {
      // 사용자 정의 maxWidth
    },
    minWidth: {
      // 사용자 정의 minWidth
    },
    keyframes: {
      typing: {
        '0%': {
          width: '0%',
          visibility: 'hidden',
        },
        '100%': {
          width: '100%',
        },
      },
      blink: {
        // 사용자 정의 keyframes
      },
    },
    animation: {
      typing: 'typing 2s steps(25), blink',
    },
  },
};
const plugins = [];
