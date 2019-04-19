const webpack = require("webpack");
module.exports = {
  lintOnSave: false,
  // devServer: {
  //   open: process.platform === 'darwin',
  //   // host: '127.0.0.1',
  //   port: 9099,
  //   https: false,
  //   hotOnly: false,
  //   proxy: null, // 设置代理
  //   before: app => {}
  // },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      })
    ]
  }
}
