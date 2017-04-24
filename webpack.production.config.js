/* production */
const path = require('path');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
var DefinePlugin = require("webpack/lib/DefinePlugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: [
    'react',
    'redux',
    "react-router",
    'react-redux',
    'react-router-redux',
    'react-dom'
    ]
  },
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  plugins: [
    new DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new ExtractTextPlugin('[name].css'),
    new CommonsChunkPlugin('vendor',  'vendor.js'),
    new UglifyJsPlugin({minimize:true})
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel?presets[]=es2015&presets[]=react',
        exclude: /node_modules/,
        include: __dirname
      },  {
            test: /\.css$/,
            exclude: /^node_modules$/,
            loader: ExtractTextPlugin.extract('style', ['css', 'autoprefixer'])
        }, {
            test: /\.less$/,
            exclude: /^node_modules$/,
            loader: ExtractTextPlugin.extract('style', ['css', 'autoprefixer', 'less'])
        }, {
            test: /\.scss$/,
            exclude: /^node_modules$/,
            loader: ExtractTextPlugin.extract('style', ['css', 'autoprefixer', 'sass'])
        }, {
            test: /\.jsx$/,
            exclude: /^node_modules$/,
            loaders: ['jsx', 'babel']
        }
    ]
  }
}
