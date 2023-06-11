## css-loader

- 安装：

`npm i style-loader css-loader -D`

- 使用：

```js
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.css$/,
        /**
        * 执行顺序从右往左，要先执行css-loader在执行style-loader
        * css-loader 加载css文件并解析import的css文件，最终返回css代码
        * style-loader 将模块导出的内容作为样式并添加到DOM中
        */
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  ...
}

```

- 如果需要把css单独拆分出文件形式就需要借助插件：`npm i mini-css-extract-plugin -D`

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.css$/,
        /**
        * 执行顺序从右往左，要先执行css-loader在执行MiniCssExtractPlugin.loader
        * css-loader 会解析css文件把文件内容转成字符串
        * MiniCssExtractPlugin.loader会把样式以文件的形式打包
        */
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    ...
  ],
}
```

