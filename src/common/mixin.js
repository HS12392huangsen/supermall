// 讲的就是加载图片时，让better-scroll动态刷新高度，因为主页和详情页都要动态刷新高度，在mounted中有重复的代码，用混入解决代码重复问题。
// 弹幕解释：mixin本质是一个js对象,可以包含组件中任意功能选项. 只要将共用的功能以对象的形式传入mixin选项中,当组件使用mixin对象时,所有mixin对象的选项都将被混入该组件本身的选项中来
// 官方解释：Mixin 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个 mixin 对象可以包含任意组件选项。当组件使用 mixin 对象时，所有 mixin 对象的选项将被“混合”进入该组件本身的选项。
import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";


// 注意：mixin.js中抽取的代码，仍然会作为被引用的Detail.vue的属性
export const itemImageLoadListenerMixin = {
  // itemImageLoadListener : null 数据的定义也可以抽取
  data() {
    return {
      itemImageLoadListener : null,
      refresh : null,
    }
  },
  // 从home.vue和Detail.vue的mounted中抽取出下面代码，然后在home.vue和Detail.vue中通过，mixins : [itemImageLoadListenerMixin]引用，
  // 这样在本js文件中执行的mounted()过程，也会在被引入的组件中执行。
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh,50);
    this.itemImageLoadListener = ()=> {
      this.refresh();
    };
    this.$bus.$on('itemImageLoad',this.itemImageLoadListener);
  },
};

export const backTopMixin = {
  components : {
    BackTop,
  },
  data() {
    return {
      isShowBackTop : false,
    }
  },
  methods: {
    backClick() {
      // this.$refs.scroll拿到的就是scroll组件实例,然后直接调用scroll中的scrollTo方法，这里scrollTo方法采用的封装，具体方法在scroll组件中实现
      this.$refs.scroll.scrollTo(0,0);
    },
    listenShowBackTop(position) {
      this.isShowBackTop = (-position.y) > 1000;
    }
  },
}

