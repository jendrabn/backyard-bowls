const js = require('@eslint/js');
const importX = require('eslint-plugin-import-x');
const globals = require('globals');

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      import: importX,
    },
    rules: {
      'linebreak-style': 'off',
      'no-underscore-dangle': 'off',
      'no-console': 'off',
      'no-param-reassign': 'off',
      'no-undef': 'off',
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
  },
];
