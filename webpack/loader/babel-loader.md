## babel-loader

- 安装：

  `cnpm i babel-loader @babel/core @babel/preset-env -D`
  
  `cnpm i core-js -S`

​		注意：使用npm安装会报错。

- 方法一：在`webpack.config.js`配置：

  ```js
  module.exports = {
    ...
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          options: [
            ['@babel/preset-env', { useBuiltIns: 'useage', corejs: 3 }]
          ]
        }
      ]
    },
    ...
  }
  ```

- 方式二：单独配置`.babelrc`文件

  ```json
  {
    "presets": [
      ["@babel/preset-env", {
        "useBuiltIns": "usage",
        "corejs": 3
      }]
    ]
  }
  ```

- 配置`vue`环境：

  - 在webpack.config.js中：

    ```js
    const { VueLoaderPlugin } = require('vue-loader');
    module.exports = {
      ...
      module: {
        rules: [
          {
            test: /\.vue$/,
            exclude: /node_modules/,
            use: ['vue-loader']
          }
        ]
      },
      plugins: [ new VueLoaderPlugin() ]
    }
    ```

    

- 配置`react`环境：

  - 在`webpack.config.js`中：

    ```js
    module.exports = {
      ...
      module: {
        rules: [
          {
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          }
        ]
      },
      ...
    }
    ```

  - 在`.babelrc`文件中：

    ```js
    {
      "presets": [
        ["@babel/preset-env", {
          "useBuiltIns": "usage",
          "corejs": 3
        }],
        "@babel/preset-react"
      ]
    }
    ```

  
