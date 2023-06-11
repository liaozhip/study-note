## less-loader

- 安装：

  `npm i less less-loader -D`

- 使用：

  ```js
  module.exports = {
    ...
    module: {
      rules: [
        ...
        {
          test: /\.less$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
        },
      ]
    },
    ...
  }
  
  ```
  
  