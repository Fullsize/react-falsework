const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[hash:8].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.mjs', '.js', '.json', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@images': path.resolve(__dirname, '../assets/images'),
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
    }),
    new ESLintPlugin({
      emitError: true,
      extensions: ['js', 'ts', 'jsx', 'tsx'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader:
              process.env.NODE_ENV === 'development'
                ? 'style-loader'
                : MiniCssExtractPlugin.loader,
            options:
              process.env.NODE_ENV === 'development'
                ? {}
                : {
                    publicPath: '../',
                  },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              esModule: false,
              url: process.env.NODE_ENV === 'development' ? false : true,
              modules: {
                auto: (resourcePath) => resourcePath.endsWith('.module.css'), // 匹配.less文件来进行css模块化。
                localIdentName: '[local]_[hash:base64:10]',
              },
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          ...(process.env.NODE_ENV !== 'development' ? ['thread-loader'] : []),
          'babel-loader',
        ],
      },

      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        type: 'asset',
        generator: {
          filename: 'images/[hash][ext][query]',
        },
      },
      {
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        enforce: 'pre',
        use: ['@svgr/webpack', 'url-loader'],
      },
    ],
  },
};
