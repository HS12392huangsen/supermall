<template>
  <div class="bottom-bar">
    <div class="check-content">
      <CheckButton class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></CheckButton>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="clacClick">结算：{{checkLength}}</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton"; 
// import {mapGetters} from "vuex"; 


export default {
  name : 'CartBottomBar',
  components : {
    CheckButton,
  },
  methods : {
    // 全选按钮功能
    checkClick() {
      if(this.isSelectAll) {
        this.$store.state.cartList.forEach(item => item.checked = false);
      } else {
        this.$store.state.cartList.forEach(item => item.checked = true);
      }
    },

    // 结算时没选择商品弹窗提示
    clacClick() {
      if(!this.isSelectAll) {
        this.$toast.show('请选择购买的商品',2000);
      }
    }
  },
  computed : {
    // ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked;
      }).reduce((preValue, item)=> {
        return preValue + item.price * item.count;
      },0).toFixed(2);
    },
    checkLength() {
      // return this.cartList.filter(item => item.checked).length;
      return this.$store.state.cartList.filter(item => item.checked).reduce((preCount,item)=> {
        return preCount + item.count; 
      },0);
    },
    isSelectAll() {
      if(this.$store.state.cartList.length === 0) 
        return false;

      // 1、使用filter
      // return !(this.$store.state.filter(item => itemed.checked).length);
      
      // 2、使用find
      return !this.$store.state.cartList.find(item => !item.checked);

      // 3、普通遍历
      // for(let item of this.$store.state.cartList) {
      //   if(!item.checked) {
      //     return false;
      //   }
      // }
      // return true;
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 53px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 13px;
    box-sizing: border-box;
    display: flex;
  }
  .check-content {
    display : flex;
    align-items: center;
    /* width: 100px; */
  }
  .check-button {
    width : 22px;
    height : 22px;
    line-height : 22px;
    margin-right: 5px;
  }
  .price {
    text-align: center;
    flex: 1;
  }
  .calculate {
    width: 100px;
    background-color: red;
    color: #eee;
    text-align: center;
  }
</style>