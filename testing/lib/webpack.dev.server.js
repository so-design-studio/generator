var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var exec = require('child_process').exec;
var config = require('../webpack.config.js');

var devHost = "http://testing.dev";
var devPort = 3000;

// Modify webpack config for dev server - entry points and public path
config.entry.app = [`webpack-dev-server/client?http://${devHost}:${devPort}/`, 'webpack/hot/dev-server'];
config.output.publicPath = `${devHost}:${devPort}/`;

// Configure server
var server = new webpackDevServer(webpack(config), {
  proxy: {
    '*': devHost
  },
  stats: { colors: true },
  quiet: true,
  hot: true,
});
server.listen(devPort);

// Open in browser
exec(`open ${devHost}:${devPort}`);
