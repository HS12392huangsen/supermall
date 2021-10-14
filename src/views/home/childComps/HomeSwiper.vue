// 轮播图子组件
<template>
  <div>
    <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index" >
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index.js';
export default {
  name : 'HomeSwiper',
  props : {
    banners : {
      type : Array,
      default() {
        return [];
      },
    }
  },
  data() {
    return {
      isLoad : false,
    }
  },
  components : {
    Swiper, 
    SwiperItem
  },
  methods : {
    // 只需要判断一次轮播图片加载完成
    imageLoad() {
      if(!this.isLoad) {
        this.$emit('swiperImageLoad');
        this.isLoad = true;
      }
    }
  }
}
</script>

<style>

</style>