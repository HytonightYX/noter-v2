const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackCommonConf = require('./webpack.common')
const { smart } = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TerserJSPlugin = require("terser-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

module.exports = smart(webpackCommonConf, {
  mode: 'production',
  output: {
    publicPath: '/',
  },
  devtool: 'none',
  resolve: {
    mainFields: ['jsnext:main', 'browser', 'main']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    // 开启 scope hosting
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  optimization: {
    minimizer: [
      // 多进程压缩
      new TerserJSPlugin({
        // 设置缓存目录
        cache: path.resolve('.cache'),
        parallel: 4,
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    // 代码分割，优化缓存
    splitChunks: {
      chunks: 'all',

      cacheGroups: {
        vendor: {
          name: 'vendor',
          priority: 1,
          test: /node_modules/,
          minSize: 0,
          minChunks: 1
        },
        common: {
          name: 'common',
          priority: 0,
          minSize: 0,
          minChunks: 2
        }
      }
    }
  }
})