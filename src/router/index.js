import Vue from 'vue';
import VueRouter from 'vue-router'

// 实现懒加载
const Home = () => import('../views/home/home.vue')
const Category = () => import('../views/category/category.vue')
const Cart = () => import('../views/cart/cart.vue')
const Profile = () => import('../views/profile/profile.vue')
const Detail = () => import('../views/detail/Detail.vue');

// 1、安装插件
Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};


// 2、创建vue-router实例化对象，配置路由和组件之间的应用关系
const routes = [
  {
    path: '',
    // 实现懒加载
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path : '/detail/:iid',
    component : Detail
  },
]


const router = new VueRouter({
  // 配置路由和组件之间的应用关系
  routes,
  mode : 'history'
});


//4.导出路由
export default router


