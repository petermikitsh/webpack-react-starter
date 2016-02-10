import {SocketCluster} from 'socketcluster'
import fs from 'fs'
import os from 'os'
import path from 'path'

var config = require('./config/config');

new SocketCluster({
  appName: 'myapp',
  port: config.env === 'local' ? 8443 : (process.env.PORT || 8080),
  protocol: config.env === 'local' ? 'https' : 'http',
  protocolOptions: config.env === 'local' ? {
    key: fs.readFileSync(path.join(__dirname, '.ssl/key.pem'), 'utf8'),
    cert: fs.readFileSync(path.join(__dirname, '.ssl/cert.pem'), 'utf8')
  } : null,
  logLevel: 2,
  workers: config.env === 'local' ? 1 : os.cpus().length,
  allowClientPublish: false,
  initController: path.join(__dirname, '/init.js'),
  workerController: path.join(__dirname, '/worker.js'),
  rebootWorkerOnCrash: (config.env != 'local')
});
