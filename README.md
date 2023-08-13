<!--
 * @Date: 2023-06-30 15:20:16
 * @LastEditors: Fullsize
 * @LastEditTime: 2023-08-13 09:48:29
 * @FilePath: /react-falsework/README.md
 * @Author: Fullsize
-->

# react-falsework

## 项目启动

```
yarn dev or npm run dev
```

## 项目打包

```
yarn build or npm run build
```

## css module

```
*.module.css 为开启css module
*.css 为正常模式
```

## git commit 提交规范

```
feat：新功能（feature）
fix：修补bug
docs：文档（documentation）
style： 格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
test：增加测试
chore：构建过程或辅助工具的变动
```

## 项目结构
```
economy-mobile
├─README.md
├─index.html
├─package.json
├─postcss.config.js
├─tsconfig.json
├─webpack
|    ├─webpack.base.js
|    ├─webpack.dev.js
|    └webpack.prod.js
├─types
|   ├─css.d.ts
|   ├─images.d.ts
|   └window.d.ts
├─src
|  ├─index.tsx
|  ├─service
|  |    └request.ts
|  ├─routes
|  |   └index.ts
|  ├─pages
|  |   ├─home
|  |   |  ├─index.css
|  |   |  ├─index.module.css
|  |   |  └index.tsx
|  |   ├─a
|  |   | └index.tsx
|  ├─components
|  |     ├─route-component
|  |     |        └index.tsx
|  |     ├─layout
|  |     |   ├─index.module.css
|  |     |   └index.tsx
|  |     ├─echart
|  |     |   ├─index.module.css
|  |     |   └index.tsx
├─assets
|   ├─js
|   | └config.js
|   ├─images
|   |   └1.png
```
