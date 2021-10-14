import Toast from './Toast'
// import Vue from 'vue'

const obj = {};

obj.install = function(Vue) {
  // 1、创建组件构造器，将Toast组件作为对象放入到extend中
  const toastContrustor = Vue.extend(Toast);

  // 2、new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContrustor();

  // 3、将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'));

  // 4、toast.$el对应的就是上面创建的div,并将$el添加到document中
  document.body.appendChild(toast.$el);

  // 通过原型的方式设置一个$toast对象
  Vue.prototype.$toast = toast;
}

export default obj;