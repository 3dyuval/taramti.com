/* eslint-env node */

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    'prettier', // this used to be @vue/eslint-config-prettier
  ],
};