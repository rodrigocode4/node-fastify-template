// eslint-disable-next-line no-undef
module.exports = {
  env: {
    node: true,
    es2022: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
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
    'indent': ['error', 2, { 'MemberExpression': 1 }],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error','single'],
    'semi': ['error', 'never'],
    '@typescript-eslint/no-var-requires': 'off',
    'comma-dangle': ['error', {
      'arrays': 'never',
      'objects': 'always-multiline',
      'imports': 'never',
      'exports': 'never',
      'functions': 'never',
    }],
    'eol-last': ['error', 'always'],
    'max-len': [2, { code: 140 }],
    'no-shadow': ['error'],
  },
}
