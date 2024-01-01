module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'standard-with-typescript',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
    extraFileExtensions: ['.vue', '.ts']
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  globals: {
    ElMessage: true,
    ElMessageBox: true
  },
  rules: {
    'prettier/prettier': 'error',
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index', 'login']
      }
    ],
    '@typescript-eslint/promise-function-async': 'off',
    // 关闭: 禁止在需要布尔值的表达式中使用非布尔类型
    '@typescript-eslint/strict-boolean-expressions': 'off',

    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-floating-promises': 'off'
  }
};
