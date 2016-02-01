console.log("Starting server... this takes a couple seconds (realtime babel transpilation).");

require('babel-register')({
  presets: ['es2015', 'react']
});
require('babel-polyfill');
require('./server.js');
