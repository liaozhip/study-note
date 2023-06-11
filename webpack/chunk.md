## chunk

- 代码片段，一个module对应一个chunk。

## chunks

- chunk组，包含至少一个chunk(module)。

## chunk names

- chunks的有效名称。

## bundle module

- 一个bundle对应一个chunk names(chunks)。
- 一个chunk names(chunks)，包含至少一个module(chunk)。

## loader

- webpack默认只会打包.js、.json文件，使用loader可以解决这个问题。
- 一个loader只做一件事情。