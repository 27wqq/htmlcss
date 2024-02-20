<template>
  <div>
    <!-- <h1 v-upper='msg'></h1>测试自定义插件的使用 -->
    <Header/>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home、Search显示的，在登录、注册隐藏 -->
    <!-- <Footer v-show="$route.path=='/home'||$route.path=='/search'"></Footer> -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
  
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  data() {
    return {
      msg:'abc',
    }
  },
  mounted(){
    //派发actions
    this.$store.dispatch('categoryList');
  },
  components: {Header,Footer},
}
</script>

<style>

</style>
