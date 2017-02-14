var path = require('path')
var config = require('./config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'static': path.resolve(__dirname, '../static'),
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    /*preLoaders: [{
      test: /\.vue$/,
      loader: 'eslint',
      include: projectRoot,
      exclude: /node_modules/
    }, {
      test: /\.js$/,
      loader: 'eslint',
      include: projectRoot,
      exclude: /node_modules/
    }],*/
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.js$/,
      loader: 'babel',
      include: projectRoot,
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.html$/,
      loader: 'vue-html'
    }, {
      test: /vued.src.*?js$/,
      loader: 'babel'
    }]
  },
  vue: {
    loaders: utils.cssLoaders()
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './controller', to: `${config.build.app}/controller` },
      { from: './model', to: `${config.build.app}/model` },
      { from: './deploy', to: `${config.build.app}/deploy` },
      { from: './mock', to: `${config.build.app}/mock` }
    ])
  ]
}
