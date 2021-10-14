<template>
  <div class="cart">
    <!-- 导航栏 -->
    <nav-bar class="nav-bar">
      <!-- <div slot="center">购物车({{cartLength}})</div> -->
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list></cart-list>

    <!-- 底部汇总 -->
    <CartBottomBar></CartBottomBar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';

import CartList from './childComps/CartList';
import CartBottomBar from './childComps/CartBottomBar';

import { mapGetters } from 'vuex';

export default {
 name : 'Cart',
 components : {
   NavBar,
   CartList,
   CartBottomBar,
 },
 computed : {
  // mapGetters辅助函数仅仅是将store中的getter映射到局部计算属性:
  // 1、使用对象展开运算符将getter 混入computed 对象中
  // ...mapGetters(['cartLength', 'cartList']);
  // 2、将一个getter属性另取一个名字,使用对象形式
    ...mapGetters({
      length: 'cartLength',
    })
 }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>