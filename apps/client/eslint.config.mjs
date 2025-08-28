import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      "@angular-eslint/template/i18n": "off",
      '@angular-eslint/template/interactive-supports-focus': 'off',

      // '@angular-eslint/component-selector': [
      //   'error',
      //   {
      //     type: 'element',
      //     prefix: 'app',
      //     style: 'kebab-case',
      //   },
      // ],
      "jsx-a11y/click-events-have-key-events": "off"
    },
  },
  {
    files: ['**/*.html'],
    // Override or add rules here
    rules: {},
  },
];
