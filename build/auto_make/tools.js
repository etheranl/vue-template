'use strict';
const glob = require('glob');
const path = require('path');
const fs = require('fs');
require('shelljs/global');

const controllerPath = path.resolve(__dirname, '../../controller/') + '/';
const srcPath = path.resolve(__dirname, '../../vues/') + '/';
function exec(cmd) {
    return require('child_process').execSync(cmd).toString().trim()
}

let illegal = function(name) {
    return !/^[a-z0-9_]+?$/.test(name) || /^\d/.test(name)
}

let exist = function(name) {
    var dirList = exec(`cd ${srcPath} && ls`).split('\n');
    let existNames = [];
    dirList.map(function(i) {
        let fileList = exec(`cd ${srcPath}${i} && ls`).split('\n');
        fileList.map(function(files) {
            existNames.push(files)
        })
    });
    return existNames.indexOf(name) > -1;
}

let _autoMakeController = function(project, name) {
    try {
        fs.mkdirSync(controllerPath + project)
    } catch (e) {}
    fs.writeFileSync(controllerPath + project + name + '.js', `'use strict';

exports.index = function*() {
    yield this.bindDefault();

    yield this.render('${name}', {
        siteInfo: this.siteInfo
    });
}

`);
}

let _autoMakeEntryJs = function(project, name) {
    let Name = name[0].toUpperCase() + name.slice(1);

    fs.writeFileSync(srcPath + project + name + '/index.js', `// The Vue build version to load with the \`import\` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routes from './router.js'
import App from './index.vue'

// 初始化路由
/* eslint-disable no-new */
const router = new VueRouter(routes)

// 置入组件
Vue.use(VueRouter)
Vue.use(VueResource)

new Vue({
  /**
   * 提供的元素只能作为挂载点。
   * 不同于 Vue 1.x，所有的挂载元素会被 Vue 生成的 DOM 替换。
   * 因此不推荐挂载root实例到 <html> 或者 <body> 上。
   */
  el: '#app',
  template: '<App/>',
  components: { App },
  /**
   * 置入路由
   */
  router
})
/* eslint-enable no-new */
`);
}

let _autoMakeEntryVue = function(project, name) {
    fs.mkdirSync(srcPath + project + name + '/components');
    fs.writeFileSync(srcPath + project + name + '/index.vue', `<template>
  <div id="${name}">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: '${name}',
  components: {
  }
}
</script>

<style lang="less">
</style>
`);

    fs.writeFileSync(srcPath + project + name + '/components/' + name + '.vue', `<template>
  <div class="${name}">
  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style lang="less">
</style>
`);
}

let _autoMakeRouter = function(project, name) {
    fs.writeFileSync(srcPath + project + name + '/router.js', `module.exports = {
  routes: [{
    path: '/',
    component: require('./components/${name}.vue')
  }, {
    path: '*',
    redirect: '/'
  }]
}
`);
}

let autoMake = function(project, name) {
    _autoMakeController(project, name);
    mkdir('-p', srcPath + project + name)
    _autoMakeEntryJs(project, name);
    _autoMakeEntryVue(project, name);
    _autoMakeRouter(project, name);
}

exports.illegal = illegal;
exports.exist = exist;
exports.autoMake = autoMake;
