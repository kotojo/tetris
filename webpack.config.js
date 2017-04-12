/* eslint comma-dangle:0 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const commonConfig = merge([
  {
    entry: [
      'babel-polyfill',
      PATHS.app,
    ],
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack demo',
      }),
    ],
  },
  parts.lintJavaScript({ include: PATHS.app }),
  parts.loadJavaScript({ include: PATHS.app }),
]);

const productionConfig = merge([
  parts.clean(PATHS.build),
  parts.generateSourceMaps({ type: 'source-map' }),
  parts.extractSCSS(
    {
      use: [{
        loader: 'css-loader',
        options: {
          modules: true,
        }
      },
        parts.autoprefix(),
        'sass-loader'
      ],
    }
  ),
]);

const developmentConfig = merge([
  {
    output: {
      devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
    },
  },
  parts.generateSourceMaps({ type: 'cheap-source-map' }),
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCSS(),
]);

module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};
