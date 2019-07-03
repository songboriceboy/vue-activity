const autoprefixer = require('autoprefixer')
const pxtoviewport = require('postcss-px-to-viewport')
const path = require('path')

module.exports = {
  publicPath: './',

  productionSourceMap: false, // 生产环境下不启用 SourceMap

  // 配置 axios 代理请求
  devServer: {
    // port: '8080', //代理端口
    proxy: {
      '/': {
        //代理api
        target: 'https://merchants.lzdu.com/api', //服务器api地址
        changeOrigin: true, //是否跨域
        ws: false, // proxy websockets
        pathRewrite: {
          //重写路径
          '^/api': '/api'
        }
      }
    }
  },

  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 750, // 设计稿宽度
            viewportHeight: 1334, // 设计稿高度，可以不指定
            unitPrecision: 3, // px to vw无法整除时，保留几位小数
            viewportUnit: 'vw', // 转换成vw单位
            selectorBlackList: ['.ignore', '.hairlines'], // 不转换的类名
            minPixelValue: 1, // 小于1px不转换
            mediaQuery: false, // 允许媒体查询中转换
            exclude: /(\/|\\)(node_modules)(\/|\\)/ // node_modules目录排除掉
          })
        ]
      }
    }
  },

  configureWebpack: {
    resolve: {
      alias: {
        '@images': '@/assets/images'
      }
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/common/style/base.less')]
    }
  }
}
