const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const path = require('path');
const { join } = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  output: {
    path: join(__dirname, '../../dist'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          include: [path.resolve(__dirname, 'dist/apps/api/**/*.routes.js')],
          terserOptions: {
            format: {
              comments: (node, comment) => {
                return /@swagger/i.test(comment.value);
              }
            }
          }
        })
      ]
    }),
  ],
};
