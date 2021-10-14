<template>
    <div id="shop-item">
    <div class="item-selector">
      <!-- 点击选中购物车中的商品，默认加入购物车的时候，商品为选中的状态，因此在mutations.js中，在商品首次添加的时候，
      设置payload.checked = true;表示选中状态（payload.checked用来传递给子组件CheckButton.vue中，决定是否给img添加背景颜色，
      添加背景颜色的时候，表示选中）。
      如何判断选中的点击事件？
      通过给每个商品添加payload.checked属性，在父组件CartListItem.vue中，通过给CheckButton组件标签，添加点击事件，改变payload.checked属性
      的值，然后由父组件CartListItem.vue将payload.checked属性值传递给子组件CheckButton.vue，决定子组件是否添加.check类，选中按钮。
       -->
      <CheckButton @click.native="checkedChange" :is-checked="itemInfo.checked"></CheckButton>
    </div>
    <div class="item-img">
      <img :src="itemInfo.imgURL" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{itemInfo.price}}</div>
        <div class="item-count right">x{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton"; 
export default {
  name : "CartListItem",
  components : {
    CheckButton,
  },
  props : {
    itemInfo : {
      type : Object,
      default() {
        return {}
      }
    }
  },
  methods : {
    checkedChange() {
      this.itemInfo.checked = !this.itemInfo.checked;
    }
  },
}
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }
</style>