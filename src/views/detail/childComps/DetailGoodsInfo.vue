<template>
  <!-- details-goods-info这里注意设置的类名，如果style的作用域不加 scoped限制，使用goods-info会出现布局的错误 -->
  <div v-if="Object.keys(detailInfo).length !== 0" class="details-goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imgLoad" alt="">
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object
      }
    },
    data() {
			return {
				counter: 0,
        imagesLength: 0
      }
    },
    methods: {
	    imgLoad() {
        // 判断, 所有的图片都加载完了, 那么进行一次回调就可以了.(也可以通过防抖函数实现)
        if (++this.counter === this.imagesLength) {
          this.$emit('imageLoad');
        }
	    }
    },
    // watch是一个对象 用来监听一个值的变化 并调用因为变化需要执行的方法,因此只需要计算一次图片长度
    watch: {
	    detailInfo() {
	      // 获取图片的个数
	    	this.imagesLength = this.detailInfo.detailImage[0].list.length
	    }
    }
	}
</script>

<style scoped>
  .details-goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>
