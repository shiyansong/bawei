<template>
  <div id="main">
    <div class="store-content item">
      <div class="item-box">
        <div class="gallery-wrapper">
          <div class="gallery">
            <div class="thumbnail">
              <!-- 切换方向 -->
              <ul>
                <li 
                  :class="{ on: currentIndex === index }" 
                  v-for="(item, index) in detailData.ali_images" 
                  :key="index"
                  @click="currentIndex = index"
                >
                  <img :src="`${item}?x-oss-process=image/resize,w_54/quality,Q_90/format,webp`">
                </li>
              </ul>
            </div>
            <div class="thumb">
              <ul>
                <li :class="{ on: currentIndex === index }" v-for="(item, index) in detailData.ali_images" :key="index">
                  <img :src="`${item}?x-oss-process=image/resize,w_440/quality,Q_90/format,webp`">
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="banner">
          <div class="sku-custom-title">
            <div class="params-price">
              <span><em>¥</em><i>199</i></span>
            </div>
            <div class="params-info">
              <h4>{{ detailData.title }}</h4>
              <h6>{{ detailData.sub_title }}</h6>
            </div>
          </div>
          <!-- 切换颜色 -->
          <div class="sku-dynamic-params-panel">
            <div class="sku-dynamic-params clear">
              <span class="params-name">颜色</span>
              <ul class="params-colors">
                <li 
                  :class="{ cur: colorIndex === index }" 
                  v-for="(color, index) in detailData.sku_list" 
                  :key="color.id"
                  @click="changeColor(index)"
                >
                  <router-link :to="{ name: 'detail', params: { id: color.id } }">
                    <img :src="`http://img01.smartisanos.cn/${color}/20X20.jpg`">
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="sku-dynamic-params clear">
              <div class="params-name">数量</div>
              <div class="params-detail clear">
                <div class="item-num js-select-quantity">
                  <span class="down" :class="{ 'down-disabled': num <=1 }" @click="sub">-</span>
                  <span class="num">{{ num }}</span>
                  <span class="up" @click="num++">+</span>
                </div>
              </div>
            </div>
          </div>
          <div class="sku-status">
            <div class="cart-operation-wrapper clearfix">
              <span class="blue-title-btn js-add-cart" @click="addCart"><a>加入购物车</a></span>
              <span class="gray-title-btn"><a>现在购买</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 详情数据
      detailData: {},
      // 左侧边栏的下标
      currentIndex: 0,
      // 颜色的下标
      colorIndex: 0,
      num: 1
    }
  },
  async created() {
    const { id } = this.$route.params;
    const { data } = await this.axios.get('/detail.json');
    // 根据id从数组中筛选出来我们需要数据
    this.detailData = data.filter(item => item.sku_id == id)[0]
  },
  methods: {
    changeColor(idx) {
      this.colorIndex = idx;
    },
    // 商品减减
    sub() {
      if(this.num <= 1) {
        this.num = 1;
      } else {
        this.num--;
      }
    },
    // 将最终的商品数量添加到购物车
    addCart() {
      const obj = { dataInfo: this.detailData, num: this.num }
      this.$store.commit('addCart', obj);
    }
  }
}
</script>

<style scoped>
@import "../assets/css/item.css";
</style>