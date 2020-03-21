const path = require('path');
const targets = require('./targets');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || '10000',
);

module.exports = function(webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';
  process.env.NODE_ENV = webpackEnv; // required for babel.config.js

  return {
    devtool: shouldUseSourceMap
      ? isEnvProduction
        ? 'source-map'
        : 'cheap-module-source-map'
      : false,
    entry: path.join(__dirname, 'src', 'index.tsx'),
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    module: {
      rules: [
        {
          oneOf: [
            {
              loader: 'url-loader',
              options: {
                limit: imageInlineSizeLimit,
                name: 'static/media/[name].[hash:8].[ext]',
              },
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            },
            {
              include: path.join(__dirname, 'src'),
              loader: 'babel-loader',
              options: {
                cacheCompression: false,
                cacheDirectory: true,
                compact: isEnvProduction,
              },
              test: /\.(ts|tsx)$/,
            },
            {
              include: path.join(__dirname, 'node_modules'),
              loader: 'babel-loader',
              options: {
                babelrc: false,
                cacheCompression: false,
                cacheDirectory: true,
                compact: false,
                configFile: false,
                inputSourceMap: shouldUseSourceMap,
                presets: [
                  ['@babel/preset-env', { targets: targets(isEnvProduction) }],
                ],
                sourceMaps: shouldUseSourceMap,
                sourceType: 'unambiguous',
              },
              test: /\.(js|mjs)$/,
            },
            {
              sideEffects: true,
              test: /\.css$/,
              use: [
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                    sourceMap: shouldUseSourceMap,
                  },
                },
              ],
            },
            {
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              loader: 'file-loader',
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ],
    },
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        new TerserPlugin({
          sourceMap: shouldUseSourceMap,
          terserOptions: {
            compress: {
              comparisons: false,
              inline: 2,
            },
            output: {
              ascii_only: true,
              comments: false,
            },
          },
        }),
      ],
      splitChunks: {
        chunks: 'all',
      },
    },
    output: {
      chunkFilename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : isEnvDevelopment && 'static/js/[name].chunk.js',
      filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : isEnvDevelopment && 'static/js/[name].js',
      // TODO: remove this when upgrading to webpack 5
      futureEmitAssets: true,
      path: path.join(__dirname, 'build'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.join(__dirname, 'src', 'index.html'),
        ...(isEnvProduction && {
          minify: {
            collapseWhitespace: true,
            keepClosingSlash: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true,
          },
        }),
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
  };
};
