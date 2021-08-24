module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // anyを許可
    '@typescript-eslint/no-explicit-any': 'off',
    // 論理否定演算子を使用したnull以外のアサーションを許可
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
};
