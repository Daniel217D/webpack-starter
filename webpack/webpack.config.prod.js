const Webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const docs = require('./webpack.docs.js');
const dist = require('./webpack.dist.js');

module.exports = env => {
  const main = env.dist ? dist : (env.docs ? docs : {});

  const js_name = env.dist ? {
    filename: '[name].js',
    library: "$c",
    libraryTarget: "umd"
  } : env.docs ? {
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js'
  } : {};

  return merge(main, {
    mode: 'production',
    devtool: 'source-map',
    stats: 'errors-only',
    bail: true,
    output: js_name,
    plugins: [
      new Webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new Webpack.optimize.ModuleConcatenationPlugin(),
      new MiniCssExtractPlugin({
        filename: 'bundle.css'
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.s?css/i,
          use : [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    }
  })
};
