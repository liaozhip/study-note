# webpack

## webpack 安装

- 局部安装：

  - ```shell
    npm install webpack webpack-cli -D
    ```

- 零配置打包：

  - 新建目录src/index.js -> 加入js内容。

    ```js
    console.log('hello webpack.')
    ```

  - 然后用在当前项目下运行。

    ```shell
    npx webpack
    ```

    方式二：在package.json -> scripts里面加：

    ```json
    "scripts": {
        "build": "webpack",
      },
    ```

    在项目下运行命令：`npm run build` .

  - 打包成功后会放到 `dist` 目录下。

- webpack的配置文件：默认是 `webpack.config.js`.

1. [什么是chunk?](https://github.com/liaozhip/study-note/blob/master/chunk.md)
2. [如何处理css：css-loader、style-loader、mini-css-extract-plugin](https://github.com/liaozhip/study-note/blob/main/webpack/loader/css-loader.md)
3. [如何处理less：less-loader](https://github.com/liaozhip/study-note/blob/main/webpack/loader/less-loader.md)
4. [如何处理sass：sass-loader](https://github.com/liaozhip/study-note/blob/main/webpack/loader/sass-loader.md)
5. [如何让css兼容浏览器：postcss、postcss-loader、autoprefix、cssnano](https://github.com/liaozhip/study-note/blob/main/webpack/loader/postcss-loader.md)
6. [如何自定义一个处理less的loader](https://github.com/liaozhip/study-note/blob/main/webpack/loader/my-less-loader.md)
7. [如何自定义一个处理js的loader](https://github.com/liaozhip/study-note/blob/main/webpack/loader/my-js-loader.md)
8. [清除打包文件：clean-webpack-plugin](https://github.com/liaozhip/study-note/blob/main/webpack/plugin/clean-webpack-plugin.md)
9. [提供html打包模板：html-webpack-plugin](https://github.com/liaozhip/study-note/blob/main/webpack/plugin/html-webpack-plugin.md)
10. [压缩图片文件：image-minimizer-webpack-plugin](https://github.com/liaozhip/study-note/blob/main/webpack/asset-module/image-minimizer-webpack-plugin.md)
11. [webpack5的asset处理文件模块](https://github.com/liaozhip/study-note/blob/main/webpack/asset-module/asset.md)
12. [webpack5使用类似file-loader的功能](https://github.com/liaozhip/study-note/blob/main/webpack/asset-module/asset-resource.md)
13. [webpack5使用类似url-loader的功能](https://github.com/liaozhip/study-note/blob/main/webpack/asset-module/asset-lining.md)
14. [webpack5配置自动处理文件](https://github.com/liaozhip/study-note/blob/main/webpack/asset-module/asset-universal.md)
15. [webpack5的url资源模块](https://github.com/liaozhip/study-note/blob/main/webpack/asset-module/asset-url.md)
16. [使用babel-loader、vue、react](https://github.com/liaozhip/study-note/blob/main/webpack/loader/babel-loader.md)