<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name : 'Scroll',
  props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
  data() {
    return {
      scroll : null
    }
  },
  mounted() {
    // 1、创建Bscroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // probeType:3,  0/1/2(手指滚动)/3(只要是滚动)，这里应该根据不同组件的需求，设置是否获取滑动的位置信息。所以可以通过动态传入probeType的值
      probeType : this.probeType,
      pullUpLoad : this.pullUpLoad,

      // 必须设置click:true, 那么div才能监听点击
      // 因为在home.vue中，存在很多组件中的div需要添加点击事件，因此，这里的click属性必须设置为true
      click:true, 
      mouseWheel:true, 
      // observe-dom开启对 content 以及 content 子元素 DOM 改变的探测，当这些 DOM 元素发生变化时，将会触发 scroll 的 refresh 方法
      observeDOM:true
    });

    // 2、监听滚动的位置
    if (this.probeType === 2 || this.probeType ===3 ) {
      this.scroll.on("scroll", (position)=>{
        // console.log(position);
        // 并将滚动结果返回，通过子组件向父组件传递的方式,('事件类型','要传给父组件的参数')
        this.$emit('scroll', position);
      });
    };

    // // 3、监听上拉事件
    // this.scroll.on("pullingUp",()=> {
    //   this.$emit('pullingUp');
    // });
    // 4、监听scroll滚动到底部
    if( this.pullUpLoad) {
      this.scroll.on('pullingUp',() => {
        this.$emit('pullingUp');
      });
    }
    /*  
    上拉加载更多很简单？
    我是分为加载更多和上拉两部分理解的，加载更多是监听滚动到底部，然后请求数据。
    上拉，要重新计算scroll的高度，通过给goodslistitem每张图片都绑定一个事件发射出去
    */
  },
  methods: {
    // 一、返回顶部
    scrollTo(x, y, time=300){
      // scrollTo方法第三个参数可以用来设置返回的时间，300毫秒的时候返回顶部
      this.scroll && this.scroll.scrollTo(x,y,time);
    },

    // 二、完成上拉加载
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    /* 由于是在mounted中对scroll进行初始化，因此在home.vue的created中调用下面的方法，
    可能因为在组件创建完成之后，发送网络请求，获取图片很快的情况下，scroll还没有初始化，因此可能会报错。
    所以加上this.scroll可以先用来判断是否已经创建完scroll对象。 */
    // 三、当content内容发生改变时，重新计算滚动页面高度，也就是监听每一张图片是否加载完成,只要有一张图片加载完成了,执行一次refresh()，计算高度scrollHeight
    refresh() {
      this.scroll && this.scroll.refresh();
    },

    // 四、获取页面切换之后，原来页面的位置信息，用于切换页面之后，可以保存之前的浏览状态
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  },
}
</script>

<style>

</style>