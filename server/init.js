module.exports.run = function () {
  require('babel-register')({
    only(filename) {
      return (filename.indexOf('build') === -1 && filename.indexOf('node_modules') === -1);
    },
    presets: ['es2015', 'react']
  });
  require('babel-polyfill');
};
