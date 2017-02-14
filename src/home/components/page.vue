<template>
    <div id="demo">
        <img class="logo" src="/grace_boilerplate/static/image/logo-grace.png" width="20%">
        <p>
            Welcome to start your app with Koa-grace!
        </p>
        <p>
            To get a better understanding of how this boilerplate works, check out
            <a href="http://vuejs-templates.github.io/webpack" target="_blank">its documentation</a>.
        </p>
        <p>
            It is also recommended to go through the docs for
            <a href="http://webpack.github.io/" target="_blank">Webpack</a> and
            <a href="http://vuejs.github.io/vue-loader/" target="_blank">vue-loader</a>.
        </p>
      
    </div>
</template>

<script>
export default {
    data () {
        return {
            title: 'demo'
        }
    }
}
</script>

<style lang="less">
#demo{
  img{
    display:block;
    margin:0 auto;
  }
    /* some less */
}
</style>
