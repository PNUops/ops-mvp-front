/** @type {import('tailwindcss').Config} */
import { OPS_COLOR, OPS_HEIGHT, OPS_WIDTH } from './src/styles/theme';

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
      lightGreen: OPS_COLOR.lightGreen,
      midGray: OPS_COLOR.midGray,
      whiteGray: OPS_COLOR.whiteGray,
    },
    fontFamily: {
      base: 'Inter, system-ui, sans-serif',
    },
    fontSize: {
      sm: ['18px', { lineHeight: 'auto' }],
      mid: ['24px', { lineHeight: 'auto' }],
      title: ['28px', { lineHeight: 'auto' }],
      smbold: ['18px', { fontWeight: '700', lineHeight: 'auto' }],
      exsm: ['15px', { lineHeight: 'auto' }],
    },
    spacing: {
      sidebar: OPS_WIDTH.sidebar,
      container: OPS_WIDTH.container,
      header: OPS_HEIGHT.header,
      footer: OPS_HEIGHT.footer,
    },
    maxWidth: {
      container: OPS_WIDTH.container,
      sidebar: OPS_WIDTH.sidebar,
    },
    minWidth: {
      sidebar: OPS_WIDTH.sidebar,
    },
    height: {
      ...OPS_HEIGHT,
    },
    minHeight: {
      sidebar: OPS_HEIGHT.sidebar,
      footer: OPS_HEIGHT.footer,
      header: OPS_HEIGHT.header,
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
