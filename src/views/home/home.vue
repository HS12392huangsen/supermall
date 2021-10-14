<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control 
      :titles="['流行', '新款', '精选']" 
      @tabClick="tabClick" 
      ref="tabControl1" 
      class="tab-control"
      v-show="isTabFixed">
    </tab-control>
    <!-- v-bind:probe-type="3"通过v-bind绑定，会去判断传入的数据类型，这里会当成传入一个数据3给scroll.vue，当仅仅通过probe-type="3"传值时，一律当成字符串传递 -->
    <!-- contentScroll监听接收子组件scroll滚动穿回来的事件方法 -->
    <scroll class="content" ref="scroll" v-bind:probe-type="3" @scroll="contentScroll" :pull-up-load= "true" @pullingUp="loadMore" >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"></tab-control> 
      <!-- <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl" :class="{fixed:isTabFixed}"></tab-control> -->
      <good-list :goods="showGoods"></good-list><!-- :goods="goods[currentType].list",这里定义的变量过长，用计算属性来表示   -->
    </scroll>

    <!-- .native -监听组件根元素的原生事件。 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop"

import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  data() {
    return {
      // result : null,
      banners: [],
      recommends: [],
      goods: {
        //商品数据，用一个对象保存所有的商品数据，在商品数据中设置不同种类商品的对象
        // 一旦页面创建之后，请求所有不同商品的第一页数据，每页30条，保存到list中
        pop: { page: 0, list: [] }, //存放流行页面数据，page表示商品浏览到第几页，list[]存放浏览获取到的商品信息，page、list都是根据获取的信息动态增加
        new: { page: 0, list: [] }, //存放新款页面数据
        sell: { page: 0, list: [] }, //存放精选页面数据
      },
      // 用来记录商品列表页面当前的类型，默认初始为‘流行’页面
      currentType : 'pop',
      isShowBackTop : false,
      tabOffsetTop: 0,
      isTabFixed : false,
      saveY : 0,
      // itemImageLoadListener用来保存图片加载监听函数
      itemImageLoadListener : null
    };
  },
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    GoodList,
    Scroll,
    BackTop,
  },
  computed : {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  // 首页组件创建完成，发送网络请求
  created() {
    // 1、请求轮播图、推荐模块数据
    this.getHomeMultidata(); //通过this.的方式调用当前组件中的methods中的getHomeMultidata()方法

    // 2、请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

    // 3、组件一创建完，就开始等着发送事件，开始监听item中图片加载完成
    // this.$bus.$on('itemImageLoad',()=> {
    //   // console.log(this.$bus);   默认值为空，所以可以通过在main.js中。通过原型的方式设置一个$bus变量，并复制为一个Vue实例，Vue实例可以作为一个事件总线
    //   // console.log('++++++++++');
    //   // 在created中无法拿到this.$refs，因此需要在mounted中监听。
    //   this.$refs.scroll.refresh();
    // });
  },
  mounted() {
    // 1、图片加载完成的事件监听
    const refresh = this.debounce(this.$refs.scroll.refresh,50);   //this.$refs.scroll.refresh对这个函数进行防抖操作
    // 对监听的事件进行保存，即将原先下面的this.$bus.$on()代码抽取封装
    // this.$bus.$on('itemImageLoad',()=> {
      //   // this.$refs.scroll && this.$refs.scroll.refresh();
    //   refresh();
    // });
    this.itemImageLoadListener = ()=> {
      refresh();
    };
    this.$bus.$on('itemImageLoad',this.itemImageLoadListener);


    // 2、获取tabControl的offsetTop
    // this.$refs.tabControl拿到的是组件，要想要拿组件中的元素，通过：所有的组件都有一个属性$el:用于获取组件中的元素
    // 但是计算在mounted中计算的高度，无法获得图片加载完成的准确的高度，因此，最好通过在HomeSwiper中，当轮播图加载完成之后，
    // 发送响应事件，在home.vue中监听该事件，设置对应的事件处理方法。
    // console.log(this.$refs.tabControl.$el.offsetTop);
  },
  destroyed() {
    // 当不同页面组件来回切换时，会出错，所以可以通过消除总线的方式；；页面快速切换出错的原因，
    // 是由于导航栏中的vue-router在3.0版本以上重复点菜单报错问题，具体解决方案可自行百度，所以应该不是与消除总线相关，
    // 弹幕说的解决图片加载完成的refresh，页面切换出错问题，应该是通过this.$refs.scroll && this.$refs.scroll.refresh();来解决
    // this.$bus.$off('itemImageLoad')
    console.log('判断切换到不同页面，是否销毁');
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY,0);
    // 通过下面调用一次refresh刷新，避免切回home页面时，可能会出现回到顶部的情况。
    this.$refs.scroll.refresh();
    // 有的弹幕问题是，来回切换分类和首页时，首页会弹回到顶部，解决方法是将refresh放在上面，
    // 同时刷新时间不设置为0，但是我这里没出现这种情况。可能是better-scroll的版本问题
  },
  deactivated() {
    // 1、保存滑动的Y方向的距离
    this.saveY = this.$refs.scroll.getScrollY();

    // 2、取消图片点击的全局事件的监听,this.$bus.$off('监听事件','监听函数')；如果只有监听事件作为参数的话，会取消所有相同的监听事件
    this.$bus.$off('itemImageLoad', 'this.itemImageLoadListener');
  },

  methods: {
    /* 
    事件点击监听相关的方法
    */
  //  防抖操作：解决每加载一次图片都要执行refresh()操作次数过多的情况，通过设置一个定时器，经过一定的时间，请求一次refresh操作
   debounce(func,delay) {
     let timer = null;
     return function (...args) {
       // 防抖原理就是在定时器开头关闭上一次定时器，然后再开始执行(并产生新的计时器)，执行过快就会一直关闭定时器(也就是在不断刷新计时器)
       if(timer) {
         clearTimeout(timer)
       };
       timer = setTimeout(() => {
        //  func.apply(this, args);
        func.apply(this, args)
       }, delay);
     }
   },
    tabClick(index){
      switch(index) {
        case 0: 
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      };
      // 让设置的两个tabControl，选中的元素一致
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      // this.$refs.scroll拿到的就是scroll组件实例,然后直接调用scroll中的scrollTo方法，这里scrollTo方法采用的封装，具体方法在scroll组件中实现
      this.$refs.scroll.scrollTo(0,0);
    },
    // 用来监听页面滑动的位置
    contentScroll(position) {
      // 1、判断显示或者隐藏backtop图标
      this.isShowBackTop = (-position.y) > 1000;

      // 2、决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop;
    },
    // 上拉加载，第一步需要监听图片什么时候加载完
    loadMore() {
      // 只加载当前商品种类的页面信息
      this.getHomeGoods(this.currentType);

      // 第二步、调用refresh方法，刷新加载到的页面视图。
      // 就是在动态计算可滚动的距离，所以每次finishpullup都要调用refershup来让better-scroll再次重新计算可滚动距离
      this.$refs.scroll && this.$refs.scroll.refresh();
      /*  
      因为图片的加载属于异步加载，加载需要一定的时间，所以当页面刷新时，如果图片没有加载完成时，
      better-scroll会先计算定义的wrapper的高度，以及需要滚动展示的信息的高度，需要滚动展示的信息的高度——定义的wrapper的高度==可滚动的高度
      wrapper根据要显示的GoodsItem计算滚动高度，但是当图片没加载完成时，wrapper计算的可滚动高度不包含图片的高度，
      当图片加载过来之后，每一个Item的高度包含图片了高度，Item高度撑高，但wrapper仍根据原有的高度显示内容，
      所以后面的图片无法展示，无法向下刷新。
      */
    },
    swiperImageLoad() {
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },


    /* 
    网络请求相关方法 
    */
    // 1、请求轮播图、推荐模块数据
    getHomeMultidata() {
      // 1、请求轮播图、推荐模块数据
      getHomeMultidata().then((res) => {
        //这里的getHomeMultidata是从home.js中导出的方法
        // console.log(res);
        // res在then()函数执行完，就销毁，因此要用组件的数据来保存请求到的res数据。
        // created()的this就是指这个组件本身，因此通过this.result可以拿到这个组件中的数据result
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },

    // 2、请求商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1; //每获取一页商品数据，就使商品当前的页数加1
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list); //push(...data)，可变形参，将data中所有的数据都加入到list数组中
        this.goods[type].page += 1;

        // 完成上拉加载更多,,如果在子组件scroll中不定义finishPullUp()方法的话，
        // 就需要通过的方式this.$refs.scroll.scroll.finishPullUp();完成刷新，第二个scroll表示Scroll定义data数据中的scroll
        // 相当于通过子组件来完成最后的刷新完成调用工作
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

// scoped定义局部作用域，当前组件中定义的类属性，只对当前组件中的类生效，其他组件的同名类的标签不受影响
<style scoped>
#home {
  /* 固定定位是参照于浏览器的视口进行定位的，这里的padding-top对home-nav无效，但对其他的比如Swiper有效 */
  /* padding-top: 44px; */

  /* vh:viewport height， */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 使用浏览器原生滚动时，整个网页跟着滚动，为了让导航不跟随，使用下面代码。但是后面采用的better-scroll插件时，只会滚动设定页面，不会影响home-nav，所以不需要了*/
  /* position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  z-index: 9;  */
}

  /* 吸顶效果，现在通过代码实现添加类.fixed，而不是直接通过css样式 */
/* .tab-control {
  position: sticky;
  top: 43px;
  z-index: 9;
} */
/* 但是通过添加fixed，tab-control栏会被home-nav导航栏覆盖，并且覆盖的显示会出现跳动，
所以最终采用多复制一个<tab-control/>，让它在指定的位置被覆盖隐藏，当页面滑动到一定位置时，
即第二个<tab-control/>与这个第一个<tab-control/>重合时，通过v-show="isTabFixed"，
显示第二个这个<tab-control/>，由于其是固定的位置，因此达到吸附的效果。
*/
.fixed {
  position : fixed;
  left:0px;
  right : 0px;
  top:44px
}
.content {
  overflow : hidden;
  position : absolute;

  top : 44px;
  bottom : 49px;
  left : 0px;
  right : 0px;
}
.tab-control {
    position: relative;
    z-index: 9;
  }
</style>