module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: [
    'eslint:recommended'
  ],
  globals: {
    getApp: true,
    App: true,
    wx: true,
    Page: true,
    Component: true
  },
  rules: {
    semi: ['error', 'never'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    indent: ['error', 2],
    'max-len': ['error', {
      code: 150,
      tabWidth: 2
    }],
    'comma-spacing': 'error',
    'arrow-spacing': 'error',
    'key-spacing': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'space-before-function-paren': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'spaced-comment': 'error',
    'no-var': 'error',
    'no-useless-constructor': 'error',
    quotes: ['error', 'single']
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2018
  }
}
