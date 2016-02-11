import os from 'os'
import path from 'path'

var env = process.env.NODE_ENV || 'local';

module.exports = {
  env: env,
  logLevel: function () {
    switch (env) {
      case 'local':
        return 3;
      default:
        return 1;
    }
  }(),
  port: function () {
    switch (env) {
      case 'local':
        return 8443;
      default:
        return process.env.APP_PORT;
    }
  }(),
  rebootWorkerOnCrash: env != 'local',
  redis: function () {
    switch (env) {
      case 'local':
        return {
          host: 'localhost',
          port: 6379,
          password: 'myRedisPassword'
        }
      default:
        return {
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
          password: process.env.REDIS_PASSWORD
        }
    }
  }(),
  ssl: function () {
    switch (env) {
      case 'local':
        return {
          key: path.join(__dirname, '.ssl/key.pem'),
          cert: path.join(__dirname, '.ssl/cert.pem')
        }
      default:
        return {
          key: process.env.SSL_KEY_PATH,
          cert: process.env.SSL_CERT_PATH
        }
    }
  }(),
  useBuildAssets: (env == 'production'),
  workers: function () {
    switch (env) {
      case 'local':
        return 1;
      default:
        return os.cpus().length;
    }
  }()
};
