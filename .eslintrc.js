const fs = require('fs');

const defaultEnv = 'production';
const supportedEnvs = ['development', 'production'];
const currentEnv = supportedEnvs.includes(process.env.NODE_ENV) ? process.env.NODE_ENV : defaultEnv;
const isDevelopment = currentEnv === 'development';

const ignoredPropNames = `^(${['Window'].join('|')})$`;

const prettierConfig = JSON.parse(fs.readFileSync('./.prettierrc', 'utf8'));

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  globals: {
    createSerializer: true,
    global: true,
    globalThis: true,
    mount: true,
    mountToJson: true,
    render: true,
    renderToJson: true,
    shallow: true,
    shallowToJson: true,
  },
  ignorePatterns: ['.eslintrc.js', '.eslintrc.cjs'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  // eslint-plugin-perfectionist conflicts
  // https://github.com/azat-io/eslint-plugin-perfectionist#%EF%B8%8F-troubleshooting
  rules: {
    'react/jsx-sort-props': 'off',
    'import/order': 'off',
    'sort-imports': 'off',
    'sort-keys': 'off',
    '@typescript-eslint/adjacent-overload-signatures': 'off',
    '@typescript-eslint/sort-type-constituents': 'off',
  },
  overrides: [
    /*
      <-------------TS, TSX, COMMON RULES------------->
    */
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: 'tsconfig.eslint.json',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
      },
      plugins: [
        '@typescript-eslint',
        'import',
        'unicorn',
        'react',
        'check-file',
        'jest-formatting',
        'perfectionist',
        'regexp',
        'sonarjs',
      ],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'prettier',
        'plugin:prettier/recommended',
        'plugin:perfectionist/recommended-natural',
        'plugin:regexp/recommended',
        'plugin:sonarjs/recommended-legacy',
      ],
      rules: {
        'no-unused-vars': 'off',
        'no-plusplus': 'off',
        'no-return-await': 'off',
        camelcase: ['error', { properties: 'always' }],
        'class-methods-use-this': 'off',
        'no-await-in-loop': 'off',
        'no-alert': isDevelopment ? 'off' : 'error',
        'no-console': isDevelopment ? 'off' : 'error',
        'no-debugger': isDevelopment ? 'off' : 'error',
        'no-param-reassign': 'off',
        'no-underscore-dangle': 'off',
        'newline-before-return': 'error',
        'no-warning-comments': 'warn',

        'prettier/prettier': ['error', prettierConfig],

        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-unused-vars': isDevelopment
          ? 'off'
          : [
              'error',
              {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: false,
              },
            ],
        '@typescript-eslint/explicit-function-return-type': 'warn',
        '@typescript-eslint/return-await': 'off',
        '@typescript-eslint/no-empty-interface': [
          'error',
          {
            allowSingleExtends: true,
          },
        ],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            filter: {
              match: false,
              regex: ignoredPropNames,
            },
            format: ['UPPER_CASE', 'StrictPascalCase'],
            prefix: ['I'],
            selector: 'interface',
          },
        ],
        '@typescript-eslint/ban-ts-comment': isDevelopment ? 'off' : 'error',

        'import/no-extraneous-dependencies': 'error',
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',
        'import/no-unresolved': ['error', { caseSensitiveStrict: true }],

        'unicorn/custom-error-definition': 'error',
        'unicorn/empty-brace-spaces': 'error',
        'unicorn/error-message': 'error',
        'unicorn/filename-case': [
          'error',
          {
            case: 'kebabCase',
          },
        ],
        'unicorn/no-instanceof-array': 'error',
        'unicorn/prefer-keyboard-event-key': 'error',
        'unicorn/prefer-node-protocol': 'error',
        'unicorn/throw-new-error': 'error',

        'check-file/folder-naming-convention': [
          'error',
          {
            'src/**/': 'KEBAB_CASE',
          },
        ],
      },
    },
    /*
      <-------------REACT RULES------------->
    */
    {
      files: ['*.tsx', '*.jsx'],
      rules: {
        'react/function-component-definition': [
          2,
          {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
          },
        ],
      },
    },
    {
      files: ['*.tsx'],
      rules: {
        'react/prop-types': 'off',
      },
    },
    /*
      <-------------JSON RULES------------->
    */
    {
      files: ['**/**/*.json'],
      extends: ['plugin:json/recommended'],
      rules: {
        '@typescript-eslint/no-unused-expressions': 'off',
        'prettier/prettier': 'off',
      },
    },
    /*
      <-------------CONFIG FILES------------->
    */
    {
      files: ['jest.config.ts', 'jest.e2e.config.ts'],
      rules: {
        'import/no-default-export': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
    /*
      <-------------GLOBAL TYPES DECLARATION------------->
    */
    {
      files: ['**/global.declaration.ts'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    /*
      <-------------LOADABLE COMPONENTS------------->
    */
    {
      files: ['**/*.loadable.ts', '**/*.loadable.tsx'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    /*
      <-------------STORYBOOK COMPONENTS RULES------------->
    */
    {
      files: ['**/*.stories.tsx'],
      rules: {
        'import/no-default-export': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
    /*
      <-------------SPEC RULES------------->
    */
    {
      files: ['**/*.spec.ts', '**/*.e2e-spec.ts', '**/*.spec.tsx', '**/*.e2e-spec.tsx'],
      rules: {
        'jest-formatting/padding-around-all': 'error',
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
