<template>
  <div id="main">
    <div class="sku-box store-content">
      <div class="sort-option">
        <ul class="line clear">
          <li><a href="javascript:;" class="active">综合排序</a></li>
          <li><a href="javascript:;" class="">销量排序</a></li>
          <li><a href="javascript:;" class="">价格低到高</a></li>
          <li><a href="javascript:;" class="">价格高到低</a></li>
        </ul>
      </div>
      <div class="gray-box">
        <div class="item-box">
          <!-- goodItem组件 -->
          <list-item v-for="item in listData" :key="item.id" :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from './list-item.vue';

export default {
  data() {
    return {
      listData: []
    }
  },
  async created() {
    const { data } = await this.axios.get('list.json');
    this.listData = data;
  },
  components: {
    'list-item': ListItem
  }
}
</script>

<style scoped>
@import "../assets/css/goodsList.css"
</style>