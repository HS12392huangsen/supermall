<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <!-- 设置一个content，作为scroll的滚动区域，由于content定义的界面大小为：
    整个窗口的视图大小，减去，一个顶部导航栏的宽度，因此content始终将底部tab-bar覆盖，
    因此在拖动scroll的时候，就不会把底部tab-bar显示出来 -->
    <!-- @scroll="contentScroll"监听scroll.vue中发送滚动事件，用来处理滚动到内容显示对应标题,
    :probe-type="3"给Scroll.vue中probeType属性传入值为3 -->
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="goodsList"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <Toast ref="toast"></Toast>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar';
  import DetailSwiper from './childComps/DetailSwiper';
  import DetailBaseInfo from './childComps/DetailBaseInfo';
  import DetailShopInfo from './childComps/DetailShopInfo';
  import DetailGoodsInfo from './childComps/DetailGoodsInfo';
  import DetailParamInfo from './childComps/DetailParamInfo';
  import DetailCommentInfo from './childComps/DetailCommentInfo';
  import DetailBottomBar from './childComps/DetailBottomBar';

  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from "components/content/backTop/BackTop";

  import Scroll from 'components/common/scroll/Scroll';
  import Toast from 'components/common/toast/Toast';

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
  import {debounce} from "@/common/utils";
  import {itemImageLoadListenerMixin, backTopMixin} from "@/common/mixin.js";

  import {mapActions} from "vuex";

