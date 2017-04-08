module.exports = {
  routes: [{
    path: '/',
    component: require('./components/home.vue')
  }, {
    path: '*',
    redirect: '/'
  }]
}
