<template>
  <!-- 购物车 -->
  <div id="shop">
    <h3>购物车</h3>
    <button @click="$router.push({ name: 'GoodsList' })">跳转到商品列表</button>
    <div>
      全选：<input type="checkbox" style="width: 30px; height: 30px" v-model="chooseAll" />
      <ul class="listUl">
        <li v-for="(item, index) in shopList" :key="item.id">
          <div>
            <input style="width: 30px; height: 30px" type="checkbox" v-model="item.checked" />
          </div>
          <div>
            <img alt="" :src="item.img" />
          </div>
          <div>
            <p>名称：{{ item.title }}</p>
            <p>价格：{{ item.price }}</p>
            <button @click="discount(index)">-</button>
            <span>数量：<input type="text" :value="item.number" @change="change(index, $event)"></span>
            <button @click="add(index)">+</button>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <!-- 总价容器 -->
      <div>共：{{ totalNum }}件</div>
      <div>总价：{{ totalCount }}元</div>
      <div>选中删除：<button @click="delChoose">删除</button></div>
      <div><button :disabled="!isDisabled">结算</button></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['shopList', 'totalNum', 'totalCount']),
    // 全选功能
    chooseAll: {
      // 获取值
      get () {
        // 当每一个复选框的值都为true时，则返回true
        return this.shopList.every(item => item.checked)
      },
      // 设置值
      set (newValue) {
        // 让每一个复选框的状态和全选按钮的状态保持一致
        this.shopList.forEach(item => {
          item.checked = newValue
        })
      }
    },
    // 控制结算按钮的状态
    isDisabled () {
      // 购物车列表中只要有一个复选框的值为true，就返回true
      return this.shopList.some(item => item.checked)
    }
  },
  methods: {
    // 删除选中
    delChoose () {
      // 从所有购物车列表中过滤出来checked为false的数组
      const result = this.shopList.filter(item => item.checked === false)
      // 将过滤出来的数组提交给mutation处理
      this.$store.commit('delChoose', result)
    },
    // 商品++
    add (idx) {
      this.$store.commit('addNum', idx)
    },
    // 商品--
    discount (idx) {
      this.$store.commit('disNum', idx)
    },
    // 编辑商品数量
    change (idx, ev) {
      /*
        不能直接通过v-model来修改商品数量
        因为根据vuex单向数据流的原则，只有mutations才能修改state中的数据
      */
      this.$store.commit('changeNum', { idx, value: ev.target.value })
    }
  }
}
</script>

<style scoped>
.listUl{
  padding:0;
  margin:0;
}
.listUl>li{
  border: 1px solid #ddd;
  padding:5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.listUl>li>div:nth-of-type(2){
  width: 100px;
}
.listUl>li>div:nth-of-type(2) img{
  width:100%;
}
</style>
