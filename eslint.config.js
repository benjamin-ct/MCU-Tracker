import js from '@eslint/js';
import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', ignoreRestSiblings: true }],
      // Auto-fixable import/export ordering (`eslint --fix` / npm run lint:fix) so the
      // import block stays consistent without hand-sorting.
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      // tsc already catches genuinely undefined identifiers; no-undef produces false
      // positives on TS-only ambient types (RequestInit, HTMLElement, etc.) that never
      // exist as runtime values.
      'no-undef': 'off',
    },
  },
  {
    // The Cloudflare Worker script runs in a separate (non-browser, non-Node) runtime
    // with its own globals (fetch, Response, URL as ambient globals rather than
    // Node/DOM imports) and isn't part of the Vite/React app bundle.
    files: ['worker/**/*.js'],
    languageOptions: {
      globals: { ...globals.worker },
    },
  },
  {
    // i18n modules are translation helpers, not Fast Refresh component boundaries:
    // richText.tsx deliberately co-locates JSX-returning tr*() helpers next to a small
    // helper component, which is exactly what only-export-components flags. Hot-reload
    // of a translation file isn't a concern, so the rule is off here.
    files: ['src/i18n/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  // Turns off ESLint rules that would conflict with Prettier's formatting (Prettier
  // owns layout; ESLint owns correctness). Must stay last to win over earlier configs.
  prettier,
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
];
