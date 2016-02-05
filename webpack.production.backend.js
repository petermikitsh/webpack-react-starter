var webpack = require('webpack'),
    path = require('path'),
    fs = require('fs'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: {
    server: './server.babel.js'
  },
  externals: nodeModules,
  module: {
    loaders: [
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.txt$/, loader: 'raw-loader'},
      {test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/, loader: 'url-loader?limit=10000'},
      {test: /\.(eot|ttf|wav|mp3)$/, loader: 'file-loader'},
      {
        test: /\.jsx?$/,
        loaders: ['babel']
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
  node: {
    fs: "empty",
    stream: "empty",
    __filename: true,
    __dirname: true,
    process: true
  },
  output: {
    path: path.join(__dirname, './.build'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}}),
    new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}),
    new ExtractTextPlugin('bundle.css', {
      allChunks: true
    })
  ],
  resolve: {
    root: [
      path.join(__dirname),
      path.join(__dirname, "node_modules"),
    ],
    extensions: ['', '.js', '.json'],
  },
  target: 'node'
};
