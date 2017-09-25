/**
 * Created by matt on 2/19/17.
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    main: './app/main',
    about: './app/about',
    contact: './app/contact'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: './assets/scripts/[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src')
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    inline: true,
    hot: true,
    historyApiFallback: true,

  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'default.html'),
      title: 'Index',
      hash: true,
      inject: 'body',
      chunks: ['main'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'default.html'),
      title: 'About',
      hash: true,
      inject: 'body',
      chunks: ['about'],
      filename: './about/index.html'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'post.html'),
      title: 'Contact',
      hash: true,
      inject: 'body',
      chunks: ['contact'],
      filename: './contact/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
