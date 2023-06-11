## my-less-loader

#### 配置一个自定义的loader来处理less文件。

- 首先创建三个文件 `my-less-loader.js my-css-loader.js my-style-loader.js`。

  `my-less-loader.js`

  ```js
  const less = require('less');
  
  module.exports = function(content) {
    less.render(content, (error, { css }) => {
      this.callback(error, css)
    })
  }
  ```

  `my-css-loader.js`

  ```js
  module.exports = function(content) {
    content = JSON.stringify(content)
    this.callback(null, content)
  }
  ```

  `my-style-loader.js`

  ```js
  module.exports = function(content) {
    content = `
      const tag = document.createElement('style')
      tag.innerHTML = ${content}
      document.head.appendChild(tag)
    `
    return content
  }
  ```

- webpack.config.js配置

  ```js
  module.exports = {
    ...
    resolveLoader: {
      modules: ['./node_modules', './custom_loader']
    },
    module: {
      rules: [
        ...
        {
          test: /\.less$/,
          use: ['my-style-loader', 'my-css-loader', 'my-less-loader'],
        },
        ...
      ]
    },
    ...
  }
  
  ```

  