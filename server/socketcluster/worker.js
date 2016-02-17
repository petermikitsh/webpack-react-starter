import bodyParser from 'body-parser'
import compression from 'compression'
import config from '../config'
import express from 'express'
import fs from 'fs'
import https from 'https'
import path from 'path'
import webpack from 'webpack'
import ssr from '../ssr'
import WebpackDevConfig from '../webpack/webpack.development.config'
import '../rethinkdb/init'

var jwt = require('jsonwebtoken');

export function run (worker) {

  console.log('   >> Worker PID:', process.pid);

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
      res.sendFile(path.join(__dirname, '../../.build/bundle.css'));
    });
    app.use('/bundle.js', function (req, res) {
      res.sendFile(path.join(__dirname, '../../.build/bundle.js'));
    });
  }

  app.get('/api/token', function (req, res) {
    res.send(jwt.sign({}, config.authKey));
  });

  app.get('*', ssr);

  scServer.on('connection', function (socket) {

    console.log('Client connected:', socket.id);

    var interval = setInterval(function () {
      socket.emit('rand', {
        rand: Math.random() * 5
      });
    }, 1000);

    socket.on('disconnect', function () {
      console.log('Client disconnected:', socket.id);
      clearInterval(interval);
    });

  });

}
