//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  ...tanstackConfig,
  eslintPluginPrettierRecommended,
  {
    rules: {
      'import/no-cycle': 'off',
      'import/order': 'off',
      'sort-imports': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/require-await': 'off',
      'pnpm/json-enforce-catalog': 'off',
    },
  },
  {
    ignores: [
      'eslint.config.js',
      'prettier.config.js',
      '.output/*',
      'dist/*',
      'projects/*',
    ],
  },
];
