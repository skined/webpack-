const path = require('path');
const HtmlWebpcakPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const AddAssetHtmlCdnWebpackPlugin = require('add-asset-html-cdn-webpack-plugin');
// reslove函数用来返回一个绝对路径
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const resolve = file => path.resolve(__dirname, file);
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: resolve('dist'),
    filename: 'js/main.js',
    // publicPath: 'www.baidu.com',
  },
  // 源码映射
  devtool: 'source-map',
  devServer: {
    port: 3005,
    contentBase: './dist',
    compress: true,
    open: true,
    proxy: {},
  },
  // 优化项
  optimization: {
    minimizer: [new OptimizeCssAssetsWebpackPlugin({}), new TerserWebpackPlugin({})],
  },
  // 配置忽略打包项
  externals: {
    jquery: 'jQuery',
  },
  plugins: [
    new HtmlWebpcakPlugin({
      template: './public/index.html',
      hash: true,
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
    }),
    new CleanWebpackPlugin(),
    new webpack.BannerPlugin('make by ry'),
    new CopyWebpackPlugin([
      {
        from: './src/static',
        to: './static',
      },
    ]),
  ],
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      // {
      //   test: require.resolve('jquery'),
      //   use: 'expose-loader?$',
      // },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1 * 1024,
            outputPath: '/img/',
          },
        },
      },
      {
        test: /\.html$/,
        use: 'html-withimg-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
};
