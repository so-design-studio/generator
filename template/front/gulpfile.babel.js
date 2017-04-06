'use strict'

import Plugins       from 'gulp-load-plugins'
import Yargs         from 'yargs'
import BrowserSync   from 'browser-sync'
import Gulp          from 'gulp'
import Util          from 'gulp-util'
import Panini        from 'panini'
import Rimraf        from 'rimraf'
import Yaml          from 'js-yaml'
import Fs            from 'fs'
import Path          from 'path'
import Webpack       from 'webpack'
import WebpackStream from 'webpack-stream'
import Named         from 'vinyl-named'
import Rev           from 'gulp-rev'
import Lost          from 'lost'
import PostcssAnt    from 'postcss-ant'
import Pixrem        from 'pixrem'
import Autoprefixer  from 'autoprefixer'
import { exec }      from 'child_process'


// --- setup ---

// load all gulp plugins
const $ = Plugins()

// check for '--production'
const PRODUCTION = !!(Yargs.argv.production)

// load config.yml
const CONFIG = Yaml.load(Fs.readFileSync('config.yml', 'utf8'))
const PATHS = CONFIG.paths

// helpers
const dist = (p) => p ? `${PATHS.dist}/${p}` : PATHS.dist


// --- webpack setup ---

const wpOptions = {
  output: { filename: '[name].js' },
  resolve: {
    modules: PATHS.js.include,
    extensions: [
      '.js',
      '.jsx',
      '.json',
    ],
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: 'babel-loader',
        exclude: PATHS.js.exclude_loaders,
      },
      {
        test: /.json$/,
        use: 'json-loader',
        exclude: PATHS.js.exclude_loaders,
      },
    ]
  }
}

if(!PRODUCTION) {
  wpOptions.devtool = 'cheap-eval-source-map'
}
else {
  wpOptions.plugins = [
    new Webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
  ]
}


// --- tasks ---

// build dist
Gulp.task('build',
 Gulp.series(clean, Gulp.parallel(pages, css, js, images, fonts, etc)))

// default task: build, serve and watch for changes
Gulp.task('default',
  Gulp.series('build', devServer, watch))

// remove entire dist
function clean(done) {
  Rimraf(dist(), done)
}

// copy misc assets into dist
function etc() {
  return Gulp.src(PATHS.etc)
    .pipe(Gulp.dest(dist()))
}

function fonts() {
  return Gulp.src(PATHS.fonts.include)
    .pipe(Gulp.dest(dist(PATHS.fonts.output_dir)))
}

// compile static pages using panini
function pages() {
  const paths = PATHS.html

  if(CONFIG.dev_server.back)
    return Gulp.src('.').pipe(Util.noop())

  return Gulp.src(paths.src)
    .pipe(Panini({
      root:     paths.root,
      layouts:  paths.layouts,
      partials: paths.partials,
      data:     paths.data,
      helpers:  paths.helpers,
    }))
    .pipe(Gulp.dest(dist()))
}

// update all templates
function resetPages(done) {
  Panini.refresh()
  done()
}

// compile sass -> css; minify in production
function css() {
  return Gulp.src(PATHS.css.entry)
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.css.include
    })
      .on('error', $.sass.logError))
    .pipe($.postcss([
      PostcssAnt(),
      Autoprefixer({ browsers: CONFIG.autoprefixer_compatibility }),
      Pixrem(),
    ]))
    .pipe($.if(PRODUCTION, $.cssnano()))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    // Uncomment if using manifest
    // .pipe($.if(PRODUCTION, $.rev()))
    .pipe(Gulp.dest(dist()))
    // .pipe($.if(PRODUCTION, $.rev.manifest()))
    // .pipe($.if(PRODUCTION, Gulp.dest(dist())))
    .pipe(BrowserSync.reload({ stream: true }))
}

// bundle js with webpack; adjust for dev vs. production
function js() {
  return Gulp.src(PATHS.js.entry)
    .pipe(Named())
    .pipe(WebpackStream(wpOptions, Webpack))
    .pipe(Gulp.dest(dist()))
}

// copy images to dist; compress in production
function images() {
  return Gulp.src(PATHS.img.include)
    .pipe($.if(PRODUCTION, $.imagemin({
      progressive: true
    })))
    .pipe(Gulp.dest(dist(PATHS.img.output_dir)))
}

// start browsersync; open in browser
function devServer(done) {
  const server = CONFIG.dev_server

  const bsOptions = {
    port:   server.port,
    notify: false,
    open:   false,
  }
  if(server.back)
    bsOptions.proxy = server.domain
  else
    bsOptions.server = dist()

  BrowserSync.init(bsOptions)
  done()

  exec(`open http://${server.domain}:${server.port}`)
}

function reload(done) {
  BrowserSync.reload()
  if(typeof done === 'function')
    done()
}

function watch() {
  Gulp.watch(PATHS.etc).on('all', Gulp.series(fonts, reload))
  Gulp.watch(PATHS.fonts.watch).on('all', Gulp.series(fonts, reload))
  Gulp.watch(PATHS.html.watch.pages).on('all', Gulp.series(pages, reload))
  Gulp.watch(PATHS.html.watch.reset).on('all', Gulp.series(resetPages, pages, reload))
  Gulp.watch(PATHS.css.watch).on('all', css)
  Gulp.watch(PATHS.js.watch).on('all', Gulp.series(js, reload))
  Gulp.watch(PATHS.img.watch).on('all', Gulp.series(images, reload))

  Gulp.watch(PATHS.backend).on('all', reload)
}
