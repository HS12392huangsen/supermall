<template>
  <tab-bar>
      <tab-bar-item path="/home" activeColor="pink">
      <!-- 在vue.config.js（如果没有，则在根目录下新建）中配置：，在dom中的某个属性去找路径，需要在别名路径之前加上~ -->
        <img slot="item-icon" src="@/assets/img/tabbar/home.svg" alt="" />
        <img slot="item-icon-active" src="@/assets/img/tabbar/home_active.svg" alt="" />
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="pink">
        <img slot="item-icon" src="@/assets/img/tabbar/category.svg" alt="" />
        <img slot="item-icon-active" src="@/assets/img/tabbar/category_active.svg" alt="" />
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="pink">
        <img slot="item-icon" src="@/assets/img/tabbar/shopcart.svg" alt="" />
        <img slot="item-icon-active" src="@/assets/img/tabbar/shopcart_active.svg" alt="" />
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="pink">
        <img slot="item-icon" src="@/assets/img/tabbar/profile.svg" alt="" />
        <img slot="item-icon-active" src="@/assets/img/tabbar/profile_active.svg" alt="" />
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar.vue";
import TabBarItem from "components/common/tabbar/TabBarItem.vue";

export default {
  name : "MainTabBar",
  components : {
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>