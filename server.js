var config = require('./server/config/config'),
    compression = require('compression'),
    express = require('express'),
    fs = require('fs'),
    https = require('https'),
    path = require('path'),
    ssr = require('./server/ssr'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    WebpackDevConfig = require('./webpack.development.config');

var app = express();
app.use(compression());

app.get('/bundle.js', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/.build/bundle.js'));
});

if (config.env === 'local') {
  var webpackHost = {
    host: 'localhost',
    port: 9090
  };
  var webpackServer = new WebpackDevServer(webpack(WebpackDevConfig), {
    publicPath: WebpackDevConfig.output.publicPath,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*'},
    https: true,
    noInfo: true,
    historyApiFallback: true
  }).listen(webpackHost.port, webpackHost.host, function (err, result) {
    if (err) {
      console.warn('Error initializing webpack: ', err);
    } else {
      console.log('Listening on https://%s:%s [Webpack]', webpackHost.host, webpackHost.port);
    }
  });
}

// ssl development server
if (config.env == 'local') {
  var httpsServer = https.createServer({
    key: fs.readFileSync('.ssl/key.pem', 'utf8'),
    cert: fs.readFileSync('.ssl/cert.pem', 'utf8')
  }, app).listen(8443, function () {
    console.log('Listening on https://%s:%s [Express]', httpsServer.address().address, httpsServer.address().port);
  });
} else {
  var port = process.env.PORT || 8080;
  var httpServer = app.listen(port, function () {
    console.log('Listening on http://%s:%s [Express]', httpServer.address().address, httpServer.address().port);
  });
}

app.get('*', ssr);