export default {
  name : 'Detail',
  components : {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Toast,
  },
  mixins : [itemImageLoadListenerMixin,backTopMixin],
  // mixins: [backTopMixin],
  data() {
    return {
      iid : null,
      topImages : [],
      goods: {},
      shop: {},
      detailInfo : {},
      paramInfo: {},
      commentInfo: {},
      goodsList: [],
      // itemImageLoadListener : null //被抽取到mixin.js中
      themeTopYs : [],
      getThemeTopY : null,
      currentIndex : null,
    }
  },
  mounted() {
    // 1、值不对。
    // 在mounted中，这时，子组件有可能还没有加载完成
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

    // 因为主页和详情页都要动态刷新高度，在mounted中有重复的代码，用混入解决代码重复问题，将下面代码抽取到mixin.js文件中,
    // 以及itemImageLoadListener : null 数据的定义也可以抽取，然后下面代码的实现，会通过mixins : [itemImageLoadListenerMixin],先在mixin.js中执行
    // const refresh = debounce(this.$refs.scroll.refresh,50);
    // this.itemImageLoadListener = ()=> {
    //   refresh();
    // };
    // this.$bus.$on('itemImageLoad',this.itemImageLoadListener);
  },
  // 因为home.vue中有keep-alive，但Detail.vue被移除了keep-alive，所以无法通过deactivated取消事件监听，因为activated和deactivated只在keep-alive中有用，所以需要在destroyed中取消图片点击的全局事件的监听
  destroyed() {
    this.$bus.$off('itemImageLoad', 'this.itemImageLoadListener');
  },
  created() {
    // 1、保存传入的iid
    this.iid = this.$route.params.iid;

    // 2、根据iid请求详情数据
    getDetail(this.iid).then(res=>{
      // console.log(res);
      const data = res.result;
      // 1、获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;

      // 2、获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services); 

      // 3、创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

      // 6、取出评论信息
      if (data.rate.list) {
		    this.commentInfo = data.rate.list[0];
	    };

      // 1.第一次获取，值不对.
      // 值不对的原因: this.$refs. params.$el压根没有演染
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);

      // 2.第二次获取:值不对
      // 值不对的原因:图片没有计算在类
      // 根据最新的数据，对应的DOM是已经被渲染出来
      // 但是图片依然是没有加载完(目前获取到offsetTop不包含其中的图片).
      // offsetTop值不对的时候，都是因为图片的问题
      // this.$nextTick(() => {
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // });

    });

    // 3、推荐商品展示
	  getRecommend().then(res => {
	    this.goodsList = res.data.list
		});

    // 4、给getThemeTopY赋值
    this.getThemeTopY = debounce(()=>{
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
        console.log(this.themeTopYs);
    },200);
  },

  methods: {
    ...mapActions(['addCart']),
    addToCart() {
      // 1、获取购物车需要展示的信息
      const obj = {}
      obj.iid = this.iid
      obj.imgURL = this.topImages[0]
      obj.title = this.goods.title
      obj.desc = this.goods.desc
      obj.price = this.goods.realPrice

      // 2、将商品添加到购物车中
      // this.$store.commit('addCart',obj);
      this.$store.dispatch('addCart', obj).then((res) => {   //调用actions中的方法
        // 3、显示添加购物车成功（通过将actions中addCart方法返回一个Promise）
        // this.show = true;
        // this.message = res;

        // setTimeout(() => {
        //   this.show = false;
        //   this.message = '';
        // },1500);

        // 3、显示添加购物车成功(通过封装Toast插件来实现)
        this.$toast.show(res, 2000);
      })

      // 3、显示添加购物车成功（通过将vuex中的mapActions方法）
      // this.addCart(obj).then((res)=> {
      //   console.log(res);
      // });
    },
    backClick() {
      // this.$refs.scroll拿到的就是scroll组件实例,然后直接调用scroll中的scrollTo方法，这里scrollTo方法采用的封装，具体方法在scroll组件中实现
      this.$refs.scroll.scrollTo(0,0);
    },
    imageLoad() {
      this.$refs.scroll.refresh();
      // 在detail页面图片加载完成之后，获取每个模块的Y值，通过封装在getThemeTopY函数中抖动的方式，减少获取Y值次数
      this.getThemeTopY();
    },
    // 如果不在DetailGoodsInfo.vue中判断所有的图片都加载完了，而是使用下面的防抖方式，会创建多次refresh
    // imageLoad() {
    //   const refresh = debounce(this.$refs.scroll.refresh,50);
    //   this.itemImageLoadListener = ()=> {
    //     refresh();
    //   };
    // }
    // 可以通过mixin.js中的混入方式，使用mixin.js中防抖操作refresh
    // 但是refresh是定义在mixin.js的mounted中的，因此需要将mounted中的refresh抽到data中，具体见mixin.js
    // imageLoad() {
    //   this.refresh()
    // },

    titleClick(index) {
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500);
    },
    contentScroll(position) {
      // 1、获取Y值
      const positionY = -position.y;

      // 2、positionY和主题中值进行对比
      /**
		       * 判断的方案:
		       *  方案一:
		       *    条件: (i < (length-1) && currentPos >= iPos && currentPos < this.themeTops[i+1]) || (i === (length-1) && currentPos >= iPos),
		       *    优点: 不需要引入其他的内容, 通过逻辑解决
		       *    缺点: 判断条件过长, 并且不容易理解
		       *  方案二:
		       *    条件: 给themeTops最后添加一个很大的值, 用于和最后一个主题的top进行比较.
		       *    优点: 简洁明了, 便于理解
		       *    缺点: 需要引入一个较大的int数字
		       * 疑惑: 在第一个判断中, 为什么不能直接判断(currentPos >= iPos)即可?
		       * 解答: 比如在某一个currentPos大于第0个时, 就会break, 不会判断后面的i了.
		       */
      let length = this.themeTopYs.length;
      // 方案一：
      // for(let i=0; i<length; i++) {
      //   if(this.currentIndex !== i && ((i<length-1 && positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1]) 
      //   || (i===length-1 && positionY>=this.themeTopYs[i]))) {
      //     this.currentIndex = i;
      //     console.log(this.currentIndex);
      //     this.$refs.nav.currentIndex = this.currentIndex;
      //   }
      // }
      // 方案二：
      for(let i=0; i<length-1; i++) {
        if((this.currentIndex !== i) && (positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      };

      // // 判断显示或者隐藏backtop图标
      // this.isShowBackTop = (-position.y) > 1000;
      // 单独的语句无法抽取到mixin.js中，所以需要抽成函数，在放到mixin.js中
      this.listenShowBackTop(position);
    },
  }
}
</script>

<style scoped>
/* 因为底部的tab-bar是托标的，为了在详情页隐藏底部的tab-bar，需要将tab-bar覆盖 */
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 99;
    background-color: #fff;
  }

  .content {
    background-color: #fff;
    /* 减号两边一定要有空格 */
    height: calc(100% - 44px - 49px);
  }
</style>