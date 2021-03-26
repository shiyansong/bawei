import axios from 'axios';

export default {
  state: {
    addressList: [],
    id: 0
  },
  actions: {
    // 请求地址数据
    async getAddressList({ commit }) {
      const { data } = await axios.get('./address.json');
      commit('getAddressList', data);
    }
  },
  mutations: {
    // 获取地址
    getAddressList(state, data) {
      state.addressList = data;
      // console.log(state.addressList)
    },
    // 修改默认地址
    selectedIndex(state, id) {
      state.addressList.forEach(item => {
        if(item.id === id) {
          item.default = true
        } else {
          item.default = false
        }
      })
    },
    // 添加新的收货地址
    save(state, newAddress) {
      if(state.addressList.length === 0) {
        state.id = 0;
      } else {
        state.id = state.addressList[state.addressList.length - 1].id + 1;
      }
      newAddress.id = state.id;
      state.addressList.push(newAddress);
    },
    // 删除收货地址
    deleteAddress(state, id) {
      const idx = state.addressList.findIndex(item => item.id === id);
      state.addressList.splice(idx, 1);
    }
  },
  getters: {
    addressList: state => state.addressList,
    curIndex: state => state.addressList.findIndex(item => item.default)
  }
}