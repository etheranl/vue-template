# vue-webpack-boilerplate

- 在使用之前请确保已阅读 [koa-grace](https://github.com/xiongwilee/koa-grace)的相关文档；
- 基于[vuejs-templates](https://github.com/vuejs-templates/webpack)和[grace-vue-webpack-boilerplate](https://github.com/Thunf/grace-vue-webpack-boilerplate)，根据项目实际需求做了部分定制。
## 使用方法

``` bash
$ cd ~/fe/app/
$ git clone git@github.com:haoranw/vue-template.git grace_boilerplate
$
$ cd grace_boilerplate
$ yarn install(recommended,or use npm install)
$
$ npm run dev

```
新建页面：
```
$ npm run auto

依次输入项目名称和页面名称
```

## Why I made this
- 随着项目内容的扩展，单个仓储内的vues文件越来越多。
在以往的多入口构建方案中，并不支持页面的二级目录。在单个仓储内包含了多个项目的vues文件，并不能很好的区分它们属于哪一个项目模块。
- 在本构建方案中，相关路径如下：
```
└── vues               
    ├── _components     
    ├── project1            // project1
    └── project2            // project2
        ├── page1           // page1入口
        ├── page2
        └── page3
            ├── components
            ├── index.js
            ├── index.vue
            └── router.js
```
- 为了配合此路径，在通过`npm run auto`来新建页面时需要输入项目名称。例如新建`project1/page1`，需要在运行命令之后依次输入`project1`、`page1`。


## Todo
- [x] 新建页面时判断是否存在同名文件
- [x] 新建页面时生成对应路径的controller
- [x] 修改prefix配置，提高兼容性
- [ ] 检测项目名称，必须输入已存在的项目名。独立新建项目的指令
- [ ] 不同项目内的同名页面共存
- [ ] 集成优化后的flexible && pxtorem的配置
