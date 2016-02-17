var webpack = require('webpack'),
    path = require('path');

module.exports = {
  // debug es6 in the browser
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client', // HMR
    './src/app.jsx'
  ],
  output: {
    path: path.join(__dirname, '../../.build'),
    filename: 'bundle.js',
    publicPath: 'https://localhost:8443/build/'
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
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // HMR
    new webpack.NoErrorsPlugin(), // HMR
    new webpack.DefinePlugin({
      "__DEVTOOLS__": true,
      "process.env.NODE_ENV": JSON.stringify('development')
    })
  ]
};
