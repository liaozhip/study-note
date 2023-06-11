## clean-webpack-plugin

- 安装：`npm i clean-webpack-plugin -D`


- 使用：


```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  ...
  plugins: [
    new CleanWebpackPlugin(),
    ...
  ],
}
```

