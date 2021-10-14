// 封装处理所有来自首页的网络请求
// 就是对于home.vue组件中的所有网络请求，都通过在home.js中封装成一个方法，
// 由home.js设置具体的请求内容，home.js作为home.vue组件和request.js网络请求之间的交互层，
// 这样在home.vue中就不需要关心具体的事务。

import {request} from "./request";

// 处理请求轮播图，与轮播图下面的推荐数据
export function getHomeMultidata() {
  return request({
    url : '/home/multidata',
  });
}

// 处理请求Goods数据，type表示商品分类(流行、新款、精选)，page表示商品数据页
export function getHomeGoods(type, page) {
  return request({
    url : 'home/data',
    params: {
      type,
      page
    }
  }) 
}


