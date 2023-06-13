## 包的更新操作：
`npm version major -m "description"`: 大版本更新操作，例如：v1.0.0 => v2.0.0
`npm version minor -m "description"`: 小版本改动操作，例如：v1.0.0 => v1.1.0
`npm version patch -m "description"`: 修复问题后的版本改动，例如v1.0.0 => v1.0.1

## 搭建npm私服：`npm i verdaccio -g`
执行 `verdaccio` 命令启动 npm 私服，然后访问：`http://localhost:4873/`