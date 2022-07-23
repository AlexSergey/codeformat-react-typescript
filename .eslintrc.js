const defaultEnv = 'production';
const supportedEnvs = ['development', 'production'];
const currentEnv = supportedEnvs.includes(process.env.NODE_ENV) ? process.env.NODE_ENV : defaultEnv;
const isDevelopment = currentEnv === 'development';

const ignoredPropNames = `^(${['Window'].join('|')})$`;

module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'import', 'unicorn', 'sort-keys-fix', 'react'],
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
  ],
  ignorePatterns: ['.eslintrc.js'],
  overrides: [
    /*
      <-------------CONFIG FILES------------->
    */
    {
      files: ['jest.config.ts', 'jest.e2e.config.ts'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    /*
      <-------------JSON FILES------------->
    */
    {
      files: ['**/**/*.json'],
      rules: {
        '@typescript-eslint/no-unused-expressions': 'off',
        'prettier/prettier': 'off',
      },
    },
    /*
      <-------------JS, JSX, TS, TSX FILES, COMMON------------->
    */
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        camelcase: ['error', { properties: 'always' }],
        'class-methods-use-this': 'off',
        'no-await-in-loop': 'off',
        'no-alert': isDevelopment ? 'off' : 'error',
        'no-console': isDevelopment ? 'off' : 'error',
        'no-debugger': isDevelopment ? 'off' : 'error',
        'no-param-reassign': 'off',
        'no-underscore-dangle': 'off',
        'newline-before-return': 'error',

        'prettier/prettier': [
          'error',
          {
            bracketSpacing: true,
            endOfLine: 'lf',
            printWidth: 120,
            semi: true,
            singleQuote: true,
            trailingComma: 'all',
            useTabs: false,
          },
        ],

        'sort-keys-fix/sort-keys-fix': 'warn',

        'import/order': [
          'error',
          {
            alphabetize: {
              order: 'asc',
            },
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
            'newlines-between': 'always',
            pathGroups: [
              {
                group: 'internal',
                pattern: '@',
                position: 'after',
              },
            ],
          },
        ],
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',
        'import/no-unresolved': 'error',

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
      },
    },
    /*
      <-------------REACT FILES------------->
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
    /*
      <-------------TYPESCRIPT FILES------------->
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
      rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'warn',
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
        '@typescript-eslint/no-empty-interface': [
          'error',
          {
            allowSingleExtends: true,
          },
        ],
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
        '@typescript-eslint/return-await': 'off',
        '@typescript-eslint/ban-ts-comment': isDevelopment ? 'off' : 'error',
      },
    },
    /*
      <-------------JS FILES------------->
    */
    {
      files: ['*.js', '*.jsx'],
      rules: {},
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
  ],
  root: true,
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
};
