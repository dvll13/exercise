module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:typescript-sort-keys/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh', 'typescript-sort-keys', 'import'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/prop-types': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          object: false,
          '{}': false,
          Function: false,
        },
      },
    ],
    'newline-before-return': 'warn',
    'react/jsx-no-useless-fragment': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true, // don"t want to sort import lines, use eslint-plugin-import instead
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: true,
      },
    ],
    'import/order': [
      'warn',
      {
        groups: [['builtin', 'external'], ['internal'], ['sibling', 'parent', 'index'], ['type']],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'pages',
            group: 'internal',
          },
          {
            pattern: 'pages/**',
            group: 'internal',
          },
          {
            pattern: 'components',
            group: 'internal',
          },
          {
            pattern: 'components/**',
            group: 'internal',
          },
          {
            pattern: 'model',
            group: 'internal',
          },
          {
            pattern: 'model/**',
            group: 'internal',
          },
          {
            pattern: 'data',
            group: 'internal',
          },
          {
            pattern: 'data/**',
            group: 'internal',
          },
          {
            pattern: 'layouts',
            group: 'internal',
          },
          {
            pattern: 'layouts/**',
            group: 'internal',
          },
          {
            pattern: 'types',
            group: 'internal',
          },
          {
            pattern: 'types/**',
            group: 'internal',
          },

        ],
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
    react: {
      version: 'detect',
    },
  },
}
