var webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // debug es6 in the browser
  devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?https://localhost:9090', // HMR
    'webpack/hot/only-dev-server', // HMR
    './src/app.jsx'
  ],
  output: {
    path: __dirname + '/.build',
    filename: 'bundle.js',
    publicPath: 'https://localhost:9090/build/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // HMR
    new webpack.NoErrorsPlugin(), // HMR
    new HtmlWebpackPlugin({
      template: 'node_modules/html-webpack-template/index.html',
      appMountId: 'app',
      title: 'App'
    })
  ]
};
