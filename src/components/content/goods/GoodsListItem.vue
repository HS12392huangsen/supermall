<template>
  <div  class="goods-item" @click="itemClick">
    <!-- <img :src="showImage" alt="" @load="imageLoad"> 使用懒加载 -->
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name : "GoodsListItem",
  props : {
    goodsItem : {
      type: Object,
      default() {
        return {}
      }
    }
  },
  // 因为首页商品列表的显示，与详情页推荐商品列表的显示，用的都是同一个GoodItem组件，
  // 因此对于传入的商品信息中对于图片的数据不一样，一个是image，一个是show.img，
  // 所以可以通过一个计算属性，先判断是否传入的是推荐商品列表的图片，没有的话，则显示首页图片。
  computed : {
    showImage() {
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img;
    }
  },
  methods: {
    // 在listitem组件中发送itemImageLoad事件挂载到事件总线中
    // 详情页的图片加载事件，不应该传递到首页的加载刷新
    imageLoad() {
      // 解决方法一：通过路由判断当前所在页面
      // if(this.$route.path.indexOf('/home') != -1) {
      //   this.$bus.$emit('itemImageLoad');
      // } else if(this.$route.path.indexOf('/detail') != -1){
      //   this.$bus.$emit('itemImageLoad');
      // }

      // 解决方法二：离开页面之后，就取消页面图片的加载事件的监听，在home.vue中deactivated中，取消事件的监听
      this.$bus.$emit('itemImageLoad');
    },

    // 点击跳转详情页
    itemClick() {
      // 最好使用push，因为浏览详情页之后，一般都可以返回
      this.$router.push('/detail/' + this.goodsItem.iid);
    }
  },
}
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>