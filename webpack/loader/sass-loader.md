## sass-loader

- 安装：

  `npm i sass sass-loader -D`

- 使用：

  ```js
  module.exports = {
    ...
    module: {
      rules: [
        ...
        {
          test: /\.less$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
        },
      ]
    },
    ...
  }