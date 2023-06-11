## html-webpack-plugin

- 安装：`npm i html-webpack-plugin -D`


- 使用：


```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  ...
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/public/index.html', // 模板的位置
      filename: 'index.html', // 生成的文件名
      chunks: ['index'], // 对应的js文件名
    }),
    // 如果是多个入口就对应多个模板
    new HtmlWebpackPlugin({
      template: './src/public/login.html',
      filename: 'login.html',
      chunks: ['login']
    }),
    ...
  ],
}
```

