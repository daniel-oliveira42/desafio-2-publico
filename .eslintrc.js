module.exports = {
  root: true,
  env: {
    browser: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  plugins: [
  ],
  rules: {
    semi: 'off',
    'comma-dangle': 'off',
    'class-methods-use-this': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'implicit-arrow-linebreak': 'off',
    'import/prefer-default-export': 'off',
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      ignores: []
    }]
  }
}