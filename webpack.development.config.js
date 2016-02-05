var webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  // debug es6 in the browser
  devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?https://localhost:9090', // HMR
    'webpack/hot/only-dev-server', // HMR
    './src/app.jsx'
  ],
  output: {
    path: path.join(__dirname, './.build'),
    filename: 'bundle.js',
    publicPath: 'https://localhost:9090/build/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // HMR
    new webpack.NoErrorsPlugin(), // HMR
    new ExtractTextPlugin('bundle.css', {
      allChunks: true
    }),
    new webpack.DefinePlugin({
      "__DEVTOOLS__": true,
      "process.env.NODE_ENV": JSON.stringify('development')
    })
  ]
};
