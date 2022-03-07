module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
  },

  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },

  extends: ['@nuxtjs', 'prettier', 'plugin:nuxt/recommended'],

  plugins: ['prettier'],

  // add your custom rules here
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-template-shadow': 'off',
  },
}
