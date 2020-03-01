module.exports = {
  filenameHashing: false,
  chainWebpack: config => {
    // 不生成HTML
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // 不分割JS
    config.optimization.delete('splitChunks')
    // 打包字体
    config.module.rule('fonts').use('url-loader').tap(options => {
      options.limit = 999999999
      return options
    })
  },
  productionSourceMap: false,
  // 打包CSS
  css: {
    extract: false
  }
}
