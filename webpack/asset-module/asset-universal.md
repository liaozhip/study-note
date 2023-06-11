## 通用资源类型

`webpack.config.js`

```js
module.exports = {
  ...
  module: {
    rules: [
      {
       test: /\.txt/,
       type: 'asset',
      }
    ]
  },
};
```

现在，`webpack` 将按照默认条件，自动地在 `resource` 和 `inline` 之间进行选择：小于 `8kb` 的文件，将会视为 `inline` 模块类型，否则会被视为 `resource` 模块类型。

配置字体：

```
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.(woff|woff2)/,
        type: 'asset',
        generator: {
          filename: 'static/font/[name][ext]'
        },
      }
    ]
  },
};
```



可以通过在 webpack 配置的 module rule 层级中，设置选项来修改此条件：

`webpack.config.js`

```js
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.txt/,
        type: 'asset',
       parser: {
         dataUrlCondition: {
           maxSize: 4 * 1024 // 4kb
         }
       }
      }
    ]
  },
};
```

还可以指定一个函数来决定是否 `inline` 模块。

`webpack.config.js`

```js
module.exports = {
  ...
  module: {
    rules: [
      {
        ...
        parser: {
          dataUrlCondition: (source, { filename, module }) => {
            const content = source.toString();
            return content.includes('some marker');
          },
        },
      },
    ],
  },
};
```

当提供函数时，返回 `true` 值时告知 `webpack` 将模块作为一个 `Base64` 编码的字符串注入到包中， 否则模块文件会被生成到输出的目标目录中。