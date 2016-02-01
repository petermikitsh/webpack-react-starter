var util = require('util'),
    env = process.env.NODE_ENV || 'local';

module.exports = require(__dirname + util.format('/%s.config.js', env));
