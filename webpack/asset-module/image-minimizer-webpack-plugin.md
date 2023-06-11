## image-minimizer-webpack-plugin

- 安装：

  `npm i image-minimizer-webpack-plugin imagemin -D`

​		`cnpm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo --save-dev`

​		注意：使用npm安装会报错

- 使用

  `webpack.config.js`

  ```js
  const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin');
  module.exports = {
    ...
    module: {
      rules: [
        {
          test: /\.(png|jpe?g)/,
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
      ]
    },
    plugins: [
      new ImageMinimizerWebpackPlugin({
        minimizer: {
          implementation: ImageMinimizerWebpackPlugin.imageminGenerate,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true } ],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              // [
              //   // Svgo configuration here https://github.com/svg/svgo#configuration
              //   'svgo',
              //   {
              //     plugins: [
              //       'preset-default',
              //       'prefixIds',
              //       {
              //         name: 'sortAttrs',
              //         params: { xmlnsOrder: 'alphabetical' }
              //       }
              //     ]
              //   }
              // ]
            ]
          }
        },
        loader: false
      }),
    ],
  }
  
  ```

  