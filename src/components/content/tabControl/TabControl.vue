// 商品分类信息的tabbar，因为这个div中只用到
// 简单的不同的文字，因此不需要像MainTabBar那样使用插条，
// 因为MainTabBar根据不同的页面，顶部栏可能会有返回、添加等功能属性
<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="index"
    class="tab-control-item"
    :class="{active: index === currentIndex}"
    @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props : {
    titles : {
      type : Array,
      default() {
        return []
      }
    }
  },
  data() {
      return {
        currentIndex: 0
      }
  },
  methods: {
      itemClick(index) {
        // 点击事件发生的时候，添加对应的class
        this.currentIndex = index;
        // 将点击事件的item的index传给父组件home.vue中，用于实现点击不同的item，显示对应的商品页面
        this.$emit('tabClick', index)
      }
    }
}
</script>

<style>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .tab-control-item {
    flex : 1;
  }
  .tab-control-item span {
    padding: 5px;
  }
  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>