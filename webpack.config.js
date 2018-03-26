"use strict"

var path = require('path');
var webpack = require("webpack");

// webpack plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'public'),
  output: path.join(__dirname, 'public/compiled')
};

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    PATHS.src
  ],
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
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?importLoaders=1&sourceMap',
          ]
        })
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
  devServer: {
    historyApiFallback: true,
    contentBase: PATHS.dist,
    hot: true,
    inline: true,
    progress: true,

    host: 'localhost',
    port: 8081,
    proxy: {
      '/api/**': {
        target: 'http://localhost:4000',
        secure: false,
        changeOrigin: true
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('bundle.css')
  ]
};