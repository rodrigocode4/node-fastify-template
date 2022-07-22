module.exports = {
  env: {
    node: true,
    es2022: true,
    jest: true,
  },
  extends: [
    'airbnb-base'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    indent: ['error', 2, { MemberExpression: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    '@typescript-eslint/no-var-requires': 'off',
    'comma-dangle': ['error', {
      arrays: 'never',
      objects: 'always-multiline',
      imports: 'never',
      exports: 'never',
      functions: 'never',
    }],
    'eol-last': ['error', 'always'],
    'max-len': [2, { code: 140 }],
    'no-shadow': ['error'],
    'import/no-unresolved': 'off',
    'global-require': 'off',
    'import/extensions': 'off',
    'consistent-return': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
}
