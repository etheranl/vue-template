import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import index from './components/index.vue';
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
