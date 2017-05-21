var path = require('path')
var webpack = require('webpack')

module.exports = {
  output: {
    filename: '[name].js',
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js' // 'vue/dist/vue.common.js' for webpack 1
    }
  },
  plugins: [new webpack.optimize.UglifyJsPlugin()],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
