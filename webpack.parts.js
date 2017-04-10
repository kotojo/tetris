/* eslint import/no-extraneous-dependencies:0 */

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

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        include,
        exclude,
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
    ],
  },
});

const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.extractSCSS = ({ include, exclude, use }) => {
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
          exclude,

          use: extractSass.extract({
            use,
            fallback: 'style-loader',
          }),
        },
      ],
    },
    plugins: [extractSass],
  };
};
