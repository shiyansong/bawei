import Vue from 'vue';
import Vuex from 'vuex';
import Cart from './module/cart'
import Address from './module/address'

Vue.use(Vuex);

// 1. 创建store对象
export default new Vuex.Store({
  modules: {
    Cart,
    Address
  }
})