// 用来封装显示添加购物车成功提示的组件
<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name : "Toast",
  // props : {
  //   message : {
  //     type : String,
  //     default : ''
  //   },
  //   show : {
  //     type : Boolean,
  //     default : false,
  //   }
  // },
  data () {
    return {
      message : '',
      isShow : false,
    }
  },
  methods: {
    show(message, duration) {
      this.isShow = true;
      this.message = message;

      setTimeout(() => { 
        this.isShow = false;
        this.message = '';
      }, duration);
    }
  },
}
</script>

<style>
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    background-color: rgba(0,0,0,.8);
    padding: 10px;
    border-radius: 5px;
    transform: translate(-50%,-50%);
    color:#fff;
    z-index: 999;
  }
</style>