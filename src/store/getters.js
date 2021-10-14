export default {
  cartLength(state) {
    // return state.cartList.length;
    let length = 0;
		for(let i=0; i<state.cartList.length; i++) {
			length += state.cartList[i].count;
		}
		return length;
  },
  cartList(state){
    return state.cartList;
  },
}