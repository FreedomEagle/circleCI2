module.exports = {
  'parser': 'babel-eslint',
  'extends': [
    'standard',
    'plugin:flowtype/recommended',
    'plugin:chai-friendly/recommended',
    'plugin:cypress/recommended',
  ],
  'plugins': [
    'flowtype',
  ],
  'env': {
    'commonjs': true,
    'node': true,
    'mocha': true,
  },
  'settings': {
    'flowtype': {
      'onlyFilesWithFlowAnnotation': true
    },
  },
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
      'modules': true,
      'experimentalObjectRestSpread': true
    }
  },
  'rules': {
    'comma-dangle': [
      'error',
      'always-multiline'
    ],
    'prefer-const': 'error',
    'import/no-absolute-path': 'off',
  },
  'globals': {
    'expect': true,
    'sinon': true,
    'cy': true,
    'Cypress': true,
  }
}
