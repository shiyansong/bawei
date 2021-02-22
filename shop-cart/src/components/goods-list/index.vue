<template>
  <!-- 商品列表  -->
  <div id="list">
    <h3>商品列表</h3>
    <button @click="sort">排序</button>
    <button @click="$router.push({ name: 'ShopCart' })">跳转购物车</button>
    <ul class="listUl">
      <li v-for="item in list" :key="item.id">
        <div>
          <img alt="" :src="item.img" />
        </div>
        <div>
          <p>名称：{{ item.title }}</p>
          <p>价格：{{ item.price }}</p>
          <button @click="addCart(item)">加入购物车</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      flag: false,
      list: []
    }
  },
  async created () {
    this.list = await this.getList()
    // console.log(this.list)
  },
  methods: {
    // 封装请求数据的方法
    async getList () {
      const { data } = await this.axios.get('data.json')
      return data
    },
    // 点击加入购物车将商品保存到vuex
    addCart (goods) {
      this.$store.commit('getGoods', goods)
      this.$router.push({ name: 'ShopCart' })
    },
    // 排序
    sort () {
      // 如果flag为true进行升序排列
      if (this.flag) {
        this.list.sort((item1, item2) => item1.price - item2.price)
      } else {
        // 降序排列
        this.list.sort((item1, item2) => item2.price - item1.price)
      }
      // 对flag进行取反操作
      this.flag = !this.flag
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
.listUl>li>div:first-child{
  width: 100px;
}
.listUl>li>div:first-child img{
  width:100%;
}
</style>
