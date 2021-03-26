<template>
  <div class="item">
    <div>
      <div class="item-img">
        <img :alt="item.name_title" :src="`${item.sku_info[currentIndex].ali_image}?x-oss-process=image/resize,w_206/quality,Q_80/format,webp`" style="opacity: 1;">
      </div>
      <h6>{{ item.name_title }}</h6>
      <h3>{{ item.name }}</h3>
      <div class="params-colors">
        <ul class="colors-list">
          <li v-for="(color, index) in item.sku_info" :key="color.id">
            <a href="javascript:;" :class="{ active: index === currentIndex }" @click="currentIndex = index">
              <img :alt="color.show_name" :src="`http://img01.smartisanos.cn/${color.spec_json.image}20X20.jpg`">
            </a>
          </li>
        </ul>
      </div>
      <div class="item-btns clearfix">
        <span class="item-gray-btn">
          <router-link :to="{ name: 'detail', params: { id: item.sku_info[currentIndex].sku_id } }">查看详情</router-link>
        </span>
        <span class="item-blue-btn" @click="addCart(item.sku_info[currentIndex])">加入购物车 </span>
      </div>
      <div class="item-price clearfix">
        <i>¥</i><span>{{ item.price }}</span>
      </div>
      <div class="discount-icon">false</div>
      <div class="item-cover">
        <router-link :to="{ name: 'detail', params: { id: item.sku_info[currentIndex].sku_id } }"></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    addCart(goods) {
      // 2. 组件commit一个任务（函数名）,携带载荷信息(要传递的值)
      this.$store.commit('addCart', goods)
    }
  }
}
</script>