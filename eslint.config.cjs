module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier", "import"],
  extends: [
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  rules: {
    "react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
    "import/extensions": "off",
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: ["arrow-function"],
      },
    ],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["prettier.config.js"] },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
