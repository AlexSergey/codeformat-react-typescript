import tsParser from '@typescript-eslint/parser';
import checkFile from 'eslint-plugin-check-file';
import packageJson from 'eslint-plugin-package-json';
import perfectionist from 'eslint-plugin-perfectionist';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import * as regexpPlugin from 'eslint-plugin-regexp';
import globals from 'globals';
import eslintTs from 'typescript-eslint';

const ignores = [
  '**/*.d.ts',
  '*.d.ts',
  'node_modules',
  'logs',
  '*.log',
  'lib-cov/',
  'coverage/',
  'NO_COMMIT/',
  'test-reports/**',
  'docs/*',
  'build/*',
  'lib/*',
  'dist/*',
  '*.css',
  '*.scss',
  '*.less',
  '*.ico',
  '*.jpg',
  '*.jpeg',
  '*.png',
  '*.svg',
  '*.bmp',
  '*.gif',
  '*.webp',
  '*.woff',
  '*.woff2',
  '*.txt',
  '*.mdx',
  '*.md',
  '*.ejs',
  '*.hbs',
  '*.jade',
  '*.html',
  'docs/',
  'public/',
  'locales/',
  'src/locales/',
  'seo_report',
];
const tsFiles = ['**/*.{ts,tsx}'];

const languageOptions = {
  ecmaVersion: 2024,
  globals: {
    ...globals.browser,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  sourceType: 'module',
};

const customTypescriptConfig = {
  files: tsFiles,
  languageOptions: {
    ...languageOptions,
    parser: tsParser,
    parserOptions: {
      project: './tsconfig.json',
    },
  },
  plugins: {
    'check-file': checkFile,
    'import/parsers': tsParser,
  },
  rules: {
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        format: ['UPPER_CASE', 'StrictPascalCase'],
        selector: 'interface',
      },
      {
        format: ['PascalCase'],
        selector: 'typeLike',
      },
      {
        format: ['UPPER_CASE', 'StrictPascalCase'],
        selector: 'class',
      },
    ],
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'after-used',
        ignoreRestSiblings: false,
        vars: 'all',
      },
    ],
    '@typescript-eslint/return-await': 'off',

    camelcase: ['error', { properties: 'always' }],

    'check-file/filename-naming-convention': [
      'error',
      {
        'src/**/*.{ts,tsx}': 'KEBAB_CASE',
      },
      {
        ignoreMiddleExtensions: true,
      },
    ],
    'check-file/folder-naming-convention': [
      'error',
      {
        'src/**/': 'KEBAB_CASE',
      },
    ],

    'class-methods-use-this': 'off',
    'newline-before-return': 'error',
    'no-alert': 'error',
    'no-await-in-loop': 'off',
    'no-console': 'error',
    'no-debugger': 'error',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-return-await': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'off',
    'no-warning-comments': 'warn',

    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-uses-react': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};

// Add the files for applying the recommended TypeScript configs
// only for the Typescript files.
// This is necessary when we have the multiple extensions files
// (e.g. .ts, .tsx, .js, .cjs, .mjs, etc.).
const recommendedTypeScriptConfigs = [
  ...eslintTs.configs.recommended.map((config) => ({
    ...config,
    files: tsFiles,
  })),
  ...eslintTs.configs.stylistic.map((config) => ({
    ...config,
    files: tsFiles,
  })),
];

export default [
  { ignores },
  packageJson.configs.recommended,
  reactPlugin.configs.flat.recommended,
  ...recommendedTypeScriptConfigs,
  prettierRecommended,
  perfectionist.configs['recommended-natural'],
  regexpPlugin.configs['flat/recommended'],
  customTypescriptConfig,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
