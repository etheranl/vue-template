'use strict';
const glob = require('glob');
const path = require('path');
const fs = require('fs');
require('shelljs/global');

const controllerPath = path.resolve(__dirname, '../../controller/') + '/';
const srcPath = path.resolve(__dirname, '../../vues/') + '/';

let illegal = function (name) {
	return !/^[a-z0-9_]+?$/.test(name) || /^\d/.test(name)
}

let exist = function (name) {
	let controllers = glob.sync(controllerPath + '*.js').map(function (item) {
		return item.split('/').pop().replace('.js', '');
	});
	let srcModules = glob.sync(srcPath + '*').map(function (item) {
		return item.split('/').pop();
	});
	return controllers.concat(srcModules).indexOf(name) > -1;
}

let _autoMakeController = function (name) {
fs.writeFileSync(controllerPath + name + '.js', `'use strict';

exports.index = function*() {
    yield this.bindDefault();

    yield this.render('module/${ name }', {
        siteInfo: this.siteInfo
    });
}

`);
}

let _autoMakeEntryJs = function (name) {
let Name = name[0].toUpperCase() + name.slice(1);

fs.writeFileSync(srcPath + name + '/index.js', `import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import { routes } from './router.js'
/**
 * 添加需要import的组件
 */

/**
 * 使用组件
 */

Vue.use(VueRouter)
Vue.use(VueResource)


const router = new VueRouter({
  routes
})

const app = new Vue({
  router,
}).$mount('#app')
`);
}

let _autoMakeEntryVue = function (name) {
fs.mkdirSync(srcPath + name + '/components');
fs.writeFileSync(srcPath + name + '/components/index.vue', `<template>
  <div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
</style>

`);
}

let _autoMakeRouter = function (name) {
fs.writeFileSync(srcPath + name + '/router.js', `import index from './components/index.vue';

export const routes = [
  { path:'/', component: index }
]

`);
}


let autoMake = function (useVue, name) {
	_autoMakeController(name);
	if (useVue) {
		mkdir('-p', srcPath + name)
		_autoMakeEntryJs(name);
		_autoMakeEntryVue(name);
		_autoMakeRouter(name);
	}
}

exports.illegal = illegal;
exports.exist = exist;
exports.autoMake = autoMake;
