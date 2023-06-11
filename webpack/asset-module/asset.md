## 发送一个单独的文件并导出 URL。之前通过使用 `file-loader` 实现。

当在 `webpack 5` 中使用旧的 `assets loader`（如 `file-loader`/`url-loader`/`raw-loader` 等）和 asset 模块时，你可能想停止当前 asset 模块的处理，并再次启动处理，这可能会导致 asset 重复，你可以通过将 asset 模块的类型设置为 `'javascript/auto'` 来解决。

`webpack.config.js`

```js
module.exports = {
  module: {
   rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            }
          },
        ],
       type: 'javascript/auto'
      },
   ]
  },
}
```

如需从 asset loader 中排除来自新 URL 处理的 asset，请添加 `dependency: { not: ['url'] }` 到 loader 配置中。

`webpack.config.js`

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
       dependency: { not: ['url'] },
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  }
}
```