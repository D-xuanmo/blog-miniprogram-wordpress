# 博客小程序版

- 框架已经集成scss编译、es6编译（解决微信小程序不能使用async/await语法糖）
- 可搭配现有wordpress主题使用[https://github.com/xuanmos/xm-nuxtjs-wordpress](https://github.com/xuanmos/xm-nuxtjs-wordpress)

## 在线预览
![](./qrcode.jpg)

## 项目启动

## 替换微信小程序配置文件
```json
// src/project.config.json
{
  "appid": "替换为自己的小程序id",
  "projectname": "自己的小程序名"
}
```

### 安装依赖
```bash
$ yarn
# or
$ npm i
```

### 启动项目
```bash
$ yarn dev
# 打开微信开发者工具选择dist目录即可，微信开发者工具只用于调试，不写代码
```

### 打包项目
```bash
$ yarn build
```

## 项目规范
- [eslint风格指南](https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md)
- [css风格指南](https://codeguide.bootcss.com/#css)
- 内部方法使用下划线开始，如`_myPrivateMethod`

## 目录说明
```
gulp-wechat
├─.babelrc
├─.editorconfig
├─.eslintignore
├─.eslintrc.js
├─.npmrc
├─README.md
├─package.json
├─yarn.lock
├─src
|  ├─_var.scss // 项目公用scss变量(注：下划线开头的scss不会被编译成文件)
|  ├─app.js // 小程序启动入口文件
|  ├─app.json // 小程序配置项
|  ├─app.scss // 公用scss
|  ├─project.config.json // 小程序项目配置
|  ├─sitemap.json // 小程序站点地图
|  ├─utils // 公用工具类
|  |   ├─const.js // 全局公用变量
|  |   ├─date.js // 时间转换工具类
|  |   └index.js
|  ├─request // 公用请求方法
|  |    └index.js
|  ├─pages // 小程序页面目录
|  |   ├─logs
|  |   |  ├─logs.js
|  |   |  ├─logs.json
|  |   |  ├─logs.scss
|  |   |  └logs.wxml
|  |   ├─index
|  |   |   ├─index.js
|  |   |   ├─index.json
|  |   |   ├─index.scss
|  |   |   └index.wxml
|  ├─image
|  |   ├─icon_API.png
|  |   ├─icon_API_HL.png
|  |   ├─icon_component.png
|  |   └icon_component_HL.png
|  ├─components // 小程序组件
├─gulpfile.babel.js // 项目启动配置文件
|  ├─common.js
|  ├─copyTask.js
|  ├─imageTask.js
|  ├─index.js
|  ├─jsTask.js
|  ├─pageTask.js
|  └scssTask.js
```
