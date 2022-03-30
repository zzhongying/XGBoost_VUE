module.exports = {
  devServer: {
    host: '127.0.0.1',
  },
  lintOnSave: false
  // proxyTable: {
  //   '/api': {
  //     target: 'http://localhost:5000/',    //后端接口地址
  //     changeOrigin: true,              //是否允许跨越
  //     pathRewrite: {
  //       '^/api': 'http://localhost:5000/' //路径重写
  //     }
  //   }
  // }

}
// module.exports = {
//   devServer: {
//     overlay: {
//       warnings: false, //不显示警告
//       errors: false //不显示错误
//     }
//   },
//   lintOnSave: false //关闭eslint检查
// }