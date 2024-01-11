// @ts-check

/** @type {import("prettier").Options & import("prettier-plugin-tailwindcss").PluginOptions} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  arrowParens: "avoid",
  bracketSpacing: true,
  quoteProps: "consistent",
  jsxSingleQuote: false,
  printWidth: 80,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
};

module.exports = config;
