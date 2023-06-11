const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  // 入口：string | object
  entry: {
    index: './src/index.js',
    login: './src/login.js',
  },
  // 出口
  output: {
    path: path.resolve(__dirname, './build'), // 存放路径，必须是绝对路径
    filename: 'js/[name].js', // 文件名称，占位符[name]
    assetModuleFilename: 'static/images/[name][ext]', // 文件打包名称
  },
  mode: 'production', // none | production | development
  resolveLoader: {
    modules: ['./node_modules', './custom_loader']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: ['vue-loader']
      },
      {
        test: /\.(png|jpe?g|svg)/,
        type: 'asset',
        generator: {
          filename: 'static/images/[name][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024
          }
        }
      },
      {
        test: /\.(woff|woff2)/,
        type: 'asset',
        generator: {
          filename: 'static/font/[name][ext]'
        },
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ImageMinimizerWebpackPlugin({
      minimizer: {
        implementation: ImageMinimizerWebpackPlugin.imageminGenerate,
        options: {
          plugins: [
            ['gifsicle', { interlaced: true } ],
            ['jpegtran', { progressive: true }],
            ['optipng', { optimizationLevel: 5 }],
            [
              // Svgo configuration here https://github.com/svg/svgo#configuration
              'svgo',
              {
                plugins: [
                  'preset-default',
                  'prefixIds',
                  {
                    name: 'sortAttrs',
                    params: { xmlnsOrder: 'alphabetical' }
                  }
                ]
              }
            ]
          ]
        }
      },
      loader: false
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css'
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      filename: 'index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: './src/public/login.html',
      filename: 'login.html',
      chunks: ['login']
    }),
  ],
}
