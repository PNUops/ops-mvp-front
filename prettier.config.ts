const prettierPluginTailwind = require('prettier-plugin-tailwindcss');

export default {
  plugins: [prettierPluginTailwind],
  tailwindConfig: './tailwind.config.ts',
  singleQuote: true,
  semi: true,
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 120,
  arrowParens: 'always',
};
