## URL 资源

当使用 `new URL('./path/to/asset', import.meta.url)`，webpack 也会创建资源模块。

`index.js`

```js
const logo = new URL('./logo.svg', import.meta.url)
```

自 webpack 5.38.0 起，[Data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) 也支持在 `new URL()` 中使用了：

```js
const url = new URL('data:,', import.meta.url);
console.log(url.href === 'data:,');
console.log(url.protocol === 'data:');
console.log(url.pathname === ',');
```

