<template>
      <div class="tab-bar-item" @click="itemClick">
        <!-- 将插条放在一个div中，对div进行属性的设置，这样设置的额外属性，不会被插条覆盖 -->
        <div v-if="!isActive"><slot name="item-icon"></slot></div>
        <div v-else><slot name="item-icon-active"></slot></div>
        <!-- v-bind动态绑定一个style，并把这个style抽象到计算属性中 -->
        <div :style="activeStyle"><slot name="item-text"></slot></div>  
      </div>
</template>

<script>
export default { 
  name : 'TabBarItem',
  props : {
    path : String,
    // 为什么这里的default不起作用
    activeColor : {
      type : String,
      default : 'bule'
    }
  },
  data() {
    return {
      // isActive : false
    }
  },
  computed : {
    isActive() {
      // /home === item1(/home) =ture;
      // 判断当前活跃的路由是否等于本插槽的内容，如果不等于，则结果返回true，默认显示，如果等于，则说明选中，应该使用v-else插槽
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? {color : this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    }
  },
}
</script>

<style>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    /* 常用高度49px */
    height: 49px;
    font-size: 14px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  .tab-bar-item img {
    width: 24px;
    height: 24px;
  }
  /* .active {
    color: pink;
    color: blue;
    color: aqua;
  } */
  
</style>