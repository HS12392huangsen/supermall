import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'

export default {
  addCart(content, payload) {
    // payload表示新添加的商品
    // 判断是否是已添加的商品方法一
    // let oldProduct = null;
    // for(let item of state.cartList){
    //   if(item.iid === payload.iid) {
    //     oldProduct = item;
    //   }
    // };
    // 判断是否是已添加的商品方法二
    return new Promise((resolve, reject) => {
      let oldProduct = content.state.cartList.find(item => item.iid === payload.iid);
      if (oldProduct) {
        content.commit(ADD_COUNTER, oldProduct);
        resolve("商品数加1成功");
      } else {
        payload.count = 1;
        // state.cartList.push(payload);
        content.commit(ADD_TO_CART, payload);
        resolve("新添加商品成功");
      }
    })
  },
}
