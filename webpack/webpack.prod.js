const { merge } = require('webpack-merge');
const base = require('./webpack.base.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const WebpackBar = require('webpackbar');
let progressPlugin = new WebpackBar({
  color: '#85d', // 默认green，进度条颜色支持HEX
  basic: true, // 默认true，启用一个简单的日志报告器
  profile: false, // 默认false，启用探查器。
});

const smp = new SpeedMeasurePlugin({
  compareLoadersBuild: {
    filePath: './buildInfo.json',
  },
});
// smp.wrap(webpackConfig)
module.exports = merge(base, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      (compiler) => {
        const TerserPlugin = require('terser-webpack-plugin');
        new TerserPlugin({
          minify: TerserPlugin.esbuildMinify,
        }).apply(compiler);
      },
    ],
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    new CopyPlugin({
      patterns: [{ from: 'assets/js', to: 'assets/js' }],
    }),
    progressPlugin,
    new CompressionPlugin({
      threshold: 10240,
      minRatio: 0.8,
      test: /\.(css|js)/i,
      algorithm: 'gzip',
    }),
    new BundleAnalyzerPlugin(),
  ],
  output: {
    clean: true,
  },
});
