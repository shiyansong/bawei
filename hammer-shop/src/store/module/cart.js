import Vue from 'vue';

export default {
  state: {
    isShow: false, // 控制购物车的显示与隐藏
    cartList: [], // 购物车数据
    ball: { // 小球对象
      el: null, // 小球起点位置所在的元素
      show: false, // 小球是否显示
      img: '' // 小球图片
    }
  },
  mutations: {
    // 3. 接收组件派发过来的任务，修改数据
    addCart(state, goods) {
      /*
       findIndex:方法如果在数组中找到符合条件的元素了，返回当前元素所在的下标
       没有找到则返回-1
      */
      const idx = state.cartList.findIndex(item => item.sku_id === goods.sku_id);
      // 判断购物车中是否有商品
      if(idx === -1) {
        // 向商品中添加商品数量的属性和控制是否选中的属性
        Vue.set(goods, 'num', 1)
        Vue.set(goods, 'checked', false)
        state.cartList.push(goods)
      } else {
        state.cartList[idx].num += 1;
      }
      state.ball.el = event.target;
      state.ball.show = true
      state.ball.img = goods.ali_image
      // 判断购物车中是否有商品
      if(state.cartList.length !== 0) {
        state.isShow = true;
      } else {
        state.isShow = false;
      }
    },
    // 显示购物车
    showCart(state) {
      state.isShow = true
    },
    // 隐藏购物车
    hideCart(state) {
      state.isShow = false;
    },
    // 删除购物车中的商品
    deleteGoods(state, id) { // 删除购物车中的商品
      const idx = state.cartList.findIndex(item => item.sku_id === id);
      state.cartList.splice(idx, 1);
    },
    // 控制购物车详情中商品的选中状态
    chooseGoods(state, idx) {
      state.cartList[idx].checked = !state.cartList[idx].checked
    }
  },
  getters: { // 用来获取state中的数据的
    cartList: state =>  state.cartList,
    isShow: state => state.isShow,
    ball: state => state.ball,
    // 计算总件数和总价
    totalNum: state => state.cartList.reduce((num, item) => num + item.num, 0),
    totalPrice: state => state.cartList.reduce((num, item) => num + item.price * item.num, 0),
    // 计算被选中的总件数和总价
    chooseTotalNum: state => {
      return state.cartList.filter(item => item.checked).reduce((num, item) => num + item.num, 0)
    },
    chooseTotalPrice: state => {
      return state.cartList.filter(item => item.checked).reduce((num, item) => num + item.price * item.num, 0)
    },
    // 控制结算按钮的选中状态
    isDisabledBtn: state => state.cartList.some(item => item.checked)
  }
}