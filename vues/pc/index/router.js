module.exports = {
  routes: [{
    path: '/',
    component: require('./components/index.vue')
  }, {
    path: '*',
    redirect: '/'
  }]
}
