import bodyParser from 'body-parser'
import compression from 'compression'
import express from 'express'
import https from 'https'
import path from 'path'
import fs from 'fs'
import webpack from 'webpack'

var WebpackDevConfig = require('./webpack/webpack.development.config'),
    config = require('./config/config'),
    ssr = require('./ssr');

export function run (worker) {

  const app = express();
  const scServer = worker.scServer;
  const httpServer = worker.httpServer;
  httpServer.on('request', app);

  if (config.env === 'local') {
    const compiler = webpack(WebpackDevConfig);
    app.use(require('webpack-dev-middleware')(compiler, {
      publicPath: WebpackDevConfig.output.publicPath,
      hot: true,
      headers: { 'Access-Control-Allow-Origin': '*'},
      https: true,
      noInfo: true,
      historyApiFallback: true
    }));
    app.use(require('webpack-hot-middleware')(compiler));
  } else {
    app.use(compression());
    app.use('/bundle.css', function (req, res) {
      res.sendFile(path.join(__dirname, '../.build/bundle.css'));
    });
    app.use('/bundle.js', function (req, res) {
      res.sendFile(path.join(__dirname, '../.build/bundle.js'));
    });
  }
  
  app.get('*', ssr);

}
