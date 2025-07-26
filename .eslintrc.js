module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  rules: {
    // TypeScript-spezifische Regeln
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'off', // Für API-SDK akzeptabel
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'warn',
    
    // Allgemeine Regeln
    'no-console': 'off',
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',
  },
  ignorePatterns: [
    'dist/',
    'node_modules/',
    'coverage/',
    'examples/',
    '*.js',
    '!.eslintrc.js',
    '!jest.config.js'
  ],
}; 