module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', 'ts', 'tsx'] },
    ],
    'import/extensions': ['off'],
    'prettier/prettier': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'object-curly-newline': 'off',
    'no-shadow': 'off',
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {},
    },
  },
};
