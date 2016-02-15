import { exec } from 'child_process'
import { SocketCluster } from 'socketcluster'
import config from '../config'
import fs from 'fs'
import path from 'path'

export default function () {

  console.log('   >> Master PID:', process.pid);

  new SocketCluster({
    appName: 'myapp',
    port: config.port,
    protocol: 'https',
    protocolOptions: {
      key: fs.readFileSync(config.ssl.key, 'utf8'),
      cert: fs.readFileSync(config.ssl.cert, 'utf8')
    },
    logLevel: config.logLevel,
    workers: config.workers,
    allowClientPublish: false,
    initController: path.join(__dirname, '/init.js'),
    workerController: path.join(__dirname, '/worker.js'),
    brokerController: path.join(__dirname, '/broker.js'),
    brokerOptions: {
      host: config.redis.host,
      port: config.redis.port,
      auth_pass: config.redis.password
    },
    rebootWorkerOnCrash: config.rebootWorkerOnCrash
  });

}
