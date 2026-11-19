import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import jestPlugin from 'eslint-plugin-jest';
import globals from 'globals';

export default [
  {
    ignores: ['coverage/**', 'dist/**'],
  },
  js.configs.recommended,
  ...tsPlugin.configs['flat/recommended'],
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts', '**/*.test.tsx'],
    ...jestPlugin.configs['flat/recommended'],
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts', '**/*.test.tsx'],
    ...jestPlugin.configs['flat/style'],
  },
  eslintConfigPrettier,
];
