var webpack = require('webpack');
module.exports = {
  entry: './src/app.jsx',
  output: {
    path: __dirname + '/.build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /.\scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  }
};
