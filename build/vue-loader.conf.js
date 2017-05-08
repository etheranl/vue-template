var utils = require('./utils')
var config = require('./config')
var isProduction = process.env.NODE_ENV === 'production'
var px2remConfig = require('./rem.conf')

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  postcss: [
    require('postcss-px2rem')(px2remConfig),
    require('autoprefixer')
  ]
}
