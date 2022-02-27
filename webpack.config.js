const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')

//Surface proX ARM Processor에서 발생하는 경고 문구
const webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
      'assets': path.resolve(__dirname, 'src/assets')
    }
  },
  
  entry: './src/main.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.(png|jpe?g|gif\webp)$/,
        use: 'file-loader'
      },
      {
        test: /\.s?css$/,
        use: [
          'vue-style-loader',
          //'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      }
    ]
  },

  plugins: [
    new HtmlPlugin({
      template: './index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'static' }
      ]
    }),
    new VueLoaderPlugin(),
    // Surface ProX ARM processor에서 발생하는 경고 문구
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,      //default: true
      __VUE_PROD_DEVTOOLS__: false,   //default: false
    }),
  ],

  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true,
  },
}
