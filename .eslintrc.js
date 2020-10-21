module.exports = {
  extends: ['react-app', 'eslint:recommended'],
  plugins: ['prettier', 'node'],
  env: {
    commonjs: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    curly: 'warn',
    'prettier/prettier': ['error', { singleQuote: true }],
    'node/no-unpublished-require': 0,
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'jsx-a11y/href-no-hash': [0],
  },
  overrides: [
    {
      files: ['functions/**'],
      rules: {
        'node/exports-style': ['error', 'module.exports'],
        'no-console': 0, // this is the way to log in gcf.
      },
    },
    {
      files: ['services/web/**'],
      rules: {
        'node/no-unsupported-features': 0,
      },
    },
  ],
};
