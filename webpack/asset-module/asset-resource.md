## Resource

`webpack.config.js`

```js
module.exports = {
 ...
 module: {
   rules: [
     ...
     {
       test: /\.(png|jpe?g|svg)/,
       type: 'asset/resource'
     }
   ]
 },
 ...
};
```

所有 `.png` 文件都将被发送到输出目录，并且其路径将被注入到 bundle 中，除此之外，你可以为它们自定义 `outputPath`和`publicPath`属性。

```js
module.exports = {
  ...
  module: {
   rules: [
      ...
      {
        test: /\.(png|jpe?g|svg)/,
        type: 'asset/resource',
        generator: {
          outputPath: '',
          publicPath: '',
        }
      }
    ]
  },
  ...
};
```

#### 自定义输出文件名

默认情况下，`asset/resource` 模块以 `[hash][ext][query]` 文件名发送到输出目录。

可以通过在 `webpack` 配置中设置 `output.assetModuleFilename` 来修改此模板字符串。

```js
module.exports = {
  ...
  output: {
    ...
    assetModuleFilename: 'static/images/[name][ext]'
  },
  ...
}
```

方式二：另一种自定义输出文件名的方式，这一种全权重比前一种高。

```js
const path = require('path');

module.exports = {
  ...
  module: {
    rules: [
      ...
     {
       test: /\.png/,
       type: 'asset/resource',
       generator: {
         filename: 'static/images/[name][ext]'
       }
     }
    ]
  },
};
```