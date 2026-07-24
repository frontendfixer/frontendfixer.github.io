//  @ts-check

/** @type {import('prettier').Config} */
const config = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'avoid',
  endOfLine: 'auto',
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
