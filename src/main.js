import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 通过原型的方式设置一个$bus变量，并复制为一个Vue实例，Vue实例可以作为一个事件总线
Vue.prototype.$bus = new Vue();
// 安装toast插件
Vue.use(toast);   //默认会去执行toast文件夹下的index.js的install函数

//解决移动端300ms延迟
FastClick.attach(document.body);
// 使用懒加载的依赖
Vue.use(VueLazyLoad, {
  // 懒加载的图片占位背景图
  loading : require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
