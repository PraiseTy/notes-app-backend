// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs']
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    rules: {
      'unicorn/filename-case': 'off',
      'import/prefer-default-export': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'no-console': 'error',
      'no-restricted-syntax': 'off',
      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/lines-between-class-members': 'off',
      '@typescript-eslint/no-namespace': 'off',
      'no-underscore-dangle': 'off',
      'spaced-comment': 'off',
      'import/extensions': 'off',
      'comma-dangle': 'off',
      '@typescript-eslint/comma-dangle': 'off',
      'react/jsx-filename-extension': 'off',
      indent: 'off',
      '@typescript-eslint/indent': 'off',
      'unicorn/no-anonymous-default-export': 'off',
      'unicorn/prefer-string-replace-all': 'off',
      'no-duplicate-imports': 'error',
      'unicorn/no-nested-ternary': 'off'
    }
  }
);
