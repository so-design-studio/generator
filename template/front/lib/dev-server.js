const frontHost = 'assets.@@SHORTNAME@@.dev';
const backHost  = '@@SHORTNAME@@.dev';
const port      = 3000;

// ---

const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const exec = require('child_process').exec;
const config = require('../webpack.config.js');

const devServer = (back = false) => {
  config.entry.app = [`webpack-dev-server/client?http://${host}:${port}/`, 'webpack/hot/dev-server'];
  config.output.publicPath = `http://${host}:${port}/`;

  const server = new webpackDevServer(webpack(config), {
    proxy: { '*': host },
    stats: { colors: true },
    hot: true,
  });
  server.listen(port);

  exec(`open http://${back ? backHost : frontHost}:${port}`);
};

// https://www.youtube.com/watch?v=V3y3QoFnqZc
const wrongWrongWrong = () => {
  console.error(`usage: ${process.argv.slice(0, 2).join(' ')} <front|back>`);
  exit(1);
}

     if(process.argv.length !== 3)   { wrongWrongWrong(); }
     if(process.argv[2] === 'front') { devServer(false);  }
else if(process.argv[2] === 'back')  { devServer(true);   }
else                                 { wrongWrongWrong(); }
