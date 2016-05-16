var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var flexibility = require('postcss-flexibility');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var pixrem = require('pixrem');
var path = require('path');

module.exports = {

  entry: {
    main: ['./assets/scripts/main.jsx', 'webpack/hot/only-dev-server'],
  },
  output: {
    path: __dirname + '/public/',
    publicPath: './',
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        // Compile all our .js and .jsx files down from ES2016 / JSX
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        // Inline our standard CSS
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss']
      },
      {
        // Compile and inline our Sass
        test: /\.s[ac]ss$/,
        loaders: ['style', 'css', 'postcss', 'sass']
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file?name=/[hash].[ext]" }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  recordsPath: path.join(__dirname, '.webpack-records.json'),

  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx',
      '.css',
      '.sass',
      '.scss',
      '.json',
    ],
    alias: {
      // Aliases (normally for long bower paths) go here
    }
  },

  // Include Bower Sass in @import search paths
  sassLoader: {
    includePaths: [path.resolve(__dirname, './bower_components'), path.resolve(__dirname, './node_modules')]
  },

  postcss: function() {
    return [autoprefixer, flexibility, pixrem];
  },
};

if(process.env.NODE_ENV === 'production') {
  // Switch off HMR, extract CSS, and switch off UglifyJS warnings
  for(entry in module.exports.entry) {
    module.exports.entry[entry] = module.exports.entry[entry][0];
  }

  module.exports.plugins = [
    new ExtractTextPlugin('style.css'),
    // Uglify normally throws lots of unneeded warnings for 3rd party plugins
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
  ];

  // Use extract text plugin
  module.exports.module.loaders[1].loaders = undefined;
  module.exports.module.loaders[2].loaders = undefined;
  module.exports.module.loaders[1].loader = ExtractTextPlugin.extract('style', ['css', 'postcss']);
  module.exports.module.loaders[2].loader = ExtractTextPlugin.extract('style', ['css', 'postcss', 'sass']);

  // Remove recordsPath
  module.exports.recordsPath = undefined;
}
