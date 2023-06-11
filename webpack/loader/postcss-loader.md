## postcss-loader

- 安装：

  `npm i postcss postcss-loader autoprefix cssnano -D`

- 使用：

  ```js
  module.exports = {
    ...
    module: {
      rules: [
        ...
        {
          test: /\.less$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
        },
      ]
    },
    ...
  }
  ```
  
- 根目录下创建 `postcss.config.js`。

  ```js
  module.exports = {
    plugins: [ // 加载postcss插件
      require('autoprefixer')({
          // 配置，权重比.browserslistrc高
      }), // 兼容浏览器
      require('cssnano'), // 压缩css文件
    ]
  }
  ```

  

- 配置需要兼容的浏览器：

  - 方法一：在package.json里面配置。

    ```json
    {
      ...
      "browserslist": ["last 2 versions", ">1%"], // 配置浏览器最近两个用户使用大于1%的浏览器
    }
    ```

  - 方法二：创建 `.browserslistrc` 文件。

    ```shell
    last 2 versions
    >1%
    ```

- 查看兼容的浏览器和版本有哪些。(注意用单引号会查询失败)

  `npx browserslist "last 2 versions, >1%"`

  ```shell
  and_chr 112
  and_ff 110
  and_qq 13.1
  and_uc 13.4
  android 112
  baidu 13.18
  bb 10
  bb 7
  chrome 112
  chrome 111
  chrome 110
  chrome 109
  edge 112
  edge 111
  edge 110
  firefox 112
  firefox 111
  firefox 110
  ie 11
  ie 10
  ie_mob 11
  ie_mob 10
  ios_saf 16.4
  ios_saf 16.3
  ios_saf 16.2
  ios_saf 16.1
  ios_saf 16.0
  ios_saf 15.6
  kaios 3.0-3.1
  kaios 2.5
  op_mini all
  op_mob 73
  op_mob 12.1
  opera 95
  opera 94
  safari 16.4
  safari 16.3
  samsung 20
  samsung 19.0
  ```

  