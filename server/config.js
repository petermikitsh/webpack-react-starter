import os from 'os'
import path from 'path'

var env = process.env.NODE_ENV || 'local';

module.exports = {
  env: env,
  logLevel: function () {
    switch (env) {
      case 'local':
        return 3;
      case 'production':
      default:
        return 1;
    }
  }(),
  port: process.env.APP_PORT || 8443,
  rebootWorkerOnCrash: env != 'local',
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || 'myRedisPassword'
  },
  rethinkdb: {
    host: process.env.RETHINK_HOST || 'localhost',
    port: process.env.RETHINK_PORT || 28015,
    db: process.env.RETHINK_DB || 'webpackreactstarter',
    authKey: process.env.RETHINK_AUTHKEY || null,
    ssl: process.env.RETHINK_CERT_PATH ? {
      ca: process.env.RETHINK_CERT_PATH
    } : null
  },
  ssl: {
    key: process.env.SSL_KEY_PATH || path.join(__dirname, '.ssl/key.pem'),
    cert: process.env.SSL_CERT_PATH || path.join(__dirname, '.ssl/cert.pem')
  },
  useBuildAssets: (env === 'production'),
  workers: function () {
    switch (env) {
      case 'local':
        return 1;
      case 'production':
      default:
        return os.cpus().length;
    }
  }()
};
