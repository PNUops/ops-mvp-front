/** @type {import('tailwindcss').Config} */

export const content = ['./src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
  extend: {
    colors: {
    },
    fontFamily: {
      base: 'IBM Plex Sans KR, system-ui, sans-serif',
      orbitron: '"Orbitron", sans-serif',
    },
    fontSize: {
    },
    spacing: {
    },
    maxWidth: {
    },
    minWidth: {
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
      },
    },
    animation: {
      typing: 'typing 2s steps(25), blink',
    },
  },
};
export const plugins = [];