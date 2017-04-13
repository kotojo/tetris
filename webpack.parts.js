/* eslint import/no-extraneous-dependencies:0 */
/* eslint global-require: 0 */

const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    overlay: {
      errors: true,
      warnings: true,
    },
  },
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});
exports.clean = path => ({
  plugins: [
    new CleanWebpackPlugin([path]),
  ],
});

exports.lintJavaScript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        enforce: 'pre',

        loader: 'eslint-loader',
        options,
      },
    ],
  },
});

exports.loadJavaScript = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },
});

const globalCSS = path.join(__dirname, 'app/main.scss');

exports.loadCSS = ({ include } = {}) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        include,
        exclude: globalCSS,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.scss$/,
        include: globalCSS,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
});

const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.extractSCSS = ({ include, use }) => {
  // Output extracted CSS to a file
  const extractSass = new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    disable: process.env.NODE_ENV === 'development',
  });

  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          include,
          exclude: globalCSS,
          use: extractSass.extract({
            use,
            fallback: 'style-loader',
          }),
        },
        {
          test: /\.scss$/,
          include: globalCSS,
          use: extractSass.extract({
            use: [
              'css-loader',
              exports.autoprefix(),
              'sass-loader',
            ],
            fallback: 'style-loader',
          }),
        },
      ],
    },
    plugins: [extractSass],
  };
};

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      require('autoprefixer'),
    ]),
  },
});
