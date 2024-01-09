module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    // "airbnb"
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx', '.tsx', '.ts'],
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
  ignorePatterns: ['assets', 'node_modules'],
};
