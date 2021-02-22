import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 商品
    shopList: []
  },
  mutations: {
    // 接收getGoods，将商品保存到state中的shopList数组中
    getGoods (state, goods) {
      // 判断加入购物车里面的商品在原数组中是否存在，如果存在则返回下标，不存在返回-1
      const idx = state.shopList.findIndex(item => item.id === goods.id)
      // 如果idx!=-1,证明该元素在数组中查找到了
      if (idx !== -1) {
        // 在原有的基础上加1
        state.shopList[idx].number += 1
      } else {
        // 没有查找到则加入数组中
        state.shopList.push(goods)
      }
    },
    // 删除选中
    delChoose (state, list) {
      // 将原购物车列表的数据替换成点击删除按钮处理后的数组数据
      state.shopList = list
    },
    // 商品++
    addNum (state, idx) {
      state.shopList[idx].number++
    },
    // 商品--
    disNum (state, idx) {
      state.shopList[idx].number > 1 && state.shopList[idx].number--
    },
    // 修改商品数量
    changeNum (state, obj) {
      state.shopList[obj.idx].number = Number(obj.value)
    }
  },
  getters: {
    // 购物车列表
    shopList (state) {
      return state.shopList
    },
    // 计算总件数
    totalNum (state) {
      // 过滤出来被选中的数组元素
      const result = state.shopList.filter(item => item.checked)
      // 如果有被选中的进行求和
      if (result.length) {
        return result.reduce((num, item) => num + Number(item.number), 0)
      } else {
        return 0
      }
    },
    // 计算总价
    totalCount (state) {
      // 过滤出来被选中的数组元素
      const result = state.shopList.filter(item => item.checked)
      // 如果有被选中的进行求和
      if (result.length) {
        return result.reduce((num, item) => num + item.number * item.price, 0)
      } else {
        return 0
      }
    }
  },
  // 使用插件
  plugins: [createPersistedState()]
})
