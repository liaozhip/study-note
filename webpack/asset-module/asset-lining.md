## `inline` 资源(`inlining asset`)

`webpack.config.js`

```diff
module.exports = {
  ...
  module: {
  	...
    rules: [
      {
        test: /\.svg/,
        type: 'asset/inline'
      }
    ]
  }
};
```

所有 `.svg` 文件都将作为 data URI 注入到 bundle 中。

- 自定义 data URI 生成器

  ```js
  const svgToMiniDataURI = require('mini-svg-data-uri');
  module.exports = {
    ...
    module: {
      rules: [
        {
          test: /\.svg/,
          type: 'asset/inline',
          generator: {
           dataUrl: content => {
             content = content.toString();
             return svgToMiniDataURI(content);
           }
         }
        }
      ]
    },
  };
  ```

  现在，所有 `.svg` 文件都将通过 `mini-svg-data-uri` 包进行编码。