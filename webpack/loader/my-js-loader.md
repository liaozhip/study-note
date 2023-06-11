## 自定义loader

- 创建一个文件夹custom-loader/my-loader.js。

  ```js
  /**
   * 自定义 loader
   * @param {string|Buffer} content 源文件的内容
   * @param {object} [map] 可以被 https://github.com/mozilla/source-map 使用的 SourceMap 数据
   * @param {any} [meta] meta 数据，可以是任何内容
   */
  // 
  module.exports = function(content, map, meta) { // 不能是箭头函数
    // 通过this.query拿到配置
    const { name } = this.query
    content = content.replace('hello', name)
  
    // 1. 必须有返回值：String | Buffer
    // return content
  
    // 2. 如何能有多个返回值 -> 使用 this.callback
    // this.callback(null, content, map, meta)
  
    // 3. 如何异步返回 -> this.async() 返回一个 和this.callback 一样的函数
    const callback = this.async()
    callback(null, content, map, meta) // 第一个参数是 err 有错误的话就传递，没有就传 null
  }
  ```

- 配置webpack.config.js

  ```js
  module.exports = {
    ...
    resolveLoader: {
      modules: ['./node_modules', './custom_loader'], // node_modules是默认的
    },
    module: {
      rules: [
        ...
        {
          test: /\.js$/,
          use: {
            loader: 'my-loader', // 配置了resolveLoader就直接用文件名，否则需要绝对路径
            options: {
              name: '么么哒',
            }
          },
        }
      ]
    },
    ...
  }
  ```

  