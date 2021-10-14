<template>
  <div id="app">
    <!-- 因为keep-alive了，所以不会销毁，再次进来的时候就不会执行created方法了，不过会执行actived方法,
    所以在详情页Detail.vue中的created不会被执行，造成每次访问的详情页都是同一个，所以应该给详情页移除keep-alive -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
