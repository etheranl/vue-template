<template>
  <div id="grace">

    <load-more v-if="loading" tip="正在加载"></load-more>
    <template v-else>
      <h1>Gracejs 交流群</h1>
      <img class="image" :src="grace.grace || github" alt="github">
    </template>

  </div>
</template>

<script>
import LoadMore from 'vux/src/components/load-more'

export default {
  data () {
    return {
      loading: true,
      github: '',
      grace: {}
    }
  },
  mounted () {
    // demo for ajax
    this.$http.get('/ajax/demo').then(response => {
      // get body data
      this.grace = response.body.grace
      // if github API rate limit exceeded for this ip.
      if (!this.grace.html_url) {
        this.grace = response.body.test1.data
      }
      this.loading = false
    }, response => {
      // error callback
    })
  },
  components: {
    LoadMore
  }
}
</script>

<style lang="less">
#grace{
  text-align: center;

  .image{
    display: inline-block;
  }
  img{
    width: 200px;
    background: white;
  }
}

.github-corner:hover .octo-arm{
  animation:octocat-wave 560ms ease-in-out
}

@keyframes octocat-wave{
  0%,100%{transform:rotate(0)}
  20%,60%{transform:rotate(-25deg)}
  40%,80%{transform:rotate(10deg)}
}

@media (max-width:500px){
  .github-corner:hover .octo-arm{
    animation:none
  }
  .github-corner .octo-arm{
    animation:octocat-wave 560ms ease-in-out
  }
}

</style>
