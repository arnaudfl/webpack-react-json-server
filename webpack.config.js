"use strict"

const path = require('path');
const merge = require('webpack-merge');
const webpack = require("webpack");

// webpack plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'public'),
  output: path.join(__dirname, 'public/compiled')
};

const DEV = 'production' !== process.env.NODE_ENV;

const common = {
  entry: {
    app: PATHS.src
  },
  output: {
    path: PATHS.dist,
    filename: 'bundle.js',
    publicPath: '/compiled'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        include:  [PATHS.src],
        enforce: 'pre',
        options: {
          fix: true
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        },
        include: [PATHS.src],
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)(\?.*)?$/,
        use: [
          'file-loader?name=fonts/[name].[ext]',
        ],
        include: [
          PATHS.src,
        ]
      }
    ]
  },
};

if (DEV) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:9000',
      'webpack/hot/only-dev-server',
      PATHS.src
    ],
    devServer: {
      historyApiFallback: true,
      contentBase: PATHS.dist,
      hot: true,
      inline: true,

      host: 'localhost',
      port: 9000,
      proxy: {
        '/api/**': {
          target: 'http://localhost:4000',
          secure: false,
          changeOrigin: true,
        }
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader?importLoaders=1&sourceMap',
            ]
          })
        },
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin('bundle.css'),
    ]
  });
}