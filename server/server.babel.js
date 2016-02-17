require('babel-register')({
  presets: ['es2015', 'react']
});
require('babel-polyfill');

var config = require('./config'),
    exec = require('child_process').exec,
    path = require('path'),
    start = require('./socketcluster/server').default;

if (config.env == 'local') {
  var redis = exec('/usr/local/bin/redis-server ' + path.join(__dirname + '/socketcluster/redis.conf'));
  var rethinkdb = exec('rethinkdb');

  function onData (data) {
    var output = data.toString();
    if (output.indexOf("Server started, Redis") > -1) {
      console.log("Redis started.");
    }
    if (output.indexOf("Running rethinkdb") > -1) {
      console.log("RethinkDB started.");
      this.start();
    }
  };

  function onClose () {
    console.log("Redis or Rethink quit. Killing application server...")
    redis.kill();
    rethinkdb.kill();
    process.exit();
  }

  redis.stdout.on('data', onData.bind({start: start}));
  rethinkdb.stdout.on('data', onData.bind({start: start}));

  redis.on('close', onClose);
  rethinkdb.on('close', onClose);
  process.on('uncaughtException', onClose);

} else {
  start();
}
