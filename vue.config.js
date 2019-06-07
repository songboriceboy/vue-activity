const autoprefixer = require('autoprefixer')
const pxtoviewport = require('postcss-px-to-viewport')
const path = require('path')

module.exports = {
  outputDir: 'docs',
  publicPath: process.env.NODE_ENV === 'production' ? '/merchants-h5/' : '/',

  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 375
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
